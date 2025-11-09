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
            category: req.body.category,
            avaibility: "In Stock",
        });

        console.log('NEW PRODUCT:', newItem);

        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {

        res.status(400).json({ message: err.message })
    }
})

// to delete a menu item by productID
router.delete('/delete/:productId', async (req, res) => {
    try {
        const deletedItem = await Product.findOneAndDelete({ productId: req.params.productId });

        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.json({ message: 'Item deleted successfully', deletedItem });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


//to update the status of product
router.patch('/updateAvailability/:productId', async (req, res) => {
    try {
        const { avaibility } = req.body;

        const updatedProduct = await Product.findOneAndUpdate(
            { productId: req.params.productId },
            { avaibility },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(updatedProduct);
    } catch (err) {
        console.error('Error updating product availability:', err);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;