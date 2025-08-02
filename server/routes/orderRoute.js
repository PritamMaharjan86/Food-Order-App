const router = require('express').Router();


const order = require('../models/order');

router.post('/', async (req, res) => {

    try {
        const { name, phone, item } = req.body;

        const newOrder = new order({ name, phone, item });
        await newOrder.save();
        console.log('Recieved Order:', newOrder);
        res.status(201).json({ message: 'Order recieved successfully!' });

    } catch (error) {
        console.error('Error saving order to database:', error);
        res.status(500).json({ message: 'Failed to place order' });

    }
});

module.exports = router;