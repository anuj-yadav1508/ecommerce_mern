const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../verification');
const cryptojs = require('crypto-js');

// update an user by user itself and admin
router.patch('/update/:userId', verifyTokenAndAuthorization, async (req, res) => {
    if( req.body.password ) {
        req.body.password = await cryptojs.AES.encrypt( req.body.password , process.env.CRYPTO_SECRET_KEY ).toString();
    }

    try {
        const updatedUser = await User.findByIdAndUpdate( req.params.userId, { $set: req.body }, { new: true });

        return res.status(200).json(updatedUser);
    } catch (err) {
        return res.status(500).json(err.message);
    }
});


// delete an user by user itself and admin 
router.delete('/delete/:userId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete( req.params.userId );

        return res.status(200).json( deletedUser );
    } catch (err) {
        return res.status(500).json(err.message);
    }
});

// get all users by admin only
router.get('/allusers', verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
        const allUsers = query ? await User.find().sort({ _id: -1 }).limit(1) : await User.find();

        return res.status(200).json(allUsers);
    } catch (err) {
        return res.status(500).json(err.message);
    }
});

// get user stats by admin only
router.get('/stats', verifyTokenAndAdmin, async (req, res) => {
    const lastYear = new Date(new Date().setFullYear(new Date().getFullYear() - 1));

    try {
        const data = await User.aggregate([
            {
                $match: {
                    createdAt: { $gte: lastYear }
                }
            },
            {
                $project: {
                    month: {
                        $month: "$createdAt"
                    }
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum : 1 }
                }
            }
        ]);

        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json(err.message);
    }
});

module.exports = router;