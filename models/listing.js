const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        type: String,
        default:"url",
        set: (v) => v === "" ? "url" : v
    },
    price: Number,
    location: String,
    city: String
});

const Listing = mongoose.model('Listing', listSchema);
module.exports = Listing;
