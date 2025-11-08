const product = require('../models/productmodel');
const ErrorHanlder = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const APIFeatures = require('../utils/apiFeatures');
const cloudinary = require('../config/cloudinary');

//get products - {{base_url}}/api/v1/products
exports.getProducts =catchAsyncError(async(req,res,next)=>{

    const resPerPage = 12;
    let buildQuery = () => {
        return new APIFeatures(product.find(), req.query).search().filter()
    }
    const filteredProductsCount = await buildQuery().query.countDocuments({})
    const totalProductsCount = await product.countDocuments({});
    // const apifeatures = new APIFeatures(product.find(),req.query).search().filter().paginate(resPerPage);


//    const products =  await apifeatures.query;
   
let productsCount = totalProductsCount;
if(filteredProductsCount!==totalProductsCount){
    productsCount = filteredProductsCount
}
//    await new Promise(resolve=> setTimeout(resolve,3000))
// return next(new ErrorHanlder('unable to send products',400)
// )
 const products = await buildQuery().paginate(resPerPage).query;
res.status(200).json({
    sucess:true,
    count:productsCount,
    resPerPage,
    products
})
})

//Create product - api/v1/products/new
exports.newProduct = catchAsyncError(async (req, res, next) => {
    try {
        console.log("Received files:", req.files);

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: "No images uploaded" });
        }

        let images = [];

        for (let file of req.files) {
            if (!file?.path) {
                return res.status(500).json({ success: false, message: "File upload failed" });
            }
            images.push({ image: file.path }); // Cloudinary secure_url is in file.path
        }

        req.body.images = images;
        req.body.user = req.user.id;

        const createdProduct = await product.create(req.body);

        res.status(201).json({
            success: true,
            product: createdProduct,
        });
    } catch (error) {
        console.error("Product creation error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});





//get single product -{{base_url}}/api/v1/product/:id
exports.getSingleProduct = catchAsyncError(async(req,res,next) => {
   const Product = await product.findById(req.params.id);

if(!Product){
return next(new ErrorHanlder('product not found',400))
}

res.status(201).json({
    sucess:true,
    Product
})
})


//update product - {{base_url}}/api/v1/product/:id


exports.updateProduct = catchAsyncError(async (req, res, next) => {
  try {
    let Product = await product.findById(req.params.id);
    if (!Product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // ✅ If a new image is uploaded (via multer → req.files)
    if (req.files && req.files.length > 0) {
      // Delete old image from Cloudinary
      const oldImageUrl = Product.images[0]?.image;
      if (oldImageUrl) {
        const oldPublicId = oldImageUrl.split("/").pop().split(".")[0]; // Extract public_id from URL
        await cloudinary.uploader.destroy(`products/${oldPublicId}`);
      }

      // Upload new image to Cloudinary
      const file = req.files[0];
      const result = await cloudinary.v2.uploader.upload(file.path, {
        folder: "products",
      });

      // Replace image field
      req.body.images = [
        {
          image: result.secure_url,
        },
      ];
    } else {
      // Keep old image if not updating
      req.body.images = Product.images;
    }

    // ✅ Update other product fields
    Product = await product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      Product,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//delete product 
// exports.deleteProduct = async (req,res,next)=>{
//     const Product = await product.findById(req.params.id);
// if(!Product){
//  return res.status(404).json({
//     success:false,
//     message:"product not found"
//  });
// }
//   await Product.findByIdAndDelete(Product)

// res.status(200).json({
//     sucess:true,
//     message:"succesfully deleted"
// })
// }

exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;  // Assuming you're getting the product ID from the request parameters
        const deletedProduct = await product.findByIdAndDelete(productId);
        
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};


// get admin products  - api/v1/admin/products
exports.getAdminProducts = catchAsyncError(async (req, res, next) =>{
    const products = await product.find();
    res.status(200).send({
        success: true,
        products
    })
});