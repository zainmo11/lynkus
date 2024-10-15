// exports.getUserFollowerFollowingCount=asyncHandler(async(req,res,next)=>{
//     const {id}=req.params

//     const followersCount=await Follows.countDocuments({following:id})
//     const followingCount=await Follows.countDocuments({user:id})

//     res.status(200).json({followersCount,followingCount})

// })

//for images
// const cleanupTempImages = (tempImages) => {
//     if (tempImages) {
//       for (const key in tempImages) {
//         const filePath = tempImages[key];
//         if (fs.existsSync(filePath)) {
//           try {
//             fs.unlinkSync(filePath); // Delete the image
//           } catch (err) {
//             console.error(`Error cleaning up image ${filePath}: ${err.message}`);
//           }
//         }
//       }
//     }
//   };
  