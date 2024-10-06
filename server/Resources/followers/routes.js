// this is the route
const express = require('express');

const router = express.Router();
const {authenticate}=require('../auth/authController')

const {getRecommendedFollowers,getUserFollowers,getUserFollowing,followUser}=require('./controller')

/**
 * @swagger
 * /followers/{id}:
 *   get:
 *     summary: Get User Followers
 *     tags: [Followers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user whose followers are to be retrieved.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of followers for the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       user:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           profileImg:
 *                             type: string
 *                 totalPages:
 *                   type: integer
 *                 page:
 *                   type: integer
 *       400:
 *         description: Invalid user ID or user not found.
 *       404:
 *         description: User not found.
 */

/**
 * @swagger
 * /following/{id}:
 *   get:
 *     summary: Get User Following
 *     tags: [Following]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user whose followings are to be retrieved.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of users that the specified user is following.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       following:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           profileImg:
 *                             type: string
 *                 totalPages:
 *                   type: integer
 *                 page:
 *                   type: integer
 *       400:
 *         description: Invalid user ID or user not found.
 *       404:
 *         description: User not found.
 */

/**
 * @swagger
 * /{id}:
 *   post:
 *     summary: Follow a User
 *     tags: [Followers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to follow or unfollow.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []  # Requires authentication
 *     responses:
 *       200:
 *         description: User followed or unfollowed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 deletedFollows:
 *                   type: object
 *                   nullable: true
 *                 newFollow:
 *                   type: object
 *                   nullable: true
 *                 notification:
 *                   type: object
 *                   nullable: true
 *       400:
 *         description: Invalid user ID or can't follow yourself.
 *       404:
 *         description: User not found.
 */

/**
 * @swagger
 * /recommended:
 *   get:
 *     summary: Get Recommended Followers
 *     tags: [Followers]
 *     security:
 *       - bearerAuth: []  # Requires authentication
 *     responses:
 *       200:
 *         description: A list of recommended users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 recommendedUsers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       profileImg:
 *                         type: string
 *       404:
 *         description: No recommended users found.
 */
router.get('/followers/:id', getUserFollowers)

router.get('/following/:id', getUserFollowing)

router.post('/:id', authenticate,followUser)
router.get('/recommended',authenticate, getRecommendedFollowers)





module.exports = router;
