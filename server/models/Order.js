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
        orderId: {
            type: String,
            unique: true,

        },
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

OrderSchema.pre("save", async function (next) {
    if (!this.orderId) {
        try {
            const datePart = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 8);
            const randomPart = Math.floor(100 + Math.random() * 900);
            this.orderId = `ORD-${datePart}-${randomPart}`;
            next();
        } catch (err) {
            next(err);
        }
    } else {
        next();
    }
});


module.exports = mongoose.model('order', OrderSchema);