const express = require('express');
const ejs = require('ejs')
const blogControllers = require('./controllers/blogControllers')
const pageControllers = require('./controllers/pageControllers');
var methodOverride = require('method-override')
const Blog = require('./models/Blog');


const multer = require('multer');



const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride('_method',{methods:['GET','POST']}))


app.get('/',blogControllers.getAllBlogs );







const upload = multer(); // Dosya yükleme yapmayacak, yalnızca veriyi alacak

// Formdan gelen resmi yükleme endpoint'i
app.post('/blogs', upload.single('image'), async (req, res,) => {
    try {
        // Formdan gelen verileri kullanarak blog oluştur
        const blog = await Blog.create({
            title: req.body.title,
            detail: req.body.detail,
            image: req.file.buffer // Resmin veri tamponu (buffer)
        });
        await blog.save(); // MongoDB'ye kaydet
        res.redirect(`/blogs/${blog._id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Bir hata oluştu');
    }
    
});


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
  blog.edited = true
  res.redirect(`/blogs/${req.params.id}`)
})

app.delete('/blogs/:id',async(req,res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

// app.get('/blogs/like/:id',async(req,res) => {
//   const blog = await Blog.findOne({_id:req.params.id})
//   blog.likeCount = blog.likeCount + 1
//   blog.save()
//   res.redirect(`/blogs/${req.params.id}`)
// })


app.get('/blogs/like/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    blog.likeCount += 1;
    await blog.save();
    res.json({ like: blog.likeCount });
  } catch (error) {
    console.error('Error adding like:', error);
    res.status(500).json({ error: 'An error occurred while adding like.' });
  }
});







const port = 3000;
app.listen(port, () => {
  console.log(`Our Port is ${port}`);
});
