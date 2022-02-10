const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorresponse");
const User = require("../models/User");

exports.protect = async function(req, res, next) {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if(!token){
        return next(new ErrorResponse("Not authorized", 400));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
if(!user){
    return next(new ErrorResponse("User not found", 404));
}
req.user = user;
next()
    } catch (error) {
        return next(new ErrorResponse("Not Authorized", 400))
    }
}