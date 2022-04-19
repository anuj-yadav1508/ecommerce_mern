const express = require('express');
const router = express.Router();
const User = require('../models/User');
const cryptojs = require('crypto-js');
const jwt = require('jsonwebtoken');

// register
router.post('/register', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if( !user ) {
            const newUser = new User({
                name: req.body.name,
                userName: req.body.userName,
                email: req.body.email,
                userProfilePicture: req.body.profilePicture,
                password: cryptojs.AES.encrypt( req.body.password, process.env.CRYPTO_SECRET_KEY )
            });

            const savedUser = await newUser.save();

            const { password, ...others } = savedUser._doc;

            return res.status(200).json({ ...others });
        } else {
            return res.status(402).json('Email already registered!');
        }
    } catch (err) {
        return res.status(500).json(err.message);
    }
});

// login an user
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if( user ) {
            const decryptedPassword = await cryptojs.AES.decrypt( user.password, process.env.CRYPTO_SECRET_KEY );

            const password = decryptedPassword.toString(cryptojs.enc.Utf8);
            
            if( password === req.body.password ) {
                 await jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET_KEY, (err, token) => {
                    if (err) return res.status(403).json(err.message);
                    const { password, ...others } = user._doc;
                    return res.status(200).json({ accessToken: token, ...others });
                });
            } else {
                return res.status(401).json('Incorrect password!');
            }
            
        } else {
            return res.status(400).json('Email not found, Try Another!');
        }
    } catch (err) {
        return res.status(500).json(err.message);
    }
});

module.exports = router;