const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    items: [
        {
            userId: {
                type: String,
            },
            productId: {
                type: String,
            },
            productImageUrl: { type: String },
            productTitle: { type: String },
            productDescription: { type: String },
            productColor: { type: String },
            productPrice: { type: String },
            productQuantity: { type: Number, default: 1 },
            
        }
    ],
},
    { timestamps: true }
);


module.exports = mongoose.model('Cart', CartSchema);