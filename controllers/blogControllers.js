const Blog = require('../models/Blog')

exports.preapreingBlogs = async (req,res)=>{
   await Blog.create(req.body)
    res.redirect('/')
}

exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({}); // Asenkron bir şekilde blogları bul

        res.render('index', {
            blog: blogs // Bulunan blogları şablona aktar
        });
    } catch (error) {
        console.error('Bloglar alınırken bir hata oluştu:', error);
        res.status(500).send('Bloglar alınırken bir hata oluştu');
    }
};
