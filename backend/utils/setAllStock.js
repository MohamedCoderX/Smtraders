// One-off maintenance script: set every product's stock to 500.
// Usage: node backend/utils/setAllStock.js
const path = require("path");
const Product = require("../models/productmodel");
const dotenv = require("dotenv");
const connectDatabase = require("../config/database");

dotenv.config({ path: path.join(__dirname, "../config/config.env") });
connectDatabase();

const run = async () => {
  try {
    const result = await Product.updateMany({}, { $set: { stock: 500 } });
    console.log(`Updated ${result.modifiedCount ?? result.nModified} of ${result.matchedCount ?? result.n} products to stock = 500`);
  } catch (error) {
    console.log(error.message);
  }
  process.exit();
};

run();
