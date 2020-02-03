/******************** Server Starting Functions ********************/ 
const express = require("express");
var app = express();
const path = require("path");
const bodyParser = require("body-parser");
const ejs = require("ejs");

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended: true}));
app.set("views", "views");
app.set("view engine", "ejs");

app.listen(3000, function() {
    console.log("Server listening on port 3000")
});
/*******************************************************************/ 

// Connect to Mongoose database
const startDB = 
    require(__dirname + "/serversideScripts/mongooseDB.js");
startDB.startDB();

// Pulls in all of the 'get' and 'post' functions
const loadGets = 
    require(__dirname + "/serversideScripts/gets&posts.js");
loadGets.wrapper1(app);
