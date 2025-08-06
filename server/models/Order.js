const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true,
    },

    phone:
    {
        type: String,
        required: true,

    },

    item:
    {
        type: [String],
        required: true,

    },

    createdAt:
    {
        type: Date,
        default: Date.now,

    },

    status:
    {
        type: String,
        default: "Pending",
    },

    quantity:
    {
        type: Number,

    },


});


module.exports = mongoose.model('order', OrderSchema);