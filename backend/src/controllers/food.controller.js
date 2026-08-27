const { router } = require('../app.js');
const foodModel = require('../models/food.model.js');
const likeModel = require('../models/likes.model.js');
const saveModel = require('../models/save.model.js');
const storageService = require("../services/storage.service.js");
const { v4: uuid } = require('uuid');

async function createFood(req, res) {

    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid())

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

    let likedSet = new Set()
    let savedSet = new Set()

    if (userId) {
        const foodIds = foodItems.map((item) => item._id)

        const [likes, saves] = await Promise.all([
            likeModel.find({ user: userId, food: { $in: foodIds } }),
            saveModel.find({ user: userId, food: { $in: foodIds } }),
        ])

        likedSet = new Set(likes.map((l) => l.food.toString()))
        savedSet = new Set(saves.map((s) => s.food.toString()))
    }

    const itemsWithUserState = foodItems.map((item) => {
        const obj = item.toObject()
        return {
            ...obj,
            like: likedSet.has(obj._id.toString()),
            save: savedSet.has(obj._id.toString()),
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
    const user = req.user;

    const isAlreadyLiked = await likeModel.findOne({
        user: user._id,
        food: foodId
    })

    if (isAlreadyLiked) {
        await likeModel.deleteOne({
            user: user._id,
            food: foodId
        });

        const updated = await foodModel.findByIdAndUpdate(
            foodId,
            { $inc: { likeCount: -1 } },
            { new: true }
        );

        return res.status(200).json({
            message: "Food item unliked successfully.",
            like: false,
            likeCount: updated?.likeCount ?? 0
        })
    }

    await likeModel.create({
        user: user._id,
        food: foodId
    })

    const updated = await foodModel.findByIdAndUpdate(
        foodId,
        { $inc: { likeCount: 1 } },
        { new: true }
    );

    res.status(201).json({
        message: "Food item liked successfully.",
        like: true,
        likeCount: updated?.likeCount ?? 0
    })
}

async function saveFood(req, res) {
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadySaved = await saveModel.findOne({
        user: user._id,
        food: foodId
    })

    if (isAlreadySaved) {
        await saveModel.deleteOne({
            user: user._id,
            food: foodId
        })

        // this decrement was missing before — count never went down on unsave
        const updated = await foodModel.findByIdAndUpdate(
            foodId,
            { $inc: { saveCount: -1 } },
            { new: true }
        );

        return res.status(200).json({
            message: "Food unsaved successfully.",
            save: false,
            saveCount: updated?.saveCount ?? 0
        })
    }

    await saveModel.create({
        user: user._id,
        food: foodId
    })

    const updated = await foodModel.findByIdAndUpdate(
        foodId,
        { $inc: { saveCount: 1 } },
        { new: true }
    );

    res.status(200).json({
        message: "Food saved successfully.",
        save: true,
        saveCount: updated?.saveCount ?? 0
    })
}

async function getSavedItems(req, res) {
    const user = req.user;

    const saves = await saveModel.find({ user: user._id }).populate('food')

    const savedItems = saves
        .filter((s) => s.food)
        .map((s) => {
            const obj = s.food.toObject()
            return {
                ...obj,
                save: true,
            }
        })

    res.status(200).json({
        message: "Saved items fetched successfully.",
        savedItems
    })
}

async function addComment(req, res) {
    const { id } = req.params
    const { text } = req.body
 
    if (!text || !text.trim()) {
        return res
          .status(400)
          .json({ message: "Comment text is required." })
    }
 
    const foodItem = await foodModel.findById(id)
    if (!foodItem) {
        return res
          .status(404)
          .json({ message: "Food item not found." })
    }
 
    const comment = await commentModel.create({
        text: text.trim(),
        food: id,
        user: req.user._id
    })
 
    foodItem.commentsCount = (foodItem.commentsCount || 0) + 1
    await foodItem.save()
 
    const populatedComment = await comment.populate('user', 'fullName')
 
    res
      .status(201)
      .json({
        message: "Comment added successfully.",
        comment: populatedComment
      })
}

async function getComments(req, res) {
    const { id } = req.params
 
    const foodItem = await foodModel.findById(id)
    if (!foodItem) {
        return res
          .status(404)
          .json({ message: "Food item not found." })
    }
 
    const comments = await commentModel
        .find({ food: id })
        .sort({ createdAt: 1 })
        .populate('user', 'fullName')
 
    res
      .status(200)
      .json({
        message: "Comments fetched successfully.",
        comments
      })
}

 
// POST /api/food/:id/comments  [protected - user]

module.exports = {
    createFood,
    getFoodItems,
    likeFood,
    saveFood,
    getSavedItems,
    addComment,
    getComments
}