// Incorporate modules
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

const blogTitle = "Welcome to our Blog!"
const blogContent = 'Click the "Add Post" button to start posting to our blog with others!'
const aboutContent1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet tellus cras adipiscing enim eu. Venenatis cras sed felis eget velit aliquet sagittis id. Amet mauris commodo quis imperdiet massa tincidunt. Nulla posuere sollicitudin aliquam ultrices sagittis. In dictum non consectetur a erat nam at lectus urna. Elit pellentesque habitant morbi tristique. Diam sollicitudin tempor id eu nisl nunc mi."
const aboutContent2 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id."
const contactStartingContent = "Lacus vel facilisis volutpat est velit egestas";

// Initiate app
const app = express();

// Use EJS
app.set("view engine", "ejs");
// Use body-parser
app.use(bodyParser.urlencoded({extended: true}));
// Serve static files
app.use(express.static("public"));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/blogDB", {
  // Fix the URL string parser deprecation warning
useNewUrlParser: true,
  // Fix the Server Disocvery and Monitoring Engine Deprecation warning
useUnifiedTopology: true
});

// Create a schema
const blogSchema = mongoose.Schema({
  title: String,
  content: String
});

// Create a model
const Blog = mongoose.model("Blog", blogSchema);

// -----------------------------------------------------------------------------

// GET handler for the home page
app.get("/", function(req, res) {
  // Render the home page
  res.render("index");
});


// GET handler for the blog page
app.get("/blog", function(req, res) {
  // Find all of the documents in the blogDB collection
  Blog.find({}, function(err, foundPosts){
    // If an error occurs
    if(err){
      // Print the error message to the console
      console.log(err);
    }else{
      // Render all of the documents in the collection on the blog page
      res.render("blog", {
        blogTitle: blogTitle,
        blogContent: blogContent,
        posts: foundPosts
      });
    }
  });
});


// GET handler for the compose page
app.get("/compose", function(req, res) {
  // Render the compose page
  res.render("compose")
});


// POST handler for the compose page
app.post("/compose", function(req, res)  {
  // Grab the text in the "Title" field
  let postTitle = req.body.postTitle;
  // Grab the text in the "Post" field
  let postBody = req.body.postBody;

  // Create a new document
  let blogPost = new Blog({
    title: postTitle,
    content: postBody
  });

  // Save the document to the database
  blogPost.save()
  // Redirect to the blog page
  res.redirect("/blog");

});


// GET handler for the dynamic route
app.get("/posts/:postId", function(req, res) {
  // Grab the document's _id
  let postId = req.params.postId;
  // Find a document by its _id
  Blog.findOne({_id: postId}, function(err, foundId){
      // Render the full post on a separate page
      res.render("post", {
        title: foundId.title,
        content: foundId.content
      });
  });

});


// GET handler for the about page
app.get("/about", function(req, res) {
  // Render the about page
  res.render("about", {aboutContent1: aboutContent1, aboutContent2: aboutContent2 });
});

// GET handler for the contact page
app.get("/contact", function(req, res) {
  // Render the contact page
  res.render("contact", {content: contactStartingContent});
});








// Start the server on localhost:3000
app.listen(3000, function(){
  console.log("Server successfully running on port 3000")
})
