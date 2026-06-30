const foodPartnerModel = require('../models/foodpartner.model.js');
const jwt = require("jsonwebtoken");

async function authFoodPartnerMiddleware(req, res, next) {
    // is token avilable or not
    const token = req.cookies.token;

    if(!token) {
        return res
         .status(401)
         .json({
            message: "Please login first."
         })

    }

    // if token is avilable then check, is token correct
    try {
        // if token is correct then data(foodpartner id) is store in decoded in the form of object
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // access foofpartner detail by id
        const foodPartner = await foodPartnerModel.findById(decoded.id);

        req.foodPartner = foodPartner

        next();

    } catch (err) {
        // if token is incorrect then jwt return an error
        return res
         .status(401)
         .json({
            message: "Invelid token."
         })
    }
}

module.exports = {
    authFoodPartnerMiddleware
}