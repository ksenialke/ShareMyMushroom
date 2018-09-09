const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
var http = require('http');

//Routes
app.get('/', (req, res) => {
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

app.get("*", (req, res) => {
    res.json('Page not found.');
});

app.listen(5000, () => {
    console.log('App is starting at port', 5000)
});

//Image upload
var upload = require('express-fileupload');
app.use(upload());

//Generating a name for it
function generateName(){
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var word ='';
    for(var i = 0; i<10; i++){
        word += chars.charAt(Math.random()*chars.length);
    }
    return word;
}

function getFileExtension(thing) {
    return thing.name.split('.').pop();
}

app.post("/", function (req,res) {
    //When file is uploaded
    if(req.files){
        var file = req.files.filename,
            filename = file.name;
        var newName = generateName()+'.'+getFileExtension(file);
        file.mv("/Users/kseniaklamut/WebstormProjects/ShareMyMushroom/Uploads/"+newName,function (err) {
            if(err){
                //if there's an error
                console.log(err)
                res.send('Error occured');
            }
            else{
                //if it works
                res.send('Done!');
            }
        })
    }
});

//List file names in the console
const testFolder = '/Users/kseniaklamut/WebstormProjects/ShareMyMushroom/Uploads/';

fs.readdir(testFolder, (err, files) => {
    files.forEach(file => {
        console.log(file);
    });
})
