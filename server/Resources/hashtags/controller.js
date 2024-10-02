// this is the controller
const Hashtag = require('./model');
const Post = require('../posts/model');

// Create a new hashtag
exports.createHashtag = async (req, res) => {
    try {
        const { text, postId } = req.body;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }

        const hashtag = new Hashtag({ text, postId });
        await hashtag.save();

        res.status(201).send(hashtag);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get all hashtags for a specific post
exports.getHashtagsByPost = async (req, res) => {
    try {
        const hashtags = await Hashtag.find({ postId: req.params.postId });
        res.send(hashtags);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Delete a hashtag
exports.deleteHashtag = async (req, res) => {
    try {
        const { id } = req.params;

        const hashtag = await Hashtag.findByIdAndDelete(id);
        if (!hashtag) {
            return res.status(404).send({ message: 'Hashtag not found' });
        }

        res.send({ message: 'Hashtag deleted' });
    } catch (error) {
        res.status(500).send(error);
    }
};
