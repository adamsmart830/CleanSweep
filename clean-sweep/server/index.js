import mongoose from 'mongoose';
import Blog from './model/Blog';
mongoose.connect("mongodb+srv://chenw22:yRnediVRq6qiAqfC@cluster0.eyhty.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

// Create a new blog post object
const article = new Blog({
  title: 'Awesome Post!',
  slug: 'awesome-post',
  published: true,
  content: 'This is the best post ever',
  tags: ['featured', 'announcement'],
});

// Find a single blog post
const firstArticle = await Blog.findOne({});
console.log(firstArticle);

// Insert the article in our MongoDB database
await article.save();