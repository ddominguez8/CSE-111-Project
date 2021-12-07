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

app.get("/api/pids", (req, res, next) => {
    cars.postIDs()
    .then((postIDs) => {
        res.json({
            "message": "success!",
            "data": postIDs
        })
    })
	.catch((err) => {
        res.status(400).json({"error": err.message });
        return;
    })
});

app.get("/api/cInsert/:prID-:cCounter-:content", (req, res, next) => {
    cars.insertComment(req.params.prID, req.params.cCounter,req.params.content)
    .then(() => {
        res.json({
            "message": "success!",
            "data": "nice :)"
        })
    })
	.catch((err) => {
        res.status(400).json({"error": err.message });
        return;
    })
});

app.get("/api/pInsert/:content-:pCounter-:sPost", (req, res, next) => {
    cars.insertPost(req.params.content, req.params.pCounter, req.params.sPost)
    .then(() => {
        res.json({
            "message": "success!",
            "data": "nice x2:)"
        })
    })
	.catch((err) => {
        res.status(400).json({"error": err.message });
        return;
    })
});

app.get("/api/pEdit/:newContent-:postID", (req, res, next) => {
    cars.editPost(req.params.newContent, req.params.postID)
    .then(() => {
        res.json({
            "message": "success!",
            "data": "nice x2:)"
        })
    })
	.catch((err) => {
        res.status(400).json({"error": err.message });
        return;
    })
});

app.get("/api/pQuery/:postID", (req, res, next) => {
    cars.postIDQueryInfo(req.params.postID)
    .then((queryInfo) => {
        res.json({
            "message": "success!",
            "data": queryInfo
        })
    })
	.catch((err) => {
        res.status(400).json({"error": err.message });
        return;
    })
});

app.get("/api/pEditUser/:userID-:newUserID", (req, res, next) => {
    cars.editPostUserID(req.params.userID, req.params.newUserID)
    .then(() => {
        res.json({
            "message": "success!",
            "data": "nice"
        })
    })
	.catch((err) => {
        res.status(400).json({"error": err.message });
        return;
    })
});

app.get("/api/cEditUser/:userID-:newUserID", (req, res, next) => {
    cars.editCommentUserID(req.params.userID, req.params.newUserID)
    .then(() => {
        res.json({
            "message": "success!",
            "data": "nice"
        })
    })
	.catch((err) => {
        res.status(400).json({"error": err.message });
        return;
    })
});

app.get("/api/cmEditUser/:userID-:newUserID", (req, res, next) => {
    cars.editCommenterUserID(req.params.userID, req.params.newUserID)
    .then(() => {
        res.json({
            "message": "success!",
            "data": "nice"
        })
    })
	.catch((err) => {
        res.status(400).json({"error": err.message });
        return;
    })
});

app.get("/api/cmInc/:userID", (req, res, next) => {
    cars.incCommenterUserID(req.params.userID)
    .then(() => {
        res.json({
            "message": "success!",
            "data": "nice"
        })
    })
	.catch((err) => {
        res.status(400).json({"error": err.message });
        return;
    })
});

app.get("/api/cmDec/:userID", (req, res, next) => {
    cars.decCommenterUserID(req.params.userID)
    .then(() => {
        res.json({
            "message": "success!",
            "data": "nice"
        })
    })
	.catch((err) => {
        res.status(400).json({"error": err.message });
        return;
    })
});

app.get("/api/dPost/:postID", (req, res, next) => {
    cars.delPostID(req.params.postID)
    .then(() => {
        res.json({
            "message": "success!",
            "data": "nice"
        })
    })
	.catch((err) => {
        res.status(400).json({"error": err.message });
        return;
    })
});

app.get("/api/dPostUser/:userID", (req, res, next) => {
    cars.delPostUser(req.params.userID)
    .then(() => {
        res.json({
            "message": "success!",
            "data": "nice"
        })
    })
	.catch((err) => {
        res.status(400).json({"error": err.message });
        return;
    })
});

app.get("/api/dComment/:commentID", (req, res, next) => {
    cars.delCommentID(req.params.commentID)
    .then(() => {
        res.json({
            "message": "success!",
            "data": "nice"
        })
    })
	.catch((err) => {
        res.status(400).json({"error": err.message });
        return;
    })
});

app.get("/api/commenters", (req, res, next) => {
    cars.allCommenters()
    .then((commenters) => {
        res.json({
            "message": "success!",
            "data": commenters
        })
    })
	.catch((err) => {
        res.status(400).json({"error": err.message });
        return;
    })
});

app.get("/api/cleanupPost", (req, res, next) => {
    cars.cleanupPost()
    .then(() => {
        res.json({
            "message": "success!",
            "data": "cleaned up"
        })
    })
	.catch((err) => {
        res.status(400).json({"error": err.message });
        return;
    })
});

app.get("/api/cleanupCommenters", (req, res, next) => {
    cars.cleanupCommenters()
    .then(() => {
        res.json({
            "message": "success!",
            "data": "cleaned up"
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
