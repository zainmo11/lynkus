const asyncHandler = require("express-async-handler")
const mongoose = require("mongoose")
const bcrypt=require("bcrypt")
const sharp = require("sharp")
const path = require("path")
const fs = require("fs")
const ApiError=require("../../utils/apiError")
const User = require("./model");
const Post = require("../posts/model")
const Comment = require("../comments/model")
const BookMark = require("../bookmarks/model")
const {userUpload} = require("../../utils/upload")
const refreshToken=require("../auth/RefreshTokenModel")
const Follows=require("../followers/model")
const {cleanupTempImages} =require('../../utils/cleanupTempImages')


exports.UploadUserImgs=userUpload.fields([
    {
        name: 'profileImg',
        maxCount: 1
    },
    {
        name: 'headerImg',
        maxCount: 1
    }
]);

exports.resizeImg = asyncHandler(async (req, res, next) => {

    if (req.files) {

        //Create temp for save path of new Image if the update is Not successful , cleanup  it 
        req.tempImg={};


        const profileImgDir = path.join(__dirname, '../../uploads/users/profileImg');
        const headerImgDir = path.join(__dirname, '../../uploads/users/headerImg');
   
  
  
     // Check if profileImg directory exists, if not create it
    if (!fs.existsSync(profileImgDir)) {
        // recursive ensures parent directories are created if necessary
        fs.mkdirSync(profileImgDir, { recursive: true }); 
        
    }

    // Check if headerImg directory exists, if not create it
    if (!fs.existsSync(headerImgDir)) {
        fs.mkdirSync(headerImgDir, { recursive: true });
       
    }  
        // Handle Profile Image
        if (req.files && req.files.profileImg && req.files.profileImg.length > 0) 
            {
            // Use req.files.profileImg[0] for single file in array
            const originalPath = req.files.profileImg[0].path;  
            console.log(originalPath);

            // Remove the extension
            const fileNameWithoutExt = req.files.profileImg[0].filename
            .replace(path.extname(req.files.profileImg[0].filename), ''); 

            // Path to the original file
            const newFileName = `ProfileImg-${fileNameWithoutExt}.jpeg`;
            console.log({newFileName:newFileName}); 
            // Path for the resized file
            const outputPath = path.join(__dirname, '../../uploads/users/profileImg', newFileName); 

           


            await sharp(originalPath)
                .resize(300, 300)
                .toFormat('jpeg')
                .jpeg({ quality: 90 })
                .toFile(outputPath);

            // Delete old profile image if it exists
            if (req.user && req.user.profileImg) {
                // Extract the file name from URL
                const oldImgFileName = req.user.profileImg.split('/').pop(); 
                const oldImgPath = path.join(__dirname, '../../uploads/users/profileImg', oldImgFileName);

                try {   
                    if (fs.existsSync(oldImgPath)) 
                        {
                        // Delete the old profile image if it exists
                        fs.unlinkSync(oldImgPath); 
                    }
                } catch (err) {
                    console.error(`Error deleting old profile image: ${err.message}`);
                }
            }
                 //add path of new profileImg
                req.tempImg.profileImg=outputPath;
            // Set the resized image path to the request body for saving
            req.body.profileImg = newFileName;

            fs.unlinkSync(originalPath); // Remove the original file
        }

        // Handle Header Image
        if (req.files && req.files.headerImg && req.files.headerImg.length > 0) 
            {
            // Use req.files.headerImg[0] for single file in array
            const originalPath = req.files.headerImg[0].path;  
            console.log(originalPath);

            // Remove the extension
            const fileNameWithoutExt = req.files.headerImg[0].filename
            .replace(path.extname(req.files.headerImg[0].filename), ''); 
            // Path to the original file
            const newFileName = `HeaderImg-${fileNameWithoutExt}.jpeg`; 
             // Path for the resized file
            const outputPath = path.join(__dirname, '../../uploads/users/headerImg', newFileName);


            
            await sharp(originalPath)
                .resize(1000, 500)  
                .toFormat('jpeg')
                .jpeg({ quality: 90 })
                .toFile(outputPath);

            // Delete old header image if it exists
            if (req.user &&req.user.headerImg) 
                {
                // Extract the file name from URL
                const oldImgFileName = req.user.headerImg.split('/').pop(); 
                const oldImgPath = path.join(__dirname, '../../uploads/users/headerImg', oldImgFileName);

                try {
                    if (fs.existsSync(oldImgPath)) {
                        fs.unlinkSync(oldImgPath); // Delete the old header image if it exists
                    }
                } catch (err) {
                    console.error(`Error deleting old header image: ${err.message}`);
                }
            }

            req.tempImg.headerImg=outputPath
            // Set the resized image path to the request body for saving
            req.body.headerImg = newFileName;

            fs.unlinkSync(originalPath); // Remove the original file
        }
    }
    

    next();
});












//for Admin
// exports.createUser = asyncHandler(async (req, res, next) => {


//     if (!req.user.isAdmin) {
//         return next(new ApiError("Not Authorized",401))
//     }
//     const {userName,userName,email,profileImg,password,isAdmin} =req.body

//     const user1 = await User.findOne({
//         $or: [
//             { userName: userName }, 
//             { email: email } 
//         ]
//     });
//     if (user1) {
//         return next(new ApiError('User already exists', 400));
//     }

//     const user = await User.create({ userName, userName, email,profileImg, password,isAdmin });
   

//     res.status(201).json({ message: 'User created successfully' ,data: user });
// });
//for admin
// exports.getUsers = asyncHandler(async (req, res, next) => {
    
//     if (!req.user.isAdmin) {
//     return next(new ApiError("Not Authorized",404));
//     }
//     const userId = req.user._id;

