const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const foodPartnerController = require("../controllers/food-partner.controller.js");


const router = express.Router();

// GET /api/food/food-partner/:id
router.get('/food-partner/:id',
    authMiddleware.authUserMiddleware,
    foodPartnerController.getFoodPartnerById
)


module.exports = router;

