const jwt = require("jsonwebtoken");
const User = require("../models/User");


const JWT_SECRET = process.env.JWT_SECRET;

const protect = async(req, res, next) => {
    const authHeader = req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password"); //attach user info
            next();
        } catch (error) {
            return res.status(401).json({message: "Invalid token!"});
        };
    } else {
        return res.status(401).json({message: "Authorization denied, Token missing!"});
    };
};

module.exports = {protect};