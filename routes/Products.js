// Product.js

const express = require("express");
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const ProductsModel = require('../models/Products');
const cloudinary = require('../utils/Cloudinary'); // Assuming the correct path

const router = express.Router();

// Cloudinary Storage Configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'tqb_images',
    allowed_formats: ['jpg', 'png'],
  },
});
const upload = multer({ storage: storage });

// Route for adding products with image upload
router.post("/admin/add-products", upload.single('image'), async (req, res) => {
  try {
    console.log('Incoming request data:', req.body);

    

    const imageName = req.file ? req.file.path : 'new.jpeg';
    const { category, productName, price, weight, flavour , type } = req.body;
    const image = imageName;
    const newProduct = new ProductsModel({ image, category, productName, price, weight, flavour , type });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get("/products", async (req, res) => {
    try {
      const products = await ProductsModel.find();
      res.status(200).json(products);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server error' });
    }
  });

  router.get("/product/:id" , async(req , res)=>{
    try {
      const productId = req.params.id;
      const product  = await ProductsModel.findById(productId);
      if(!product)
        {
          return res.status(404).json({error: "Product Not Found "});

        }
        res.status(200).json(product);

      
    } catch (error) {
      res.status(500).json({error:error.message});
    }
  })

  router.delete("/product/:id", async (req,res)=>{
try {
  const productId = req.params.id;
  const deleteProduct = await ProductsModel.findByIdAndDelete(productId);
  if(!deleteProduct)
    {
      return res.status(404).json({error :'Product not Found'});
    }
    res.status(200).json({message:'product Deleted Successfully',deleteProduct});
} catch (error) {
    res.status(500).json({error:error.message})
} });


router.put("/product/:id", upload.single('image'), async(req,res)=>{
  try {
    const productId = req.params.id;
    const updateData = {
      category: req.body.category,
      productName: req.body.productName,
      price: req.body.price,
      weight: req.body.weight,
      flavour: req.body.flavour,
      type: req.body.type
    };

     // Check if a new image is uploaded
     if (req.file) {
      updateData.image = req.file.path; // Update image path if a new image is uploaded
    }


     const existingProduct = await ProductsModel.findById(productId);
     console.log(existingProduct);
     if(!existingProduct)
      {
         return res.status(404).json({error:"Product Not Found"});

      }
    
      const updatedProduct = await ProductsModel.findByIdAndUpdate(productId , updateData,{new:true});
      console.log("upadted Product : ", updatedProduct);
       res.status(200).json({message: 'Product Updated Successfully', updatedProduct});


    
  } catch (error) {
    console.log("500 error ");
    res.status(500).json({error:error.message});
    
  }
})

module.exports = router;
