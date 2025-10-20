const express = require('express');
const router = express.Router();
const Product = require('../models/product');


//to get menu items
router.get('/', async (req, res) => {

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
router.post('/', async (req, res) => {

    try {
        const newItem = new Product({
            id: req.body.id,
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

// to delete a menu item by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedItem = await Product.findByIdAndDelete(req.params.id);

        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.json({ message: 'Item deleted successfully', deletedItem });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



module.exports = router;