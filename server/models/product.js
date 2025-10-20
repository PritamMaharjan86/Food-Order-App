const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    id: Number,
    name: String,
    price: Number,
    image: String,

});

module.exports = mongoose.model('Product', ProductSchema);