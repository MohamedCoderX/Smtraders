const express = require("express");
const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct, getAdminProducts } = require("../controllers/productController");
const { model } = require("mongoose");
const router = express.Router();
const {isAunthenticatedUser, authorizeRoles} = require('../middleware/authenticate')
const path = require('path')
const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');


// Setup Multer Storage with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'products', // Folder name in Cloudinary
    allowedFormats: ['jpeg', 'png', 'jpg'], // Allowed image formats
    transformation: [{ width: 500, height: 500, crop: "limit" }],
    public_id: (req, file) => `product-${Date.now()}-${file.originalname.split('.')[0]}`, // Unique ID
  },
});

const upload = multer({ storage });

router.route('/products').get(getProducts);
router.route('/products/new').post(isAunthenticatedUser,authorizeRoles('admin'),newProduct);
router.route('/product/:id').get(getSingleProduct)
router.route('/product/:id').put(updateProduct)



//admin routes

router.route('/admin/products').get(isAunthenticatedUser,authorizeRoles('admin'),getAdminProducts)
router.route('/admin/product/new').post(isAunthenticatedUser, authorizeRoles('admin'),upload.single('images'), newProduct);
router.route('/admin/product/:id').delete(isAunthenticatedUser,authorizeRoles('admin'),deleteProduct)
module.exports = router;