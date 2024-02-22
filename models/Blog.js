const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect("mongodb://127.0.0.1:27017/clean-blog-db")

const BlogSchema = new Schema( {
    title:String,
    detail:String,
    dateCreated:{
        type:Date,
        default:Date.now
    }
})

const Blog = mongoose.model('Blog',BlogSchema)




module.exports = Blog