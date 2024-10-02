const express = require('express');
const router = express.Router();
const hashtagController = require('./controller');
const { validateHashtag } = require('./middleware');

/**
 * @swagger
 * /hashtags:
 *   post:
 *     summary: Create a new hashtag
 *     tags: [Hashtags]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: The text of the hashtag.
 *               postId:
 *                 type: string
 *                 description: The ID of the post the hashtag is associated with.
 *     responses:
 *       201:
 *         description: Hashtag created successfully.
 *       400:
 *         description: Bad request. Missing required fields.
 *       404:
 *         description: Post not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /hashtags/{postId}:
 *   get:
 *     summary: Get all hashtags for a specific post
 *     tags: [Hashtags]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: The ID of the post to retrieve hashtags for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of hashtags for the post.
 *       404:
 *         description: Post not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /hashtags/{id}:
 *   delete:
 *     summary: Delete a hashtag
 *     tags: [Hashtags]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the hashtag to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Hashtag deleted successfully.
 *       404:
 *         description: Hashtag not found.
 *       500:
 *         description: Internal server error.
 */

// Hashtag routes
router.post('/', validateHashtag, hashtagController.createHashtag);
router.get('/:postId', hashtagController.getHashtagsByPost);
router.delete('/:id', hashtagController.deleteHashtag);

module.exports = router;



// to do
// add authentication to the routes
