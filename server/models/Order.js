const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        items: [
            {
                id: String, // food id
                name: String,
                price: Number,
                quantity: Number,
            }
        ],
        status: { type: String, default: 'Pending' }
    },
    { timestamps: true }
);


module.exports = mongoose.model('order', OrderSchema);