// This will handle all create, read, update and delete queries on database.

const blogdb = require('../models/model');
const axios = require('axios');
const { all } = require('express/lib/application');

// create and save new blog using create function.
exports.create = (req, res) =>{

    // Check if the request is valid.
    if(!req.body)
    {
        res.status(400).send({ message: "Some details are missing!!!" });
        return;
    }

    // create new blog
    const blog = new blogdb({
        title: req.body.title,
        DateCreated: new Date(),
        description: req.body.description,
        full_blog: req.body.full_blog
    })

    //save the blog in database.
    blog
        .save(blog)
        .then(data => {
            // res.send(data)

            res.redirect(`/blogs/${blog.id}`);

        })
        .catch(err =>{
            res.status(500).send({
                message: err.message || "Oops some error occured while saving the blog!!!"
            });
        });
}

// Update a new identified blog by blog id.
exports.update = (req, res) => {

    if(!req.body)
    {
        return res
            .status(400)
            .send({message: "Data to update cannot be empty!!!"})
    }

    const id = req.params.id;

    blogdb.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify: false})
        .then(data=>{
            if(!data)
            {
                res.status(404).send({message: `Cannot update blog with id ${id}`})
            }
            else    
            {
                res.redirect(`/blogs/${id}`);
            }
        })
        .catch(err=>{
            res.status(500).send({message: err})
        })


}
