const express = require('express');
const ejs = require('ejs')
const blogControllers = require('./controllers/blogControllers')
const pageControllers = require('./controllers/pageControllers');
const Blog = require('./models/Blog');


const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.get('/',blogControllers.getAllBlogs );

app.get('/about',pageControllers.getAboutPage)
app.get('/add',pageControllers.getAddPage)

app.post('/blogs',blogControllers.preapreingBlogs)



const port = 3000;
app.listen(port, () => {
  console.log(`Our Port is ${port}`);
});
