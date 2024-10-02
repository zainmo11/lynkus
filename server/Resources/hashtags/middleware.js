//this is the middleware
const Post = require('./model');

exports.validateHashtag = async (req, res, next) => {
    const { text, postId } = req.body;

    if (!text || !postId) {
        return res.status(400).send({ message: 'Text and Post ID are required' });
    }

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
        return res.status(404).send({ message: 'Post not found' });
    }

    next();
};
