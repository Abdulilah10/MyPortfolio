
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB Atlas
async function connectToMongoDB() {
    try {
        await mongoose.connect(process.env.ATLASDB);

        console.log("You successfully connected to MongoDB!");

        return mongoose;

    } catch (err) {
        console.error("MongoDB connection failed:", err);
        throw err;
    }
}

// Disconnect from MongoDB
async function disconnectFromMongoDB() {
    await mongoose.connection.close();
}

module.exports = {
    connectToMongoDB,
    disconnectFromMongoDB
};
