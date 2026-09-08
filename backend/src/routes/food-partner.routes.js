const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const foodPartnerController = require("../controllers/food-partner.controller.js");

const router = express.Router();

// POST /api/food-partner/:id/customers-served [protected - food partner]
router.post('/:id/customers-served',
    authMiddleware.authFoodPartnerMiddleware,
    foodPartnerController.incrementCustomersServed
)

// GET /api/food-partner/:id [public - viewable by anyone]
router.get('/:id',
    authMiddleware.optionalAuthUserMiddleware,
    foodPartnerController.getFoodPartnerById
)

module.exports = router;