const Like = require('./model');
const Post = require('../posts/model');

// Like a post
exports.likePost = async (req, res) => {
    try {
        const { postId, userId } = req.body;

        // Check if the user has already liked the post
        const existingLike = await Like.findOne({ postId, userId });
        if (existingLike) {
            return res.status(400).send({ message: 'Post already liked by this user' });
        }

        const like = new Like({ postId, userId });
        await like.save();

        res.status(201).send(like);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get all likes for a post
exports.getLikes = async (req, res) => {
    try {
        const likes = await Like.find({ postId: req.params.postId }).populate('userId');
        res.send(likes);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Unlike a post
exports.unlikePost = async (req, res) => {
    try {
        const { postId, userId } = req.body;

        const like = await Like.findOneAndDelete({ postId, userId });
        if (!like) {
            return res.status(404).send({ message: 'Like not found' });
        }

        res.send({ message: 'Post unliked' });
    } catch (error) {
        res.status(500).send(error);
    }
};
