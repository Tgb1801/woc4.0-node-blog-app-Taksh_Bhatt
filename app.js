// To run the server go to terminal type nodemon app.js

const express = require('express');
const dotenv = require('dotenv');
const { render } = require('express/lib/response');
const controller = require('./controller/controller');
const bodyParser = require('body-parser');
const axios = require('axios');
const blogdb = require('./models/model');
const methodOverride = require('method-override');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

const connectDB = require('./views/blogs/connection');

const app = express();

// mongodb connection
connectDB();

// This allows us to override the default method with the method given by '_method'
app.use(methodOverride('_method'));

// Register view engine
app.set('view engine', 'ejs');

// GET request for home page
app.get('/', async (req, res) =>{

    const blogs = await blogdb.find().sort({DateCreated: 'desc'});
    res.render('./blogs/home', {blogs: blogs});

});


// GET request for create blog page
app.get('/blogs/create', (req, res) => {

    res.render('./blogs/create');

});

// POST request for created blog.
app.post('/', urlencodedParser,controller.create);


// GET request to view a single blog
app.get('/blogs/:id', async (req, res) =>{
    const blog = await blogdb.findById(req.params.id);
    if(blog==null)
        res.redirect('/');
    res.render('blogs/show', {blog: blog});
});


// DELETE request to delete a blog
app.delete('/:id', async (req, res) =>{
    await blogdb.findByIdAndDelete(req.params.id);
    res.redirect('/');
});


// GET request to edit a blog.
app.get('/blogs/edit/:id', async (req, res) =>{

    const blog = await  blogdb.findById(req.params.id);

    res.render('blogs/edit', {blog: blog});
});


// PUT request to edit a blog.
app.put('/blogs/:id',  urlencodedParser, controller.update);

// Assign the value of port using the environment variable PORT
// We can set the value of PORT environment variable in cmd using set PORT=5000.

const port = process.env.PORT || 3000; // If PORT is set in environment variable we will use it, otherwise we will use port 3000.

app.listen(3000, () => console.log(`Listening on port ${port}...`));
