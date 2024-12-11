const catchAsyncError = require('../middleware/catchAsyncError');
const Order = require('../models/orderModel')
const Product = require('../models/productmodel')
const ErrorHandler = require('../utils/errorHandler')
const multer = require("multer");
const path = require("path");
const fs = require('fs');

// Define storage configuration for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads/invoices');  // Use correct path
        ensureDirectoryExists(uploadPath);  // Ensure this folder exists
        cb(null, uploadPath);  // Destination folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Set a unique filename based on the timestamp
    },
});

// Define the file upload process
const upload = multer({
    storage: storage,
}).single('invoice'); // Field name should be 'invoice'

// Controller function to handle invoice upload
exports.uploadInvoice = catchAsyncError(async (req, res, next) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error("Multer Error:", err); // Log multer errors
            return next(new ErrorHandler(`File upload error: ${err.message}`, 400));
        }

        if (!req.file) {
            return next(new ErrorHandler("No file uploaded", 400));
        }

        console.log("File Uploaded:", req.file); // Log uploaded file
        console.log("Request Body:", req.body); // Log request body

        const { orderId } = req.body;
        if (!orderId) {
            return next(new ErrorHandler("Order ID is required", 400));
        }

        const order = await Order.findById(orderId);
        if (!order) {
            return next(new ErrorHandler("Order not found", 404));
        }

        // Save the invoice file path to the order
        order.invoice = `uploads/invoices/${req.file.filename}`;
        await order.save();

        res.status(200).json({
            success: true,
            message: "Invoice uploaded successfully",
            invoiceUrl: `${req.protocol}://${req.get("host")}/${order.invoice}`,
        });
    });
});










//Create New Order - api/v1/order/new
exports.newOrder =  catchAsyncError (async (req, res, next) => {
    try{
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user.id
    })

   
        // Reduce stock for each product
        for (let item of orderItems) {
            await updateStock(item.product, item.quantity);
        }

        res.status(201).json({
            success: true,
            order
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
exports.updateOrder =  catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if(order.orderStatus == 'Delivered') {
        return next(new ErrorHandler('Order has been already delivered!', 400))
    }
    //Updating the product stock of each order item
    order.orderItems.forEach(async orderItem => {
        await updateStock(orderItem.product, orderItem.quantity)
    })

    order.orderStatus = req.body.orderStatus;
    order.deliveredAt = Date.now();
    await order.save();

    res.status(200).json({
        success: true
    })
    
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



