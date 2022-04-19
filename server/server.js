const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb = require('./config/db');

// configuring
dotenv.config({ path: './config/config.env' });

const app = express();

// connecting to db
connectDb();

// body parsers
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// middlewares
app.use(cors());
app.use(morgan('common'));
app.use(helmet());

// routers
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/user'));
app.use('/api/products', require('./routes/product'));
app.use('/api/carts', require('./routes/cart'));
app.use('/api/orders', require('./routes/order'));

const PORT = process.env.PORT || 8800;

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));