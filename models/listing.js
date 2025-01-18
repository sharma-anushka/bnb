const mongoose = require("mongoose");



const listingSchema = new mongoose.Schema({
    title : {
        type :String,
        required : true,
    },
    description : {
        type : String,
        required : true},
    image: {
        filename: String,
        url: {
            type: String,
            set: (v) => v === "" ? "https://unsplash.com/photos/a-view-of-the-golden-gate-bridge-at-sunset-2qjwaPLOQ5c" : v
        }
    },
    price : Number,
    location : String,
    country : String,    
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;