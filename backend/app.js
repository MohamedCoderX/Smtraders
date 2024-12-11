const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [
    'https://smtraders.onrender.com',
    'http://localhost:3000'
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Routes
const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');
const uploadInvoiceRoutes = require('./routes/order');
const errorMiddleware = require('./middleware/error');

// Static Files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route Mounting
app.use('/api/v1/', products);
app.use('/api/v1/', auth);
app.use('/api/v1/', order);
app.use('/api/v1/orders', uploadInvoiceRoutes);

// Environment Variables
dotenv.config({ path: path.join(__dirname, "config/config.env") });

// Production Static Files
if (process.env.NODE_ENV === "Production") {
  app.use(express.static(path.join(__dirname, '../frontend/build/')));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  });
}

// Error Middleware
app.use(errorMiddleware);

module.exports = app;
