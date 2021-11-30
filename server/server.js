// Sample code provided by Florin Rusu.
// David Dominguez and Salvador Rodriguez
// Create express app.
var express = require("express")
var app = express()

const Cars = require('./cars')
var cars = new Cars('./cars.sqlite')

// State what port we'll be utilizing.
var HTTP_PORT = 5000

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

// Start server.
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});

// Root endpoint.
app.get("/", (req, res, next) => {
    res.json({ "message": "Ok" })
});

// Insert here other API endpoints.
app.get("/api/posts", (req, res, next) => {
    cars.allPosts()
    .then((posts) => {
        res.json({
            "message": "success!",
            "data": posts
        })
    })
	.catch((err) => {
        res.status(400).json({"error": err.message });
        return;
    })
});

app.get("/api/comments", (req, res, next) => {
    cars.allComments()
    .then((comments) => {
        res.json({
            "message": "success!",
            "data": comments
        })
    })
	.catch((err) => {
        res.status(400).json({"error": err.message });
        return;
    })
});

app.get("/api/cids", (req, res, next) => {
    cars.commentIds()
    .then((commentIds) => {
        res.json({
            "message": "success!",
            "data": commentIds
        })
    })
	.catch((err) => {
        res.status(400).json({"error": err.message });
        return;
    })
});

// Default response for any other request
app.use(function (req, res) {
    res.status(404);
});
