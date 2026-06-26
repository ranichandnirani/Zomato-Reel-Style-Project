const userModel = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
    const { fullName, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        email
    })
    if(isUserAlreadyExists) {
        return res
            .status(400)
            .json({
                massage: "User already exists"
            })
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName,
        email,
        password: hashPassword
    })
 
    const token = jwt.sign({
        id: user._id,
    }, "985e99babf0e2c4e5a5a5c86c0857a74ca467acf")
    res.cookie("token", token)

    res
     .status(201)
     .json({
            massage: "User registered successfully",
            user: {
                _id: user._id,
                email: user.email,
                fullName: user.fullName
            } 
     })   

}

module.exports = {
    registerUser
}