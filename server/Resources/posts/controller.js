// this is the controller
const Post = require('./model');
const Like = require('../likes/model');

// Create a new post
exports.createPost = async (req, res) => {
    try {
        const { image, body, authorId } = req.body;

        // Ensure all required fields are present
        if (!body || !authorId) {
            return res.status(400).send({ message: 'Post body and authorId are required' });
        }

        const post = new Post({ image, body, authorId });
        await post.save();
        res.status(201).send(post);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a specific post
exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('authorId');
        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }
        res.send(post);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a post
exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }
        res.send(post);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).send({ message: 'Invalid Post ID' });
        }
        res.status(500).send(error);
    }
};

// Delete a post
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }
        res.send({ message: 'Post deleted successfully' });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).send({ message: 'Invalid Post ID' });
        }
        res.status(500).send(error);
    }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('authorId');
        res.send(posts);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get all posts by a specific user
exports.getPostsByUser = async (req, res) => {
    try {
        const posts = await Post.find({ authorId: req.params.userId }).populate('authorId');
        res.send(posts);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get all posts that a user has liked
exports.getPostsLikedByUser = async (req, res) => {
    try {
        const likedPosts = await Like.find({ userId: req.params.userId }).select('postId');
        const postIds = likedPosts.map(like => like.postId);
        const posts = await Post.find({ _id: { $in: postIds } }).populate('authorId');
        res.send(posts);
    } catch (error) {
        res.status(500).send(error);
    }
};

