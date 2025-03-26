const ErrorHanlder = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

exports.isAunthenticatedUser = catchAsyncError(async (req, res, next) => {
   console.log("Cookies Received:", req.cookies);  // Debugging
   console.log("Authorization Header:", req.headers.authorization);

   const { token } = req.cookies;

   if (!token) {
       return next(new ErrorHanlder('Login first to handle this resource', 401));
   }

   try {
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
       req.user = await User.findById(decoded.id);
       next();
   } catch (error) {
       return next(new ErrorHanlder("Invalid token", 401));
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