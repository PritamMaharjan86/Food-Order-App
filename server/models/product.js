const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({

    productId: {
        type: String,
        unique: true, // ensures no duplicates in MongoDB
    },
    name: String,
    price: Number,
    image: String,

});


// Auto-generate productId before saving
ProductSchema.pre('save', function (next) {
    if (!this.productId) {
        try {
            const datePart = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 8);
            const randomPart = Math.floor(100 + Math.random() * 900);
            this.productId = `PRD-${datePart}-${randomPart}`;
            next();
        } catch (err) {
            next(err);
        }
    } else {
        next();
    }
});

module.exports = mongoose.model('Product', ProductSchema);