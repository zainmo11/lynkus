const jwt = require('jsonwebtoken');
const fs = require('fs');
const Post = require('./model');
const Like = require('../likes/model');
const Comment = require('../comments/model');
const User = require('../users/model');



// Get likes and comments count for a post
const getLikesAndCommentsCount = async (postId) => {
    const likesCount = await Like.countDocuments({ postId });
    const commentsCount = await Comment.countDocuments({ postId });
    return { likesCount, commentsCount };
};

const userLikesPost = async (postId, userId) => {
    const like = await Like.findOne({ postId, userId });
    return !!like; // Returns true if the user has liked the post, otherwise false
};
// Create a new post
exports.createPost = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { postBody } = req.body;
        const authorId = decoded.userId;

        if (!postBody || !authorId) {
            return res.status(400).send({ message: 'Post body is required' });
        }

        const image = req.file ? req.file.path : null;
        const post = new Post({ image, body: postBody, authorId });
        await post.save();

        res.status(201).send(post);
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).send(error);
    }
};

exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('authorId');
        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }

        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId; // Get current user ID from token

        const user = await User.findById(post.authorId);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Prepend the base URL to the image if it exists
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        if (post.image) {
            post.image = `${baseUrl}/uploads/posts/${post.image.split('\\').pop()}`;
        }

        // Get likes and comments count
        const { likesCount, commentsCount } = await getLikesAndCommentsCount(post._id);

        // Check if the current user likes this post
        const likedByUser = await userLikesPost(post._id, userId);

        res.status(200).send({
            post,
            likesCount,
            commentsCount,
            userName: user.userName || "unknown UserName",
            name: user.name || "unknown User",
            likedByUser
        });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).send({ message: 'Invalid Post ID' });
        }
        console.error('Error retrieving post:', error);
        res.status(500).send({ message: 'Error retrieving post', error: error.message || error });
    }
};

// Update a post by ID
exports.updatePost = async (req, res) => {
    try {
        const { body } = req.body;
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const authorId = decoded.userId;

        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }

        // Ensure the user updating the post is the author
        if (post.authorId.toString() !== authorId) {
            return res.status(403).send({ message: 'Unauthorized to update this post' });
        }

        // Update post fields
        if (body) post.body = body;
        if (req.file) {
            post.image = req.file.path;
        }

        await post.save();

        const user = await User.findById(authorId);
        res.status(200).send({
            post,
            userName: user.userName,
            name: user.name
        });
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
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const authorId = decoded.userId;

        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }

        // Ensure the user deleting the post is the author
        if (post.authorId.toString() !== authorId) {
            return res.status(403).send({ message: 'Unauthorized to delete this post' });
        }

        await post.remove();

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

// Get all posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('authorId');
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const {userId} = decoded;
        const postsWithCounts = await Promise.all(posts.map(async post => {
            const user = await User.findById(post.authorId);
            const likedByUser = await userLikesPost(post._id, userId);

            // Check if user is found
            const userName = user ? user.userName : "unknown UserName";
            const name = user ? user.name : "unknown User";

            const { likesCount, commentsCount } = await getLikesAndCommentsCount(post._id);

            if (post.image) {
                post.image = `${baseUrl}/uploads/posts/${post.image.split('\\').pop()}`;
            }

            return {
                ...post._doc,
                likes: likesCount,
                comments: commentsCount,
                userName,
                name,
                likedByUser
            };
        }));

        res.status(200).send(postsWithCounts);
    } catch (error) {
        console.error('Error details:', error);
        res.status(500).send({ message: 'Error retrieving posts', error: error.message || error });
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


// Get all posts by a specific user with user information
exports.getPostsByUser = async (req, res) => {
    try {
        const posts = await Post.find({ authorId: req.params.userId }).populate('authorId');
        if (!posts.length) {
            return res.status(200).json({ message: 'No posts found for this user', posts: [] });
        }

        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId; // Get current user ID from token

        // Prepend base URL to image paths
        prependBaseUrlToImages(posts, req);

        // Add likes and comments count to each post
        const postsWithCounts = await Promise.all(posts.map(async post => {
            const { likesCount, commentsCount } = await getLikesAndCommentsCount(post._id);
            const user = await User.findById(post.authorId);
            const likedByUser = await userLikesPost(post._id, userId); // Check if the user likes this post
            post.likesCount = likesCount;
            post.commentsCount = commentsCount;
            post.userName = user.userName || "unknown UserName";
            post.name = user.name || "unknown User";
            post.likedByUser = likedByUser; // Add this field to the post object
            return post;
        }));

        res.status(200).send(postsWithCounts);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).send({ message: 'Invalid User ID' });
        }
        console.error('Error retrieving user posts:', error);
        res.status(500).send({ message: 'Error retrieving user posts', error: error.message || error });
    }
};

// Get all posts that a user has liked with user information
exports.getPostsLikedByUser = async (req, res) => {
    try {
        const likedPosts = await Like.find({ userId: req.params.userId }).select('postId');
        const postIds = likedPosts.map(like => like.postId);

        if (!postIds.length) {
            return res.status(200).json({ message: 'No liked posts found for this user', posts: [] });
        }

        const posts = await Post.find({ _id: { $in: postIds } }).populate('authorId');

        // Prepend base URL to image paths
        prependBaseUrlToImages(posts, req);

        // Add likes and comments count to each post
        const postsWithCounts = await Promise.all(posts.map(async post => {
            const { likesCount, commentsCount } = await getLikesAndCommentsCount(post._id);
            const user = await User.findById(post.authorId);
            post.likesCount = likesCount;
            post.commentsCount = commentsCount;
            post.userName = user.userName || "unknown UserName";
            post.name = user.name || "unknown User";
            post.likedByUser = true;
            return post;
        }));

        res.status(200).send(postsWithCounts);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).send({ message: 'Invalid User ID' });
        }
        console.error('Error retrieving liked posts:', error);
        res.status(500).send({ message: 'Error retrieving liked posts', error: error.message || error });
    }
};

exports.searchPosts = async (req, res) => {
    try {
        const posts = await Post.find({ $text: { $search: req.query.q } }).populate('authorId');

        if (!posts.length) {
            return res.status(200).json({ message: 'No posts found for this search term', posts: [] });
        }

        // Prepend base URL to image paths
        prependBaseUrlToImages(posts, req);

        // Add likes and comments count to each post
        for (const post of posts) {
            // Check if post ID is valid
            if (!post._id) {
                return res.status(400).json({ message: 'Invalid Post ID', post });
            }

            // Get likes and comments count
            const { likesCount, commentsCount } = await getLikesAndCommentsCount(post._id);

            // Check if authorId is valid before fetching user
            if (!post.authorId) {
                return res.status(400).json({ message: 'Invalid Author ID', post });
            }

            const user = await User.findById(post.authorId);
            if (!user) {
                return res.status(404).json({ message: 'User not found for this post', post });
            }

            // Assign values
            post.likesCount = likesCount;
            post.commentsCount = commentsCount;
            post.userName = user.userName || "unknown UserName";
            post.name = user.name || "unknown User";
        }

        res.status(200).send(posts);
    } catch (error) {
        console.error('Error details:', error);
        res.status(500).send({ message: 'Error searching posts', error: error.message || error });
    }
};
