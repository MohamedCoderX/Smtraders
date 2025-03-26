const ErrorHanlder = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
exports.isAunthenticatedUser = catchAsyncError(async (req, res, next) => {
   console.log("Cookies Received:", req.cookies);  // ✅ Check cookies
   console.log("Authorization Header:", req.headers.authorization);

   const { token } = req.cookies;

   if (!token) {
       console.error("No token found in cookies!"); // Debugging
       return next(new ErrorHandler('Login first to handle this resource', 401));
   }

   try {
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
       req.user = await User.findById(decoded.id);
       console.log("User Authenticated:", req.user); // ✅ Log user details
       next();
   } catch (error) {
       console.error("Token verification failed:", error); // Debugging
       return next(new ErrorHandler("Invalid token", 401));
   }
});

exports.authorizeRoles = (...roles) =>{
   return(req,res,next) => {
if(!roles.includes(req.user.role)){
   return next(new ErrorHanlder(`role ${req.user.role} is not defined`,401))
}
next()
   }
}