import express from "express";

// Declare and initialize variables
const app = express();
const port = 3000;
var blogs = [];
var idCount = 0;

// Begin express functions
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Provide the homepage as a response to a connection
app.get("/", (req, res) => {
    res.render("index.ejs", { blogs });
}); 

// Update the page after a user submission
app.post("/submit", (req, res) => {
    var blog = {
        id: idCount++,
        title: req.body.title,
        text: req.body.text,
    };
    blogs.push(blog);

    res.render("index.ejs", { blogs }); 
});

// Show the blog page when the user requests a link
app.get("/blogs/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const blog = blogs.find((b) => b.id === id);

    if (blog) {
        res.render("blogs.ejs", { blog });
    }
    else {
        res.status(404).send("Blog not found");
    }
});

// Edit the blog upon user request
app.post("/blogs/:id/edit", (req, res) => {
    const id = parseInt(req.params.id);
    const blog = blogs.find((b) => b.id === id);
    
    if (blog) {
        blog.title = req.body.title;
        blog.text = req.body.text;
        res.redirect(`/blogs/${id}`);
    }
    else {
        res.status(404).send("Blog not found");
    }
});

// Update the homepage when a blog is deleted
app.post("/blogs/:id/delete", (req, res) => {
    const id = parseInt(req.params.id);
    blogs = blogs.filter((b) => b.id !== id);
    res.redirect("/");
});

// Start server to listen to incoming requests
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});       
