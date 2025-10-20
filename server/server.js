const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors());

app.use(express.json());


require('dotenv').config();
require('./models/database');


const productRouter = require('./routes/productRoute');
app.use('/api/product', productRouter);


const orderRouter = require('./routes/orderRoute');
app.use('/api/order', orderRouter);

const adminRouter = require('./routes/adminRoute'); //import admin route
app.use('/api/admin', adminRouter);


app.listen(PORT, () => console.log(`Server runnning on port ${PORT}`));