const mongoose = require('mongoose');

// Create Asynchronous function
const connectDB = async () => {
    try{
        // mongodb connection string
        const con = await mongoose.connect("mongodb+srv://admin:admin@cluster0.vxlrz.mongodb.net/blogs?retryWrites=true&w=majority") 

        console.log(`MongoDB connected: ${con.connection.host}`);

    }
    catch (err)
    {
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDB;