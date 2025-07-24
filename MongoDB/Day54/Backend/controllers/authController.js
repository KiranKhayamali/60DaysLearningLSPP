const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const dotenv = require("dotenv");

dotenv.config();


const JWT_SECRET = process.env.JWT_SECRET;

const registerUser = async (req, res) => {
    const {username, email, password} = req.body;

    try{
        const existingUser = await User.findOne({ username });
        if(existingUser) return res.status(400).json({message: "User already exists!"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign({ id: newUser._id}, JWT_SECRET, {expiresIn: "7days"});
        res.status(201).json({
            user: {id: newUser._id, username: newUser.username, email: newUser.email},
            token,
        });
    } catch(error){
        res.status(500).json({message: "Server error!"});
        console.log(error);
    }
};

const loginUser = async (req, res) => {
    const {username, password} = req.body;

    try{
        const user = await User.findOne({ username});
        if(!user) return res.status(404).json({message: "The User does not exists!"});
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(401).json({message: "Invalid Credentials!"});

        const token = jwt.sign({ id: user._id}, JWT_SECRET, {expiresIn: "7days"});
        res.json({
            user: {id: user._id, username: user.username, email: user.email},
            token,
        });
    } catch(error){
        res.status(500).json({message: "Server Error!"});
    }
};

module.exports = {registerUser, loginUser};