// These two allow you to use express
const express = require('express');
const app = express();
// The built-in path module provides utilities for working with file and directory paths
const path = require('path');
// The fs module provides an API for interacting with the file system
const fs = require('fs');
// To use HTTP and client
const http = require('http');

const testFolder = './Uploads/';

//EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/upload', express.static(testFolder)); // viewing pics at ../upload/name+extension
app.use( '/css', express.static( './css' ) );

// Routes
// app.get(path, callback)
// The first argument (path) is anything that comes after the domain
// The second argument is  a callback function that tells the server what to do when the path is matched
// __dirname is directory that contains the JavaScript source codenpm install nodemon --save-dev

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
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
        // Extracting file's name
        const file = req.files.filename,
            filename = file.name;
        // Validating the type
        if((file.mimetype) =='image/jpeg' || (file.mimetype) =='image/png'){
            // Naming it
            const newName = generateName()+'.'+getFileExtension(file);
            // Using the mv() method to place the file somewhere on your server (first arg = path, second = callback function)
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
        }
        else{
            res.sendFile(path.join(__dirname, '/otherFiles.html'));
        }
    }});

// Creating a function to list all files in a directory
let listFiles = function() {
    const lst = fs.readdirSync(testFolder).filter((elem)=>{
        return elem !== '.DS_Store';
    });
    return lst;
};

// Sorting dates and Creating a string with <img src> and all photos
function manyImages() {
    var imgs =[];
    let files = listFiles();
    var d = [];
    for (let i = 0; i<files.length; i++) { //Dla wszystkich plikow wylistowanych z katalogu
        date = new Date(fs.statSync('./Uploads/' + files[i]).mtime); // biore mtime i wrzucam do daty => Object key
        var name = files[i]; // Object value
        var e = {}; //Robie obiekt na daty:nazwy
        e.date = date; //Key date = mtime każdego pliku po kolei
        e.name = name; // Value name = nazwa każdego pliku po kolei
        d.push(e); //Wrzucam całą parę do listy
    }
    var date_sort_desc = function (e1, e2) {
        if (e1.date > e2.date) return -1;
        if (e1.date < e2.date) return 1;
        return 0;
    };
    var sorted = d.sort(date_sort_desc); //Posortowane datami obiekty w liście

    var obj;
    for (let i = 0; i<files.length; i++){ //files.length
        obj = new Object();
        obj.name = sorted[i].name
        imgs.push(obj)
    }
    return imgs;
}

//Upload all photos at a specified path with EJS template
app.get('/uploaded', (req, res) => {
    var c = manyImages();
    res.render('uploaded', {
        photos: c
    });
});

//Uploading a mushroom photo
app.get('/grzyb_upload', (req, res) => {
    res.sendFile(path.join(__dirname, '/grzyb_upload.html'));
});

// Anything else typed after a domain
app.get("*", (req, res) => {
    res.json('Page not found.');
});
