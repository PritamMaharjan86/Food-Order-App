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
            const count = await mongoose.model("order").countDocuments();
            this.orderId = `ORD-${String(count + 1).padStart(5, "0")}`;
            next();
        } catch (err) {
            next(err);
        }
    } else {
        next();
    }
});


module.exports = mongoose.model('order', OrderSchema);