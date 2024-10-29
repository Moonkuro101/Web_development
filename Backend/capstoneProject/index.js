import express from "express";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid"; // Import UUID

const app = express();
const port = 3000;

let posts = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/create", (req, res) => {
  res.render("create.ejs");
});

app.post("/create-post", (req, res) => {
  const { title, content } = req.body;
  
  // Create a new post with a unique ID
  const newPost = {
    id: uuidv4(), // Generate a unique ID
    title,
    content,
  };
  
  posts.push(newPost); // Push the new post to the posts array
  console.log(posts);
  
  res.render("success.ejs"); // Render success page directly
});

app.get("/posts", (req, res) => {
  res.render("post.ejs", { posts: posts });
});

// Route to view a single post
app.get("/posts/:id", (req, res) => {
  const postId = req.params.id;
  const post = posts.find(p => p.id === postId);
  
  if (post) {
    res.render("singlePost.ejs", { post : post});
  } else {
    res.status(404).send("Post not found");
  }
});

// Route to handle post updates
app.post("/update-post/:id", (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;
  
  const postIndex = posts.findIndex(p => p.id === postId);
  if (postIndex !== -1) {
    posts[postIndex] = { id: postId, title, content }; // Update post
    res.redirect("/posts");
  } else {
    res.status(404).send("Post not found");
  }
});

// Route to delete a post
app.post("/delete-post/:id", (req, res) => {
  const postId = req.params.id;
  posts = posts.filter(p => p.id !== postId); // Remove post by ID
  res.redirect("/posts");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
