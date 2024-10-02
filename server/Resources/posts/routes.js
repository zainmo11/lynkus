// this is the route
const express = require('express');
const router = express.Router();
const { authorizePost, validatePost} = require('./middleware');
const postController = require('./controller');


/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the post.
 *               content:
 *                 type: string
 *                 description: The content of the post.
 *               userId:
 *                 type: string
 *                 description: The ID of the user creating the post.
 *     responses:
 *       201:
 *         description: Post created successfully.
 *       400:
 *         description: Invalid request.
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
 *         description: The ID of the post to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post retrieved successfully.
 *       404:
 *         description: Post not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Update a post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the post to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the post.
 *               content:
 *                 type: string
 *                 description: The content of the post.
 *     responses:
 *       200:
 *         description: Post updated successfully.
 *       400:
 *         description: Invalid request.
 *       404:
 *         description: Post not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the post to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deleted successfully.
 *       404:
 *         description: Post not found.
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
 *     summary: Get posts by user ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user to retrieve posts for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of posts by the user.
 *       404:
 *         description: User not found or no posts for user.
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
 *         description: The ID of the user to retrieve liked posts for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of posts liked by the user.
 *       404:
 *         description: User not found or no liked posts.
 *       500:
 *         description: Internal server error.
 */



// Post routes
router.post('/', validatePost, postController.createPost);
router.get('/:id', postController.getPost);
router.put('/:id',  authorizePost, validatePost, postController.updatePost);
router.delete('/:id',  authorizePost, postController.deletePost);
router.get('/', postController.getAllPosts);
router.get('/user/:userId', postController.getPostsByUser);
router.get('/likes/:userId',  postController.getPostsLikedByUser);

module.exports = router;


// to-do list
// add authentication to the routes
