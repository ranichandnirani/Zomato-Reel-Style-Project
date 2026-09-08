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

// calling API(GET /api/food/ [public, but personalized if a user is logged in])
router.get('/',
    authMiddleware.optionalAuthUserMiddleware,
    foodController.getFoodItems
)

// like a food item (requires a logged-in user)
router.post('/like',
    authMiddleware.authUserMiddleware,
    foodController.likeFood
)

// save a food item (requires a logged-in user)
router.post('/save',
    authMiddleware.authUserMiddleware,
    foodController.saveFood
)

// get saved items for the logged-in user
router.get('/saved',
    authMiddleware.authUserMiddleware,
    foodController.getSavedItems
)

router.post('/:id/comments',
    authMiddleware.authUserMiddleware,
    foodController.addComment
)
 
// get comments for a food item
router.get('/comments/:id',
    authMiddleware.authUserMiddleware,
    foodController.getComments
)

router.post('/comments/:id/reaction',
    authMiddleware.authUserMiddleware,
    foodController.reactToComment
)
module.exports = router;