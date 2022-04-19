const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { verifyTokenAndAdmin, verifyToken, verifyTokenAndAuthorization } = require('../verification');

// create a order 
router.post('/createorder', verifyToken, async (req, res) => {
    try {
        const newOrder = new Order(req.body);

        const savedOrder = await newOrder.save();

        return res.status(200).json(savedOrder);
    } catch (err) {
        return res.status(500).json(err.message);
    }
});


// update a order 
router.patch('/updateorder/:orderId', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate( req.params.orderId, { $set: req.body }, { new: true });

        return res.status(200).json(updatedOrder);
    } catch (err) {
        return res.status(500).json(err.message);
    }
});


// delete a order 
router.delete('/deleteorder/:orderId', verifyTokenAndAdmin, async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete( req.params.orderId );

        return res.status(200).json(deletedOrder);
    } catch (err) {
        return res.status(500).json(err.message);
    }
});


// get an user orders
router.get('/getorders/:userId', verifyToken, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId });

        return res.status(200).json(orders);
    } catch (err) {
        return res.status(500).json(err.message);
    }
});


// get all orders
router.get('/allorders', verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find();

        return res.status(200).json(orders);
    } catch (err) {
        return res.status(500).json(err.message);
    }
});


// get monthly income
router.get('/monthlyincome', verifyTokenAndAdmin, async (req, res) => {
    try {
        const lastMonth = new Date( new Date().setMonth( new Date().getMonth() - 1 ));
        const previousMonth = new Date( new Date().setMonth( lastMonth.getMonth() - 1 ));

        const data = await Order.aggregate([
            {
                $match: { createdAt: { $gte: previousMonth }}
            },
            {
                $project: { 
                    month: { $month: "$createdAt" },
                    sales: "$amount"
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales"}
                }
            }
        ]);

        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json(err.message);
    }
});


module.exports = router;