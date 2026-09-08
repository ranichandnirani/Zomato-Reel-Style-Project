const foodPartnerModel = require("../models/foodpartner.model.js");
const foodModel = require('../models/food.model');

async function getFoodPartnerById(req, res) {
    const foodPartnerId = req.params.id;

    const foodPartner = await foodPartnerModel.findById(foodPartnerId)
    const foodItemsByFoodPartner = await foodModel.find({ foodPartner: foodPartnerId })

    if (!foodPartner) {
        return res
            .status(404)
            .json({ message: "Food partner not found" })
    }

    res.status(200).json({ 
        message: "Food partner found", 
        foodPartner: {
        ...foodPartner.toObject(),
        foodItems: foodItemsByFoodPartner,
        totalMeals: foodItemsByFoodPartner.length
    } })
}

async function incrementCustomersServed(req, res) {
    const foodPartner = await foodPartnerModel.findByIdAndUpdate(
        req.foodPartner._id,
        { $inc: { customersServed: 1 } },
        { new: true }
    )

    res.status(200).json({
        message: 'Customer count updated successfully.',
        customersServed: foodPartner.customersServed
    })
}

module.exports = { getFoodPartnerById, incrementCustomersServed }