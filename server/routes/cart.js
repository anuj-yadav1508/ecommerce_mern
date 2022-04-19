const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const { verifyTokenAndAdmin, verifyToken, verifyTokenAndAuthorization } = require('../verification');

// create a cart 
router.post('/createcart', verifyToken, async (req, res) => {
    try {
        const foundCart = await Cart.findOne({ userId: req.body.userId });
        
        if( foundCart ) {
            const updatedCart = await Cart.findOneAndUpdate({ userId: req.body.userId }, { $push: req.body }, { new: true} );

            return res.status(200).json(updatedCart);
        } else {
            const newCart = new Cart(req.body);

            const savedCart = await newCart.save();

            return res.status(200).json(savedCart); 
        }
    } catch (err) {
        return res.status(500).json(err.message);
    }
});


// update a cart 
// router.patch('/updatecart/:cartId', verifyTokenAndAuthorization, async (req, res) => {
//     try {
//         const updatedCart = await Cart.findByIdAndUpdate( req.params.cartId, { $set: req.body }, { new: true });

//         return res.status(200).json(updatedCart);
//     } catch (err) {
//         return res.status(500).json(err.message);
//     }
// });

// update a cart
router.patch('/updatecart/:userId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const userCart = await Cart.updateOne({ userId: req.params.userId }, {
            "$set": {
                "items.$[elemX].productQuantity": 2
            }
        },
        {
                "arrayFilters": {
                    "elemX.productId": req.body.itemId
                }
            }
        );
        
        console.log(userCart);
    } catch (err) {
        return res.status(500).json(err.message);
    }
});


// delete a cart 
router.delete('/deletecart/:cartId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const deletedCart = await Cart.findByIdAndDelete( req.params.cartId );

        return res.status(200).json(deletedCart);
    } catch (err) {
        return res.status(500).json(err.message);
    }
});


// get all carts
router.get('/allcarts', verifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await Cart.find();

        return res.status(200).json(carts);
    } catch (err) {
        return res.status(500).json(err.message);
    }
});


// get carts of an user 
router.get('/carts/:userId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const carts = await Cart.findOne({ userId: req.params.userId });

        return res.status(200).json(carts);
    } catch (err) {
        return res.status(500).json(err.message);
    }
});


module.exports = router;