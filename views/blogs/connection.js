const mongoose = require('mongoose');

// Create Asynchronous function
const connectDB = async () => {
    try{
        // mongodb connection string
        const con = await mongoose.connect("<Mongodb_connection_string>") 

        console.log(`MongoDB connected: ${con.connection.host}`);

    }
    catch (err)
    {
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDB;
