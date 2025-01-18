const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));

main().then( () => {
    console.log("connected to DB");
}).catch( (err) => {
    console.log(err);
})

async function main() { 
    mongoose.connect('mongodb://127.0.0.1:27017/WANDERLUST');
}

app.get("/", (req,res) => {
    res.send("hi im root");
})

app.get("/listings",  async (req,res) => {
    
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
})

app.get("/listings/new", (req,res) => {
    res.render("listings/new.ejs");
})

app.get("/listings/:id", async (req,res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
})

app.post("/listings", async (req,res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
})

app.get("/listings/:id/edit", async (req,res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
})

app.listen(8080, () => {
    console.log("port is listening to port 8080");
})






 