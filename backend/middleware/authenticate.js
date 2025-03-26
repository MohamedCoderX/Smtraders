const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
   console.log("Received Cookies:", req.cookies);  // ✅ Check if token is present
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


exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler(`Role ${req.user.role} is not allowed`, 403));
    }
    next();
  };
};
