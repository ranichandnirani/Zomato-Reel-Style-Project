const { router } = require('../app.js');
const foodModel = require('../models/food.model.js');
const storageService = require("../services/storage.service.js");
const { v4: uuid } = require('uuid');

async function createFood(req, res) {

    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid())
    // console.log(fileUploadResult);

    //created food items
    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id
    })

    res
      .status(201)
      .json({
        message: "Food item created successfully.",
        food: foodItem
      })
}

async function getFoodItems(req, res) {
    const foodItems = await foodModel.find({})

    const userId = req.user?._id?.toString()

    // attach isLiked/isSaved for the current user so the frontend
    // doesn't lose that state on every poll/refresh
    const itemsWithUserState = foodItems.map((item) => {
        const obj = item.toObject()
        return {
            ...obj,
            isLiked: userId ? (obj.likedBy || []).some((id) => id.toString() === userId) : false,
            isSaved: userId ? (obj.savedBy || []).some((id) => id.toString() === userId) : false,
        }
    })

    res
     .status(200)
     .json({
        message: "Food item fetched successfully.",
        foodItems: itemsWithUserState
     })
}

async function likeFood(req, res) {
    const { foodId } = req.body;
    const userId = req.user._id;

    const food = await foodModel.findById(foodId);
    if (!food) {
        return res.status(404).json({ message: "Food item not found." });
    }

    if (!food.likedBy) food.likedBy = []

    const alreadyLiked = food.likedBy.some(id => id.toString() === userId.toString());

    if (alreadyLiked) {
        food.likedBy.pull(userId);
        food.likeCount = Math.max((food.likeCount || 0) - 1, 0);
    } else {
        food.likedBy.push(userId);
        food.likeCount = (food.likeCount || 0) + 1;
    }

    await food.save();

    res.status(200).json({
        message: alreadyLiked ? "Food unliked." : "Food liked.",
        like: !alreadyLiked,
        likeCount: food.likeCount
    });
}

async function saveFood(req, res) {
    const { foodId } = req.body;
    const userId = req.user._id;

    const food = await foodModel.findById(foodId);
    if (!food) {
        return res.status(404).json({ message: "Food item not found." });
    }

    if (!food.savedBy) food.savedBy = []

    const alreadySaved = food.savedBy.some(id => id.toString() === userId.toString());

    if (alreadySaved) {
        food.savedBy.pull(userId);
        food.savesCount = Math.max((food.savesCount || 0) - 1, 0);
    } else {
        food.savedBy.push(userId);
        food.savesCount = (food.savesCount || 0) + 1;
    }

    await food.save();

    res.status(200).json({
        message: alreadySaved ? "Food unsaved." : "Food saved.",
        save: !alreadySaved,
        savesCount: food.savesCount
    });
}


module.exports = {
    createFood,
    getFoodItems,
    likeFood,
    saveFood
}