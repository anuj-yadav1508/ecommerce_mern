const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { verifyTokenAndAdmin, verifyToken } = require('../verification');

// create a product 
router.post('/createproduct', verifyTokenAndAdmin, async (req, res) => {
    try {
        const newProduct = new Product(req.body);

        const savedProduct = await newProduct.save();

        return res.status(200).json(savedProduct);
    } catch (err) {
        return res.status(500).json(err.message);
    }
});


// update a product 
router.patch('/updateproduct/:productId', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate( req.params.productId, { $set: req.body }, { new: true });

        return res.status(200).json(updatedProduct);
    } catch (err) {
        return res.status(500).json(err.message);
    }
});


// create a product 
router.delete('/deleteproduct/:productId', verifyTokenAndAdmin, async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete( req.params.productId );

        return res.status(200).json(deletedProduct);
    } catch (err) {
        return res.status(500).json(err.message);
    }
});


// get all products 
router.get('/allproducts', async (req, res) => {
    const { category, latest } = req.query;
    try {
        let products = await Product.find();

        if(category) {
            products = await Product.find({ productCategory: category });
        };
        if (latest) {
            products = await Product.find().sort({ createdAt: -1 }).limit(1);
        };
        if(category && latest) {
            produts = await Product.find({ productCategory: category }).sort({ createdAt: -1 }).limit(1);
        }
        
        return res.status(200).json(products);
    } catch (err) {
        return res.status(500).json(err.message);
    }
});


module.exports = router;