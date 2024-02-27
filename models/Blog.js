const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect("mongodb://127.0.0.1:27017/clean-blog-db")

const BlogSchema = new Schema( {
    title:String,
    detail:String,
    image:Buffer,
    likeCount:{
        type:Number,
        default:0
    },
    dateCreated:{
        type:Date,
        default:Date.now
    },
    edited:{
        type:Boolean,
        default:false
    }
})

const Blog = mongoose.model('Blog',BlogSchema)




module.exports = Blog