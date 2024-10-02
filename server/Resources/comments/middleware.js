//this is the middleware
const Post = require('../posts/model');

exports.validateComment = async (req, res, next) => {
    const { text, userId, postId } = req.body;

    if (!text || !userId || !postId) {
        return res.status(400).send({ message: 'Text, User ID, and Post ID are required' });
    }

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
        return res.status(404).send({ message: 'Post not found' });
    }

    next();
};
