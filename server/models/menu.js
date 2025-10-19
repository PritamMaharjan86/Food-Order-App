const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,

});

module.exports = mongoose.model('Menu', MenuSchema);