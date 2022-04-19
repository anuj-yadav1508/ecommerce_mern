const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    productTitle: {
        type: String,
    },
    productImageUrl: {
        type: String,
    },
    productDescription: {
        type: String,
    },
    productPrice: {
        type: Number,
    },
    productColor: {
        type: String,
    },
    productCategory: {
        type: String,
    },
    soldBy: {
        type: String,
    },
},
    { timestamps: true }
);


module.exports = mongoose.model('Product', ProductSchema);