const mongoose = require('mongoose');

const foodpartnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contactName: {
        type: String,
        required: true
    }, 
    phone:{
        type: String,
        required: true
    },   
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    customersServed: {
        type: Number,
        default: 0
    },
    foods: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "food"
    }]

})

const foodpartnerModel = mongoose.model("foodpartner", foodpartnerSchema)

module.exports = foodpartnerModel;