const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect(
  'mongodb+srv://Omer:oPaDyF5KtwkR4SE4@cluster0.nlzkmhr.mongodb.net/?retryWrites=true&w=majority'
);

const BlogSchema = new Schema({
  title: String,
  detail: String,
  image: Buffer,
  likeCount: {
    type: Number,
    default: 0,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  edited: {
    type: Boolean,
    default: false,
  },
});

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;
