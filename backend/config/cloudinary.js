const cloudinary = require('cloudinary').v2;
require('dotenv').config();
cloudinary.config({
  cloud_name: "dxp4ffpvt",
  api_key: "699993624611399",
  api_secret: "XbSElqrqfqw956nHNXa88nXKt6c",
});

module.exports = cloudinary;
