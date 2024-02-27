const { query } = require('express');
const Blog = require('../models/Blog')




exports.getAllBlogs = async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const blogPerPage = 2;
    
    try {
        const allBlogs = await Blog.find().countDocuments();
        const blog = await Blog.find({})
            .sort({ dateCreated: -1 })
            .skip((page - 1) * blogPerPage)
            .limit(blogPerPage);
    
        res.render('index', {
            blog: blog, // Değişken adını "blogs" olarak düzelttim
            page: page,
            current: Math.ceil(allBlogs / blogPerPage)
        });
    } catch (error) {
        console.error(error);
        // Hata işleme
        res.status(500).send("Internal Server Error");
    }
};

exports.getBlog = async (req,res) =>{
    const blog = await Blog.findById({_id:req.params.id})
    res.render('post',{
        blog
    })
}

exports.deleteBlog = async(req,res) => {
    const blog = await Blog.findByIdAndDelete({_id:req.params.id})
    res.redirect('/') 
  }






