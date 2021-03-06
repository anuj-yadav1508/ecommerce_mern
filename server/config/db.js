const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env '});

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`Mongo connected: ${conn.connection.host}`);
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
};

module.exports = connectDb;