// Authontication Routes for User

const express = require('express');
const authController = require("../controllers/auth.controller");
const multer = require('multer');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// user auth APIs
router.post('/user/register', upload.single('avatar'), authController.registerUser);
router.post('/user/login', authController.loginUser);
router.get('/user/me', authMiddleware.authUserMiddleware, authController.getCurrentUser);
router.put('/user/profile', authMiddleware.authUserMiddleware, upload.single('avatar'), authController.updateUserProfile);
router.get('/user/logout', authController.logOutUser);

// food partner auth APIs
router.post('/food-partner/register', authController.registerFoodPartner);
router.post('/food-partner/login', authController.loginFoodPartner);
router.get('/food-partner/logout', authController.logOutFoodPartner);

module.exports = router;