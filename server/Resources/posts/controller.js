const jwt = require('jsonwebtoken');
const fs = require('fs');
const Post = require('./model');
const Like = require('../likes/model');
const Comment = require('../comments/model');

// Get likes and comments count for a post
const getLikesAndCommentsCount = async (postId) => {
    const likesCount = await Like.countDocuments({ postId });
    const commentsCount = await Comment.countDocuments({ postId });
    return { likesCount, commentsCount };
};

// Create a new post
exports.createPost = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { body } = req.body;
        const authorId = decoded.userId;

        if (!body || !authorId) {
            return res.status(400).send({ message: 'Post body is required' });
        }

        const image = req.file ? req.file.path : null;

        const post = new Post({ image, body, authorId });
        await post.save();

        res.status(201).send(post);
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).send(error);
    }
};

// Get a single post by ID along with likes and comments count
exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('authorId');
        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }

        // If the post has an image, prepend the base URL
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        if (post.image) {
            // Ensure the image path is correctly formatted with base URL
            post.image = `${baseUrl}/uploads/posts/${post.image.split('\\').pop()}`;
        }

        // Get likes and comments count for the post
        const { likesCount, commentsCount } = await getLikesAndCommentsCount(post._id);


        // Respond with the post, likes count, and comments count
        res.status(200).json({
            success: true,
            post,
            likes: likesCount,
            comments: commentsCount,
        });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).send({ message: 'Invalid Post ID' });
        }
        res.status(500).send({ message: 'Error retrieving post', error });
    }
};

// Update a post by ID
exports.updatePost = async (req, res) => {
    try {
        const { body, authorId } = req.body;

        // Find the post by ID
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }

        // Update post fields
        if (body) post.body = body;
        if (authorId) post.authorId = authorId;

        // If a new image is uploaded, update the image path
        if (req.file) {
            post.image = req.file.path;
        }

        // Save updated post
        await post.save();

        // Prepend base URL to image path in response
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        if (post.image) {
            post.image = `${baseUrl}/uploads/posts/${post.image.split('\\').pop()}`;
        }

        res.status(200).send(post);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).send({ message: 'Invalid Post ID' });
        }
        res.status(500).send({ message: 'Error updating post', error });
    }
};

// Delete a post by ID
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }

        // Optionally: delete the image file associated with the post
        if (post.image) {
            fs.unlink(post.image, (err) => {
                if (err) {
                    console.log('Error deleting image:', err);
                }
            });
        }

        res.status(200).send({ message: 'Post deleted successfully' });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).send({ message: 'Invalid Post ID' });
        }
        res.status(500).send({ message: 'Error deleting post', error });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('authorId');

        // Prepend base URL to image paths
        const baseUrl = `${req.protocol}://${req.get('host')}`;

        // Iterate over posts and get likes/comments count for each post
        const postsWithCounts = await Promise.all(posts.map(async post => {
            if (post.image) {
                post.image = `${baseUrl}/uploads/posts/${post.image.split('\\').pop()}`;
            }

            // Get likes and comments count for the post
            const { likesCount, commentsCount } = await getLikesAndCommentsCount(post._id);


            return { ...post._doc, likes: likesCount, comments: commentsCount };
        }));

        res.status(200).send(postsWithCounts);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving posts', error });
    }
};


// Helper function to prepend base URL to image paths
const prependBaseUrlToImages = (posts, req) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    posts.forEach(post => {
        if (post.image) {
            post.image = `${baseUrl}/uploads/posts/${post.image.split('\\').pop()}`; // Ensure the image path is correct
        }
    });
};


// Get a single post by ID with likes and comments count
exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('authorId');
        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }

        // Prepend the base URL to the image if it exists
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        if (post.image) {
            post.image = `${baseUrl}/uploads/posts/${post.image.split('\\').pop()}`;
        }

        // Get likes and comments count
        const { likesCount, commentsCount } = await getLikesAndCommentsCount(post._id);

        res.status(200).send({
            post,
            likesCount,
            commentsCount
        });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).send({ message: 'Invalid Post ID' });
        }
        res.status(500).send({ message: 'Error retrieving post', error });
    }
};

// Get all posts by a specific user
exports.getPostsByUser = async (req, res) => {
    try {
        const posts = await Post.find({ authorId: req.params.userId }).populate('authorId');
        if (!posts.length) {
            return res.status(404).send({ message: 'No posts found for this user' });
        }

        // Prepend base URL to image paths
        prependBaseUrlToImages(posts, req);

        // Add likes and comments count to each post
        // eslint-disable-next-line no-restricted-syntax
        for (const post of posts) {
            // eslint-disable-next-line no-await-in-loop
            const { likesCount, commentsCount } = await getLikesAndCommentsCount(post._id);
            post.likesCount = likesCount;
            post.commentsCount = commentsCount;
        }

        res.status(200).send(posts);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).send({ message: 'Invalid User ID' });
        }
        res.status(500).send({ message: 'Error retrieving user posts', error });
    }
};

// Get all posts that a user has liked
exports.getPostsLikedByUser = async (req, res) => {
    try {
        const likedPosts = await Like.find({ userId: req.params.userId }).select('postId');
        const postIds = likedPosts.map(like => like.postId);

        if (!postIds.length) {
            return res.status(404).send({ message: 'No liked posts found' });
        }

        const posts = await Post.find({ _id: { $in: postIds } }).populate('authorId');

        // Prepend base URL to image paths
        prependBaseUrlToImages(posts, req);

        // Add likes and comments count to each post
        // eslint-disable-next-line no-restricted-syntax
        for (const post of posts) {
            // eslint-disable-next-line no-await-in-loop
            const { likesCount, commentsCount } = await getLikesAndCommentsCount(post._id);
            post.likesCount = likesCount;
            post.commentsCount = commentsCount;
        }

        res.status(200).send(posts);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).send({ message: 'Invalid User ID' });
        }
        res.status(500).send({ message: 'Error retrieving liked posts', error });
    }
};

// Search posts by a search term
exports.searchPosts = async (req, res) => {
    try {
        const posts = await Post.find({ $text: { $search: req.query.q } }).populate('authorId');
        if (!posts.length) {
            return res.status(404).send({ message: 'No posts found for the search term' });
        }

        // Prepend base URL to image paths
        prependBaseUrlToImages(posts, req);

        // Add likes and comments count to each post
        // eslint-disable-next-line no-restricted-syntax
        for (const post of posts) {
            // eslint-disable-next-line no-await-in-loop
            const { likesCount, commentsCount } = await getLikesAndCommentsCount(post._id);
            post.likesCount = likesCount;
            post.commentsCount = commentsCount;
        }

        res.status(200).send(posts);
    } catch (error) {
        res.status(500).send({ message: 'Error searching posts', error });
    }
};
