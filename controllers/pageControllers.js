

exports.getAboutPage = (req,res)=>{
    res.render('about')
}

exports.getAddPage = (req,res)=>{
    res.render('add')
}

exports.getEditBlog = async (req,res) =>{
    const blog = await Blog.findOne({_id:req.params.id})
    res.render('edit',{
      blog
    })
  }
