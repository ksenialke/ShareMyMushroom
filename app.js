// These two allow you to use express
const express = require('express');
const app = express();
// The built-in path module provides utilities for working with file and directory paths
const path = require('path');
// The fs module provides an API for interacting with the file system
const fs = require('fs');
// To use HTTP and client
const http = require('http');

// Routes
// app.get(path, callback)
// The first argument (path) is anything that comes after the domain
// The second argument is  a callback function that tells the server what to do when the path is matched
// __dirname is directory that contains the JavaScript source codenpm install nodemon --save-dev

app.get('/', (req, res) => {
    //res.send("<html> <img src=\"/upload/grzyp.jpg\"/> </html>");
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/javascript', (req, res) => {
    res.sendFile(path.join(__dirname, '/app.js'));
});

app.get('/css', (req, res) => {
    res.sendFile(path.join(__dirname, '/style.css'));
});

app.get('/grzyb_upload', (req, res) => {
    res.sendFile(path.join(__dirname, '/grzyb_upload.html'));
});

// Creating the server where browsers can connect
app.listen(5000, () => {
    console.log('App is starting at port', 5000)
});

//Image upload
const upload = require('express-fileupload');
app.use(upload());

//Generating a random name for it
function generateName(){
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var name ='';
    for(var i = 0; i<10; i++){
        name += chars.charAt(Math.random()*chars.length);
    }
    return name;
}

// Extracting the extension
function getFileExtension(thing) {
    return thing.name.split('.').pop();
}

// Posting request
app.post("/", function (req,res) {
    //When file is uploaded
    if(req.files){
        // console.log(req.files);
        // Extracting file's name
        const file = req.files.filename,
            filename = file.name;
        // Naming it
        const newName = generateName()+'.'+getFileExtension(file);
        // Using the mv() method to place the file somewhere on your server (first arg = path, second = callback function
        file.mv("/Users/kseniaklamut/WebstormProjects/ShareMyMushroom/Uploads/"+newName,function (err) {
            if(err){
                // If there's an error
                console.log(err);
                res.send('Error occured');
            }
            else{
                // If it works
                res.send('Done!');
            }
        });
    }});

// Array for List file names in the console
const testFolder = './Uploads/';
app.use('/upload', express.static(testFolder)); //

// Creating a function to list all files in a directory
let listFiles = function() {
    const listOfFiles = [];
    // Variable with a string of all files
    const lst = fs.readdirSync(testFolder);
        lst.forEach( i => {
            // Not adding .DS_Store file
            if ( i !=='.DS_Store'){
                listOfFiles.push(i);
             }
        });
    return listOfFiles;
};

// Creating a string with <img src> and all photos
function manyImages() {
    var imgs ='';
    for (var i = 0; i<listFiles().length; i++){
        imgs += '<img src="/upload/'+listFiles()[i]+'"/><br>';
    }
    return '<html>'+imgs+'</html>';
}

//Upload all photos at a specified path
app.get('/gowno', (req, res) => {
    res.send(manyImages());
});

//Uploading a mushroom photo
app.get('/grzyb_upload', (req, res) => {
    res.sendFile(path.join(__dirname, '/grzyb_upload.html'));
});

// Anything else typed after a domain
app.get("*", (req, res) => {
    res.json('Page not found.');
});
