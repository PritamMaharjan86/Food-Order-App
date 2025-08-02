const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());


require('dotenv').config();
require('./models/database');


const menuRouter = require('./routes/menuRoute');
app.use('/api', menuRouter);


const orderRouter = require('./routes/orderRoute');
app.use('/api/order', orderRouter);


app.listen(PORT, () => console.log(`Server runnning on port ${PORT}`));