const asyncHandler = require('express-async-handler');
const mongoose = require("mongoose");
const Notifications = require("../notifications/model");
const User = require("../users/model");
const Follows = require("./model");
const ApiError = require("../../utils/apiError");

const generateDefaultProfileImg = (userName) => {
    return `https://avatar.iran.liara.run/username?username=${userName}&background=008080&color=F0F8FF&length=1`;
};

// Follow a user
exports.followUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    // Check if user id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ApiError("Invalid user id", 400));
    }

    // Check if user exists
    const userExists = await User.findById(id);
    if (!userExists) return next(new ApiError("User not found", 404));

    // Check if the user is trying to follow themselves
    if (req.user._id.toString() === id) return next(new ApiError("You can't follow yourself", 400));

    // Check if user is already following this user
    const followsExists = await Follows.findOne({ user: req.user._id, following: id });
    if (followsExists) {
        if (process.env.NODE_ENV !== 'production') {
            const deletedFollows = await Follows.findByIdAndDelete(followsExists._id);
            return res.status(200).json({ message: "User unfollowed successfully", deletedFollows });
        }
        return res.status(200).json({ message: "User unfollowed successfully" });
    }

    // Create a new follow
    const newFollow = new Follows({ user: req.user._id, following: id });
    await newFollow.save();

    // Send notification to the followed user
    const notification = new Notifications({
        to: id,
        from: req.user._id,
        type: "FOLLOW",
        content: `${req.user.userName} started following you`,
    });
    await notification.save();

    res.status(200).json({ message: "User followed successfully", newFollow, notification });
});

// Get user's followers
exports.getUserFollowers = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;
    const { search } = req.query;
    const query = {};

    // Determine if id is MongoId or userName
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const user = await User.findOne({ userName: id }).select('_id');
        if (!user) return next(new ApiError("User Not Found", 404));
        query.following = user._id;
    } else {
        query.following = id;
    }

    // Fetch followers
    let followers = await Follows.find(query)
        .select('user -_id')
        .populate({
            path: 'user',
            select: 'userName profileImg',
        })
        .skip(skip)
        .limit(limit);

    // Search functionality
    if (search) {
        followers = followers.filter(follower =>
            follower.user.userName.toLowerCase().includes(search.toLowerCase())
        );
    }

    // Add fallback for profileImg if not present
    followers = followers.map(follower => ({
        ...follower.user._doc,  // Extract plain user data without Mongoose methods
        profileImg: follower.user.profileImg || generateDefaultProfileImg(follower.user.userName),
    }));

    const totalDocs = await Follows.countDocuments(query);
    const totalPages = Math.ceil(totalDocs / limit);

    res.status(200).json({ results: followers.length, totalPages, page, data: followers });
});

// Get user's following
exports.getUserFollowing = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;
    const { search } = req.query;
    const query = {};

    // Determine if id is MongoId or userName
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const user = await User.findOne({ userName: id }).select('_id');
        if (!user) return next(new ApiError("User Not Found", 404));
        query.user = user._id;
    } else {
        query.user = id;
    }

    // Fetch following users
    let following = await Follows.find(query)
        .select('following -_id')
        .populate({
            path: 'following',
            select: 'userName profileImg',
        })
        .skip(skip)
        .limit(limit);

    // Search functionality
    if (search) {
        following = following.filter(follow =>
            follow.following.userName.toLowerCase().includes(search.toLowerCase())
        );
    }

    // Add fallback for profileImg if not present
    following = following.map(follow => ({
        ...follow.following._doc,  // Extract plain user data without Mongoose methods
        profileImg: follow.following.profileImg || generateDefaultProfileImg(follow.following.userName),
    }));

    const totalDocs = await Follows.countDocuments(query);
    const totalPages = Math.ceil(totalDocs / limit);

    res.status(200).json({
        results: following.length,
        totalPages,
        page,
        data: following,
    });
});

// Get recommended followers
exports.getRecommendedFollowers = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;

    // Get the users the current user follows
    const userFollowing = await Follows.find({ user: userId }).select("following -_id");

    // Recommend random users if the user is not following anyone
    if (userFollowing.length === 0) {
        const randomUsers = await User.find({ _id: { $ne: userId } }).limit(req.query.limit * 1 || 10);
        return res.status(200).json({ recommendedUsers: randomUsers });
    }

    const followingId = userFollowing.map(f => f.following);

    // Get the users followed by the people the current user follows
    const secondFollowing = await Follows.find({ user: { $in: followingId } }).select("following -_id");
    const secondFollowingId = secondFollowing.map(e => e.following.toString());

    // Filter out users already followed by the current user and the current user itself
    const recommendedUserId = secondFollowingId.filter(followingId => !followingId.includes(followingId) && followingId !== userId.toString());

    // Get recommended users
    let recommendedUsers;
    if (recommendedUserId.length > 0) {
        recommendedUsers = await User.find({ _id: { $in: recommendedUserId } })
            .select("userName profileImg")
            .limit(req.query.limit * 1 || 10);
    } else {
        // Recommend random users if no relevant connections are found
        recommendedUsers = await User.find({ _id: { $ne: userId } })
            .select("userName profileImg")
            .limit(req.query.limit * 1 || 10);
    }

    // Add fallback for profileImg if not present
    recommendedUsers = recommendedUsers.map(user => ({
        ...user._doc,
        profileImg: user.profileImg || generateDefaultProfileImg(user.userName),
    }));

    res.status(200).json({ recommendedUsers });
});
