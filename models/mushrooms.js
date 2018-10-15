const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const MushroomSchema = new Schema({
    nick: String,
    filename: String,
    upload_date: Date
});

// Create Model
// Every time someone creates a new Mushroom mongoose is gonna place it in mushrooms collection and base it on MushroomSchema
const Mushroom = mongoose.model('mushrooms', MushroomSchema);

module.exports = Mushroom;
