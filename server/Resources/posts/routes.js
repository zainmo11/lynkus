// this is the route
const express = require('express');

const router = express.Router();
const { authorizePost, validatePost} = require('./middleware');
const postController = require('./controller');
const { validateAuthentication } = require('./middleware');
const {postUpload} = require('../../utils/upload');
const {authenticate}= require('../auth/authController')

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     tokenAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - tokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               postBody:
 *                 type: string
 *                 description: The body content of the post.
 *               authorId:
 *                 type: string
 *                 description: The ID of the post's author.
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Optional image file for the post.
 *             required:
 *               - postBody
 *               - authorId
 *     responses:
 *       201:
 *         description: Post created successfully.
 *       400:
 *         description: Invalid request - missing postBody or authorId.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to retrieve.
 *     responses:
 *       200:
 *         description: Post retrieved successfully.
 *       404:
 *         description: Post not found.
 *       400:
 *         description: Invalid Post ID.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Update a post by ID
 *     tags: [Posts]
 *     security:
 *       - tokenAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to update.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               body:
 *                 type: string
 *                 description: The body content of the post.
 *               authorId:
 *                 type: string
 *                 description: The ID of the post's author.
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Optional image file to update.
 *     responses:
 *       200:
 *         description: Post updated successfully.
 *       404:
 *         description: Post not found.
 *       400:
 *         description: Invalid Post ID.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post by ID
 *     tags: [Posts]
 *     security:
 *       - tokenAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to delete.
 *     responses:
 *       200:
 *         description: Post deleted successfully.
 *       404:
 *         description: Post not found.
 *       400:
 *         description: Invalid Post ID.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: List of posts retrieved successfully.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /posts/user/{userId}:
 *   get:
 *     summary: Get all posts by a specific user
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to retrieve posts for.
 *     responses:
 *       200:
 *         description: List of posts by the user.
 *       404:
 *         description: No posts found for this user.
 *       400:
 *         description: Invalid User ID.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /posts/likes/{userId}:
 *   get:
 *     summary: Get posts liked by a user
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to retrieve liked posts for.
 *     responses:
 *       200:
 *         description: List of posts liked by the user.
 *       404:
 *         description: No liked posts found for this user.
 *       400:
 *         description: Invalid User ID.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /posts/searchPost:
 *   get:
 *     summary: Search posts by a search term
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: The search query to match post body content.
 *     responses:
 *       200:
 *         description: List of posts matching the search query.
 *       404:
 *         description: No posts found for the search term.
 *       500:
 *         description: Internal server error.
 */

// Post routes
// Route Definitions
router.post('/', authenticate, validatePost, postUpload, postController.createPost);
router.get('/:id', authenticate, postController.getPost);
router.put('/:id', authenticate, authorizePost, validatePost, postUpload, postController.updatePost);
router.delete('/:id', authenticate, authorizePost, postController.deletePost);
router.get('/', authenticate, postController.getAllPosts);
router.get('/user/:userId', authenticate, postController.getPostsByUser);
router.get('/likes/:userId',authenticate, postController.getPostsLikedByUser);
router.get('/searchPost', postController.searchPosts);
module.exports = router;


