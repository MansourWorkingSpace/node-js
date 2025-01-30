const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/locationVoiture")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB.", err));

// Define the Schema
const voitureSchema = new mongoose.Schema({
    marque: String,
    model: String,
    places: Number
});

// Create the Model
const Voiture = mongoose.model("Voiture", voitureSchema);

// Insert a Sample Car
async function createVoiture() {
    const voiture = new Voiture({
        marque: "Toyota",
        model: "Corolla",
        places: 5
    });

    const result = await voiture.save();
    console.log("Voiture added:", result);
}

// Run the function to insert a car
createVoiture();


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/home.html", (req, res) => {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/about.html", (req, res) => {
  res.sendFile(path.join(__dirname, "about.html"));
});

//port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
