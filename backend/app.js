const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, "config/config.env") });
// Middleware
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: [process.env.FRONTEND_URL], // ✅ Your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// ✅ Manually add CORS headers to all responses
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://smtraders.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Routes
const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');
const errorMiddleware = require('./middleware/error');

// Static Files for uploaded invoices
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route Mounting
app.use('/api/v1/', products);
app.use('/api/v1/', auth);
app.use('/api/v1/', order);

// Environment Variables
dotenv.config({ path: path.join(__dirname, "config/config.env") });

// Production Static Files (Frontend)
if (process.env.NODE_ENV === "Production") {
  app.use(express.static(path.join(__dirname, '../frontend/build/')));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  });
}

// Error Middleware
app.use(errorMiddleware);

module.exports = app;

