const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables (Ensure this is at the top)
dotenv.config({ path: path.join(__dirname, "config/config.env") });

// Middleware
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(cookieParser());

// ✅ CORS Configuration (Fixing frontend/backend communication)
app.use(cors({
  origin: process.env.FRONTEND_URL || "https://smtraders.vercel.app", // Fallback URL if .env is missing
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Routes
const products = require("./routes/product");
const auth = require("./routes/auth");
const order = require("./routes/order");
const errorMiddleware = require("./middleware/error");

// Static Files for uploaded invoices
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Route Mounting
app.use("/api/v1/", products);
app.use("/api/v1/", auth);
app.use("/api/v1/order", order);
// ✅ Production Deployment for Vercel
// if (process.env.NODE_ENV === "Production") {
//   app.use(express.static(path.join(__dirname, "../frontend/build/")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
//   });
// }
// Error Middleware
app.use(errorMiddleware);

module.exports = app;
