const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config({ path: path.join(__dirname, "config/config.env") });

// Middleware
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(cookieParser());

// ✅ Fixing CORS issues
app.use(cors({
  origin: "https://smtraders.vercel.app", // Allow frontend origin
  credentials: true,  // Allow cookies
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
// ✅ Handle preflight requests properly
app.options("*", cors());

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
app.use("/api/v1/", order);
app.get("/", (req, res) => {
  res.json({ message: "API is running successfully!" });
});
// Error Middleware
app.use(errorMiddleware);

module.exports = app;
