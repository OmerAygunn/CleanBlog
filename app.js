const express = require('express');
const ejs = require('ejs')
const blogControllers = require('./controllers/blogControllers')
const pageControllers = require('./controllers/pageControllers');
var methodOverride = require('method-override')
const Blog = require('./models/Blog');


const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride('_method'))


app.get('/',blogControllers.getAllBlogs );
app.post('/blogs',blogControllers.preapreingBlogs)
app.get('/blogs/:id',blogControllers.getBlog)

app.get('/about',pageControllers.getAboutPage)
app.get('/add',pageControllers.getAddPage)


app.get('/blogs/edit/:id',async (req,res) =>{
  const blog = await Blog.findOne({_id:req.params.id})
  res.render('edit',{
    blog
  })
})

app.put('/blogs/:id',async(req,res) => {
  const blog = await Blog.findOne({_id:req.params.id})
  blog.title = req.body.title
  blog.detail = req.body.detail
  blog.save()
  res.redirect(`/blogs/${req.params.id}`)
})

app.delete('/blogs/:id',async(req,res) => {
  const blog = await Blog.findByIdAndDelete({_id:req.params.id})
  res.redirect('/')
})








const port = 3000;
app.listen(port, () => {
  console.log(`Our Port is ${port}`);
});
