const express = require('express');
const router = express.Router();
const Product = require('../models/product');


//to get menu items
router.get('/getProduct', async (req, res) => {

    try {
        const menu = await Product.find();
        res.json(menu);

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
});

//to post menu to database
router.post('/postProduct', async (req, res) => {

    try {
        const newItem = new Product({
            name: req.body.name,
            price: req.body.price,
            image: req.body.image,
        });

        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {

        res.status(400).json({ message: err.message })
    }
})

// to delete a menu item by name
router.delete('/:name', async (req, res) => {
    try {
        const deletedItem = await Product.findOneAndDelete({name: req.params.name});

        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.json({ message: 'Item deleted successfully', deletedItem });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



module.exports = router;