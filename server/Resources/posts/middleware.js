//this is the middleware

const Post = require('./model');
const { check, validationResult } = require('express-validator');

exports.authorizePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }

        if (post.authorId.toString() !== req.user.id) {
            return res.status(403).send({ message: 'Forbidden: You do not have permission to modify this post' });
        }

        next();
    } catch (error) {
        res.status(500).send({ message: 'Server Error' });
    }
};

exports.validatePost = [
    check('body').notEmpty().withMessage('Post body is required'),
    check('authorId').notEmpty().withMessage('Author ID is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
