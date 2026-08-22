const foodPartnerModel = require("../models/foodpartner.model.js");
const userModel = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

async function authFoodPartnerMiddleware(req, res, next) {
    // is token avilable or not
    const token = req.cookies.token;

    if (!token) {
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

        if (!foodPartner) {
            return res
                .status(401)
                .json({
                    message: "Please login first."
                })
        }

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

async function authUserMiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res
            .status(401)
            .json({
                message: "Please login first."
            })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res
                .status(401)
                .json({
                    message: "Please login first."
                })
        }

        req.user = user
        next()

    } catch (err) {
        return res
            .status(401)
            .json({
                message: "Invalid token."
            })
    }
}

// Doesn't require login. If a valid *user* token/cookie is present it
// attaches req.user, otherwise it just proceeds with req.user left
// unset. Use this for routes that should be viewable by anyone
// (logged-out visitors, food partners, or logged-in users) but that
// optionally personalize the response (e.g. isLiked/isSaved) when the
// viewer happens to be a logged-in user.
async function optionalAuthUserMiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return next()
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded.id);

        if (user) {
            req.user = user
        }
    } catch (err) {
        // invalid/expired token, or the token belongs to a food partner,
        // not a user - either way, just continue as an anonymous viewer
    }

    next()
}

module.exports = {
    authFoodPartnerMiddleware,
    authUserMiddleware,
    optionalAuthUserMiddleware
}