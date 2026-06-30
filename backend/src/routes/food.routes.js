const express = require('express');
const multer = require('multer');
const foodController = require("../controllers/food.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js");
const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage()
})

// calling API(POST /api/food/ [protected])
router.post('/', 
    authMiddleware.authFoodPartnerMiddleware, 
    upload.single("video"), 
    foodController.createFood
) //first req sent to middleware then , when the next() function called, req farword to controller. .createFood set foodPartner's value

module.exports = router;