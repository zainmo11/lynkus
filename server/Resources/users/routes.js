// this is the route
const express = require('express');

const {updateUser,deleteUser,searchUser,getUserProfile,changeUserPassword,resizeImg,UploadProfileImg}=require('./userController')
const {authenticate}=require("../auth/authController")
const {updateUserValidator,changeUserPasswordValidator}=require("./Validator")

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and operations
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Search for users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 */
router.get('/', searchUser);

/**
 * @swagger
 * /users/changePassword:
 *   put:
 *     summary: Change user password
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Bad request
 */
router.put('/changePassword', authenticate, changeUserPasswordValidator, changeUserPassword);

/**
 * @swagger
 * /users/profile/{id}:
 *   get:
 *     summary: Get user profile by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User profile retrieved
 *       404:
 *         description: User not found
 */
router.route('/profile/:id').get(getUserProfile);

/**
 * @swagger
 * /users:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 */
router.route('/').delete(authenticate, deleteUser);

/**
 * @swagger
 * /users:
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               profileImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User profile updated
 *       400:
 *         description: Bad request
 */
router.route('/')
    .put(authenticate, UploadProfileImg, resizeImg, updateUserValidator, updateUser);

module.exports = router;
