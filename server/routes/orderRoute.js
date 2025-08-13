const router = require('express').Router();
const order = require('../models/order');

//to send order to the database from the user
router.post('/postOrder', async (req, res) => {

    try {
        const { name, phone, item, quantity } = req.body;

        const newOrder = new order({ name, phone, item, quantity });
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

//to delete the order list
router.delete('/deleteOrder/:orderId', async (req, res) => {

    const orderId = req.params.orderId;

    try {
        const deleteOrder = await order.findByIdAndDelete(orderId);
        if (!deleteOrder) {
            return res.status(404).json({ message: 'Order not found.' })
        }
        res.json({ message: 'Order deleted.' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Cannot delete the order' });

    }

});


//to update the status of delivery
router.patch('/updateStatus/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
        const updatedOrder = await order.findByIdAndUpdate(
            orderId,
            { status: status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json({ message: 'Order status updated successfully', order: updatedOrder });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: 'Failed to update order status' });
    }
});



module.exports = router;