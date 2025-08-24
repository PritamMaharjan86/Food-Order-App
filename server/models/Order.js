const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
    {
        items: [
            {
                id: String,
                name: String,
                price: Number,
                quantity: Number,
            }
        ],
        image: { type: String },
        status: { type: String, default: 'Pending' }
    },
    { timestamps: true }
);


module.exports = mongoose.model('order', OrderSchema);