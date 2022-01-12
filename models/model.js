const mongoose = require('mongoose');

// Create mongodb schema/model
var schema = new mongoose.Schema({
    title:{
        type: String, 
        required: true
    }, 
    DateCreated:{
        type: Date, 
        default: Date.now,
        required: true
    }, 
    description:{
        type: String, 
        required: true
    }, 
    full_blog:{
        type: String, 
        required: true
    }
});

const blogdb = mongoose.model('blogdb', schema);

module.exports = blogdb;
