const express = require('express');
const { newOrder, getSingleOrder, myOrders, orders, updateOrder, deleteOrder ,uploadInvoice} = require('../controllers/orderController');
const { isAunthenticatedUser, authorizeRoles } = require('../middleware/authenticate');
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require('fs');

// Define storage configuration for Multer

const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '..', 'uploads/invoices');
        fs.mkdirSync(uploadPath, { recursive: true }); // Ensure directory exists
        cb(null, uploadPath);
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Add timestamp for uniqueness
      },
    }),
  });
  

router.route('/order/new').post(isAunthenticatedUser,newOrder);
router.route('/order/:id').get(isAunthenticatedUser,getSingleOrder)
router.route('/myorders').get(isAunthenticatedUser,myOrders)

//admin routes
// Admin: Upload Invoice
router.route('/admin/upload-invoice').post(upload.single("invoice"),uploadInvoice);
router.route('/admin/orders').get(isAunthenticatedUser,authorizeRoles('admin'),orders)
router.route('/admin/order/:id').put(isAunthenticatedUser,authorizeRoles('admin'),updateOrder)
router.route('/admin/order/:id').delete(isAunthenticatedUser,authorizeRoles('admin'),deleteOrder)


module.exports = router;