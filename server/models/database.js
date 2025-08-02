const mongoose = require('mongoose');
const MongoDB = process.env.MONGO_URI;

mongoose.connect(MongoDB)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB not connected:', err));