//     const page = req.query.page * 1 || 1;
//     const limit = req.query.limit * 1 || 10;
//     const skip = (page - 1) * limit;

//     const { search } = req.query;
//     const query = { user: userId }; 

//     if (search) {
//         query.userName = { $regex: search, $options: 'i' }; 
//     }

//     const user = await User.find(query)
        
//         .skip(skip)
//         .limit(limit);

//     const totalCount = await User.countDocuments(query);
//     const totalPages = Math.ceil(totalCount / limit);

//     res.status(200).json({ results: user.length, page, totalPages, data: user });
// });


exports.searchUser = asyncHandler(async (req, res, next) => {
    
   
    

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    const { search } = req.query;
    const query = { }; 

    if (search) {
        query.userName = { $regex: search, $options: 'i' }; 
    }

    const user = await User.find(query)
        .skip(skip)
        .limit(limit);

        if (!user) {
            
            return next(new ApiError("User Not Found", 404));
            
        }

    const totalCount = await User.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);
    

    res.status(200).json({ results: user.length, page, totalPages, data: user });
});


exports.deleteUser = asyncHandler(async (req, res, next) => {
    const id = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ApiError("Invalid User ID", 404));
    }
    // Delete related posts, comments, bookmarks, and refresh tokens for the user
    await Post.deleteMany({ user: id });
    await Comment.deleteMany({ user: id });
    await BookMark.deleteMany({ user: id });
    await refreshToken.deleteMany({ user: id });

    //delete profileImg and headerImg
    if (req.user && req.user.profileImg) {
        const oldImgFileName = req.user.profileImg.split('/').pop(); // Extract the file name from URL
        const oldImgPath = path.join(__dirname, '../../uploads/users/profileImg', oldImgFileName);

        try {
            if (fs.existsSync(oldImgPath)) {
                fs.unlinkSync(oldImgPath); // Delete the old profile image if it exists
            }
        } catch (err) {
            console.error(`Error deleting old profile image: ${err.message}`);
        }
    }
    if (req.user && req.user.headerImg) {
        const oldImgFileName = req.user.headerImg.split('/').pop(); // Extract the file name from URL
        const oldImgPath = path.join(__dirname, '../../uploads/users/headerImg', oldImgFileName);

        try {
            if (fs.existsSync(oldImgPath)) {
                fs.unlinkSync(oldImgPath); // Delete the old header image if it exists
            }
        } catch (err) {
            console.error(`Error deleting old header image: ${err.message}`);
        }
    }
    const user = await User.findByIdAndDelete(id);

    if (!user) {
        return next(new ApiError("User Not Found", 404));
    }

    // Clear the refreshToken cookie and send success response
    res.status(200)
        .clearCookie('refreshToken')
        .json({ message: 'User deleted successfully' });
});





exports.getUserProfile = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    // const page = req.query.page*1 || 1; 
    // const limit = req.query.limit*1 || 10; 
    // const skip = (page - 1) * limit; 

    // Check if id is  mongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      
        const user = await User.findOne({ userName: id })
            // .populate({
            //     path: 'posts',
            //     options: {
            //         limit: limit,  
            //         skip: skip,    
            //     }
            // });

        if (!user) {
            return next(new ApiError("UserProfile Not Found", 404));
        }
        // const totalCount = await Post.countDocuments({ authorId: user._id });
        // const totalPages = Math.ceil(totalCount / limit);
    
        const followersCount=await Follows.countDocuments({following:user._id});
        const followingCount=await Follows.countDocuments({user:user._id});
        return res.status(200).json({
            // pagination: {

            //     results:user.posts.length,
            //     page: page,
            //     totalPages,
            // },
            followersCount,
            followingCount,
            data: user,
           
        });
    }

    // If id is  ObjectId, find the user by _id and paginate posts
    const user = await User.findById(id)
        // .populate({
        //     path: 'posts',
        //     options: {
        //         limit: limit,  
        //         skip: skip,    
        //     }
        // });

    if (!user) {
        return next(new ApiError("UserProfile Not Found", 404));
    }
    // const totalCount = await Post.countDocuments({ authorId: id });
    // const totalPages = Math.ceil(totalCount / limit);
    const followersCount=await Follows.countDocuments({following:id})
    const followingCount=await Follows.countDocuments({user:id})
    res.status(200).json({
       
        // pagination: {
        //     results:user.posts.length,
        //     page: page,
        //     totalPages,
        // },
        followersCount,
        followingCount,
         data: user,
    });
});


exports.updateUser = asyncHandler(async (req, res, next) => {
    
    
    
   

    
  const user = await User.findOneAndUpdate( 
        req.user._id,
        {
            userName: req.body.userName,
            name: req.body.name,
            email: req.body.email,
            profileImg: req.body.profileImg,
            headerImg: req.body.headerImg,
            bio: req.body.bio
           
        },
        {new:true}

    );
    if (!user) {
        cleanupTempImages(req.tempImg);
        return next(new ApiError("User Not Found", 404));
    }
    

   

    res.status(200).json({ message: 'User Updated successfully',data:user });
});

exports.changeUserPassword = asyncHandler(async (req, res, next) => {



const hashedPassword = await bcrypt.hash(req.body.password, 12);


   const updatedUser = await User.findByIdAndUpdate(
    req.user._id, 
        {
            password: hashedPassword,
            passwordChangedAt: Date.now(),
        },
        {new: true, }
    );
    
    if (!updatedUser) {
        return next(new ApiError(`No document for this id ${req.user._id}`, 404));
    }
    
    await refreshToken.deleteMany({user:req.user._id});
    
   
    res.status(200)
    .clearCookie('refreshToken')
    .json({message:"Password Has been Changed Please Login Again" ,data: updatedUser });
    });


