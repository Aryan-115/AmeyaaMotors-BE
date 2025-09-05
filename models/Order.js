const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    address : {
        type: String,
        required: true,
    },
    razorpayOrderId: {
        type: String,
        required: true,
    },
    products: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
            color: {
                type: String,
                required: true,
            }

        }
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: String,
        enum: ['pending', 'delivered'],
        default: 'pending',
    },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;