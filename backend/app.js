const express = require('express');
const app = express();
const cookieParser = require("cookie-parser")
app.use(express.json());
app.use(cookieParser());
const errormiddleware = require('./middleware/error')
const products = require('./routes/product')
const auth = require('./routes/auth');
const order = require('./routes/order')
const path = require('path')
const cors = require('cors');
app.use('/uploads', express.static(path.join(__dirname,'uploads') ) )

app.use(cors({
  origin: 'http://localhost:8000',  // Allow your React app to communicate with the backend
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ['Content-Type', 'Authorization'] 
}));
const uploadInvoiceRoutes = require('./routes/order');

app.use('/uploads', express.static(path.join(__dirname,'uploads') ) )
app.use(uploadInvoiceRoutes);
app.use('/api/v1/',products);
app.use('/api/v1/',auth);
app.use('/api/v1/',order);
const dotenv = require('dotenv');
dotenv.config({path:path.join(__dirname,"config/config.env")});

if(process.env.NODE_ENV === "Production") {
    app.use(express.static(path.join(__dirname, '../frontend/build/')));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
      });
}

app.use(errormiddleware)

module.exports = app;