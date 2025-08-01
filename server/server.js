const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB not connected:', err));

app.use(cors());
app.use(express.json());

app.get('/api/menu', (req, res) => {
    res.json([
        { id: 1, name: 'Burger', price: 8.99 },
        { id: 2, name: 'Pizza', price: 12.99 },
        { id: 3, name: 'Fries', price: 6.99 },
        { id: 4, name: 'Noodles', price: 16.49 },
        { id: 5, name: 'Momo', price: 26.19 },
        { id: 6, name: 'Fried Rice', price: 12.39 },
    ]);
})

const order = require('./models/Order');

app.post('/api/order', async (req, res) => {

    try {
        const { name, phone, item } = req.body;

        const newOrder = new order({ name, phone, item });
        await newOrder.save();
        console.log('Recieved Order:', newOrder);
        res.status(201).json({ message: 'Order recieved successfully!' });

    } catch {
        console.error('Error saving order to database:', error);
        res.status(500).json({ message: 'Failed to place order' });

    }
});

app.listen(PORT, () => console.log(`Server runnning on port ${PORT}`));