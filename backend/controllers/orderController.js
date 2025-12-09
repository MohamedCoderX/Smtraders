const catchAsyncError = require('../middleware/catchAsyncError');
const Order = require('../models/orderModel')
const Product = require('../models/productmodel')
const ErrorHandler = require('../utils/errorHandler')
const multer = require("multer");
const path = require("path");
const fs = require('fs');
const { exec } = require('child_process');
const Counter = require('../models/CounterModel');



// Define storage configuration for Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, "../uploads/invoices");
        ensureDirectoryExists(uploadPath);  // Ensure this folder exists
        cb(null, uploadPath);  // Destination folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));  // Use unique name based on timestamp
    },
});



exports.uploadInvoice = catchAsyncError(async (req, res, next) => {
    const { invoice, orderId, fileName } = req.body;

    if (!invoice || !orderId || !fileName) {
        return next(new ErrorHandler("Missing required fields", 400));
    }

    const order = await Order.findById(orderId);
    if (!order) {
        return next(new ErrorHandler("Order not found", 404));
    }

    // Decode Base64 and save the file
    const uploadPath = path.join(__dirname, "../uploads/invoices");
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }

    const filePath = path.join(uploadPath, fileName);
    const buffer = Buffer.from(invoice, "base64");

    fs.writeFileSync(filePath, buffer);

    // Save file path to the order
    order.invoice = `uploads/invoices/${fileName}`;
    await order.save();

    res.status(200).json({
        success: true,
        message: "Invoice uploaded successfully",
        invoiceUrl: `${req.protocol}://${req.get("host")}/${order.invoice}`,
    });
});








exports.newOrder = catchAsyncError(async (req, res, next) => {
  try {
    const {
      orderItems,
      shippingInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paymentInfo,
    } = req.body;

   
    

    // Generate new incremental order number
    const counter = await Counter.findOneAndUpdate(
        { id: 'orderNumber' }, // Find the counter document with id 'orderNumber'
        { $inc: { seq: 1 } },  // Increment the sequence by 1
        { new: true, upsert: true } // Create the counter if it doesn't exist
      );
      const newOrderNumber = counter.seq; // Get the updated sequence number

    // ✅ Create new order
    const order = await Order.create({
      orderItems,
      shippingInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paymentInfo,
      orderNumber: newOrderNumber,
      paidAt: Date.now(),
    });

    // Reduce stock for each product
    for (let item of orderItems) {
      await updateStock(item.product, item.quantity);
    }



    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    return next(error);
  }
});
  
//Get Single Order - api/v1/order/:id
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if(!order) {
        return next(new ErrorHandler(`Order not found with this id: ${req.params.id}`, 404))
    }

    res.status(200).json({
        success: true,
        order
    })
})

//Get Loggedin User Orders - /api/v1/myorders
exports.myOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({user: req.user.id});

    res.status(200).json({
        success: true,
        orders
    })
})

//Admin: Get All Orders - api/v1/orders
exports.orders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})

//Admin: Update Order / Order Status - api/v1/order/:id
exports.updateOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
  
    if (!order) {
      return next(new ErrorHandler("Order not found", 404));
    }
  
    if (!req.body.orderStatus) {
      return next(new ErrorHandler("No order status provided", 400));
    }
  
    if (order.orderStatus === "Delivered") {
      return next(new ErrorHandler("Order has already been delivered!", 400));
    }
  
    order.orderStatus = req.body.orderStatus;
  
    if (req.body.orderStatus === "Completed" || req.body.orderStatus === "Delivered") {
      order.deliveredAt = Date.now();
    }
  
    await order.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
      message: `Order status saved as ${req.body.orderStatus}`,
    });
  });
  

async function updateStock (productId, quantity){
    const product = await Product.findById(productId);
    product.stock = product.stock - quantity;
    product.save({validateBeforeSave: false})
}

//Admin: Delete Order - api/v1/order/:id
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if(!order) {
        return next(new ErrorHandler(`Order not found with this id: ${req.params.id}`, 404))
    }

    await order.deleteOne();
    res.status(200).json({
        success: true
    })
})

exports.updateStock = async (productId, quantity) => {
    const product = await Product.findById(productId);

    if (!product) {
        throw new Error('Product not found');
    }

    if (product.stock < quantity) {
        throw new Error(`${product.name} is out of stock`);
    }

    product.stock -= quantity;

    await product.save({ validateBeforeSave: false });
};



