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
        customer: {
            name: { type: String, required: true },
            phone: { type: String, required: true },
            address: { type: String, required: true }
        },
        image: { type: String },
        status: { type: String, default: 'Pending' }
    },
    { timestamps: true }
);


module.exports = mongoose.model('order', OrderSchema);