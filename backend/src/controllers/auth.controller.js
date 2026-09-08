const userModel = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const foodpartnerModel = require("../models/foodpartner.model.js");
const storageService = require('../services/storage.service.js');
const { v4: uuid } = require('uuid');

async function registerUser(req, res) {
    const { fullName, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        email
    })
    if(isUserAlreadyExists) {
        return res
            .status(400)
            .json({
                message: "User already exists"
            })
    }
    const hashPassword = await bcrypt.hash(password, 10);

    let avatar = ''
    if (req.file) {
        const uploadResult = await storageService.uploadFile(req.file.buffer, `avatar-${uuid()}`)
        avatar = uploadResult.url
    }

    const user = await userModel.create({
        fullName,
        email,
        password: hashPassword,
        avatar
    })
 
    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)
    res.cookie("token", token)

    res
     .status(201)
     .json({
            message: "User registered successfully",
            user: {
                _id: user._id,
                email: user.email,
                name: user.fullName,
                avatar: user.avatar
            } 
     })   

}

async function loginUser(req, res) {
    const {email, password } = req.body;

    const user = await userModel.findOne({
        email
    })

    // if user not exists(user found)
    if(!user) {
        return res
            .status(400)
            .json({
                message: "Invalid email or password"
            })
    }

    // if user not exists(!password is valid)
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
        return res
            .status(400)
            .json({
                message: "Invalid email or password"
            })
    }

    // create token
    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res
     .status(201)
     .json({
        message: "User registered successfully",
        user: {
            _id: user._id,
            email: user.email,
            name: user.fullName,
            avatar: user.avatar
        } 
     })   
}

function logOutUser(req, res) {
    res.clearCookie("token");
    res.status(200).json({
        message: "User logged out successfully"
    });
}

    async function getCurrentUser(req, res) {
        res.status(200).json({
            user: {
                _id: req.user._id,
                email: req.user.email,
                name: req.user.fullName,
                avatar: req.user.avatar || ''
            }
        })
    }

    async function updateUserProfile(req, res) {
        const updates = {}
        if (typeof req.body.fullName === 'string' && req.body.fullName.trim()) {
            updates.fullName = req.body.fullName.trim()
        }

        if (req.file) {
            const uploadResult = await storageService.uploadFile(req.file.buffer, `avatar-${uuid()}`)
            updates.avatar = uploadResult.url
        }

        const user = await userModel.findByIdAndUpdate(req.user._id, updates, { new: true })
        res.status(200).json({
            message: 'Profile updated successfully',
            user: {
                _id: user._id,
                email: user.email,
                name: user.fullName,
                avatar: user.avatar || ''
            }
        })
    }

async function registerFoodPartner(req, res) {
    const {name, email, password, phone, address, contactName } = req.body;

    const isAccountAlreadyExists = await foodpartnerModel.findOne({
        email
    })

    if(isAccountAlreadyExists) {
        return res
          .status(400)
          .json({
            message: "Food partner account already exists."
          })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const foodPartner = await foodpartnerModel.create({
        name,
        email,
        password: hashedPassword, 
        phone,
        address,
        contactName
    })

    // create token
    const token = jwt.sign({
        id: foodPartner._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res
     .status(201)
     .json({
        message: "Food partner registered successfully",
        user: {
            _id: foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.name,
            address: foodPartner.address,
            phone: foodPartner.phone,
            contactName: foodPartner.contactName
        } 
     })     
}

async function loginFoodPartner(req, res) {
    const {name, email, password} = req.body;

    const foodPartner = await foodpartnerModel.findOne({
        email
    })
    
    if(!foodPartner) {
        return res
          .status(400)
          .json({
            message: "Invalid email or password."
          })
    }

    const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

    if(!isPasswordValid) {
        return res
          .status(400)
          .json({
            message: "Invalid email or password."
          })
    }

    // create token
    const token = jwt.sign({
        id: foodPartner._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res
     .status(201)
     .json({
        massage: "Food partner login successfully",
        user: {
            _id: foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.name
        } 
     }) 
}

function logOutFoodPartner(req, res) {
    res.clearCookie("token");
    res
      .status(200)
      .json({
        message: "Food partner logged out successfully."
      });
}

module.exports = {
    registerUser,
    loginUser,
    logOutUser,
        getCurrentUser,
        updateUserProfile,
    registerFoodPartner,
    loginFoodPartner,
    logOutFoodPartner
}