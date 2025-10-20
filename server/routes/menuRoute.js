const express = require('express');
const router = express.Router();
const Menu = require('../models/menu');


//to get menu items
router.get('/', async (req, res) => {

    try {
        const menu = await Menu.find();
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
        const newItem = new Menu({
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


module.exports = router;