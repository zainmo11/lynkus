//this is the middleware
const Post = require('../posts/model');

exports.validateLike = async (req, res, next) => {
    const { postId, userId } = req.body;

    if (!postId || !userId) {
        return res.status(400).send({ message: 'Post ID and User ID are required' });
    }

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
        return res.status(404).send({ message: 'Post not found' });
    }

    next();
};
