// Sample code provided by Florin Rusu.
// David Dominguez and Salvador Rodriguez
// Create express app.
var express = require("express")
var app = express()

const Cars = require('./cars')
var cars = new Cars('./cars.sqlite')

// State what port we'll be utilizing.
var HTTP_PORT = 5000
var userID = 'n/a'
var userIDJSON = {key: 'nada'};

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
app.get("/api/uInsert/:userID-:email-:password", (req, res, next) => {
    cars.insertUser(req.params.userID, req.params.email, req.params.password)
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

app.get("/api/uLogin/:email-:password", (req, res, next) => {
    cars.userLogin(req.params.email, req.params.password)
    .then((rUserID) => {
        res.json({
            "message": "user found!",
            "data": rUserID
        })
        // We retrieve our User ID from login so that we can use it later from here!
        // So now we can use it in Posts to send a user id 
        userIDJSON = rUserID;
        userID = rUserID[0]['u_user_id'];
    })
	.catch((err) => {
        res.status(400).json({"error": err.message });
        return;
    })
});

app.get("/api/allUsers", (req, res, next) => {
    cars.allUsers()
    .then((users) => {
        res.json({
            "message": "success!",
            "data": users
        })
    })
        .catch((err) => {
            res.status(400).json({"error": err.message });
            return;
    })
});

app.get("/api/userQuery/:userID", (req, res, next) => {
    cars.userCheck(req.params.userID)
    .then((user) => {
        res.json({
            "message": "success!",
            "data": user
        })
    })
	.catch((err) => {
        res.status(400).json({"error": err.message });
        return;
    })
});

app.get("/api/delUser/:userID", (req, res, next) => {
    cars.delUser(req.params.userID)
    .then(() => {
        res.json({
            "message": "success!",
            "data": "deleted."
        })
    })
	.catch((err) => {
        res.status(400).json({"error": err.message });
        return;
    })
});

app.get("/api/uUpdate/:newUserID-:loginUserID", (req, res, next) => {
    cars.updateUser(req.params.newUserID, userID)
    .then(() => {
        res.json({
            "message": "success!",
            "data": "yo"
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
