const router = require('express').Router();
const order = require('../models/order');

//to send order to the database from the user
router.post('/postOrder', async (req, res) => {

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

//to get the list of order from database
router.get('/getOrder', async (req, res) => {

    try {
        const orders = await order.find().sort({ createdAt: -1 }); //-1 is for latest at the first
        res.json(orders);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching orders' });
    }
});



module.exports = router;