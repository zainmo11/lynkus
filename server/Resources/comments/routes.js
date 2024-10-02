const express = require('express');
const router = express.Router();
const commentController = require('./controller');
const { validateComment } = require('./middleware');

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: The content of the comment.
 *               userId:
 *                 type: string
 *                 description: The ID of the user making the comment.
 *               postId:
 *                 type: string
 *                 description: The ID of the post the comment is associated with.
 *     responses:
 *       201:
 *         description: Comment created successfully.
 *       400:
 *         description: Bad request. Missing required fields.
 *       404:
 *         description: Post not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /comments/{postId}:
 *   get:
 *     summary: Get all comments for a specific post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: The ID of the post to retrieve comments for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of comments for the post.
 *       404:
 *         description: Post not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     summary: Update a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the comment to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: The updated content of the comment.
 *     responses:
 *       200:
 *         description: Comment updated successfully.
 *       404:
 *         description: Comment not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the comment to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment deleted successfully.
 *       404:
 *         description: Comment not found.
 *       500:
 *         description: Internal server error.
 */

// Comment routes
router.post('/', validateComment, commentController.createComment);
router.get('/:postId', commentController.getCommentsByPost);
router.put('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);

module.exports = router;

// to-do
// add authentication to the routes
