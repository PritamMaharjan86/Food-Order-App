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
            customerId: { type: String, unique: true },
            name: { type: String, required: true },
            phone: { type: String, required: true },
            address: { type: String, required: true }
        },
        image: { type: String },
        status: { type: String, default: 'Pending' }
    },
    { timestamps: true }
);

// Pre-save middleware to generate orderId & customerId
OrderSchema.pre("save", async function (next) {
    try {
        // Generate orderId if not exists
        if (!this.orderId) {
            const datePart = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 8);
            const randomPart = Math.floor(100 + Math.random() * 900);
            this.orderId = `ORD-${datePart}-${randomPart}`;
        }

        // Generate customerId if not exists
        if (!this.customer.customerId) {
            const datePart = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 8);
            const randomPart = Math.floor(1000 + Math.random() * 9000); // 4-digit random
            this.customer.customerId = `CUST-${datePart}-${randomPart}`;
        }

        next();
    } catch (err) {
        next(err);
    }
});







module.exports = mongoose.model('Order', OrderSchema);