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
  image: String,
  marque: String,
  model: String,
  places: Number,
  price: Number,
});

// Create the Model
const Voiture = mongoose.model("Voiture", voitureSchema);

/*async function insertSampleCars() {
  const sampleCars = [
    { image: "", marque: "Toyota", model: "Corolla", places: 5, price: 50 },
    { image: "", marque: "Honda", model: "Civic", places: 5, price: 45 },
    { image: "", marque: "Ford", model: "Mustang", places: 4, price: 75 },
    { image: "", marque: "Tesla", model: "Model S", places: 5, price: 120 },
    { image: "", marque: "BMW", model: "X5", places: 7, price: 100 },
    { image: "", marque: "Audi", model: "A4", places: 5, price: 60 },
    { image: "", marque: "Toyota", model: "Camry", places: 5, price: 55 },
    { image: "", marque: "Honda", model: "Accord", places: 5, price: 55 },
    { image: "", marque: "Ford", model: "F-150", places: 3, price: 80 },
    { image: "", marque: "Tesla", model: "Model 3", places: 5, price: 100 },
    { image: "", marque: "Mercedes-Benz", model: "C-Class", places: 5, price: 85 },
    { image: "", marque: "Chevrolet", model: "Malibu", places: 5, price: 65 },
    { image: "", marque: "Nissan", model: "Altima", places: 5, price: 50 },
    { image: "", marque: "Hyundai", model: "Elantra", places: 5, price: 40 },
    { image: "", marque: "Volkswagen", model: "Jetta", places: 5, price: 55 },
    { image: "", marque: "Kia", model: "Optima", places: 5, price: 60 },
    { image: "", marque: "Jeep", model: "Grand Cherokee", places: 5, price: 95 },
    { image: "", marque: "Subaru", model: "Outback", places: 5, price: 70 },
    { image: "", marque: "Mazda", model: "CX-5", places: 5, price: 65 },
    { image: "", marque: "Lexus", model: "RX", places: 5, price: 110 },
    { image: "", marque: "Toyota", model: "Avalon", places: 5, price: 90 },
    { image: "", marque: "Honda", model: "Fit", places: 5, price: 40 },
    { image: "", marque: "Ford", model: "Explorer", places: 5, price: 95 },
    { image: "", marque: "Chevrolet", model: "Tahoe", places: 7, price: 120 },
    { image: "", marque: "Tesla", model: "Model X", places: 5, price: 150 },
    { image: "", marque: "BMW", model: "M3", places: 4, price: 125 },
    { image: "", marque: "Audi", model: "Q5", places: 5, price: 95 },
    { image: "", marque: "Hyundai", model: "Santa Fe", places: 5, price: 85 },
    { image: "", marque: "Toyota", model: "Highlander", places: 7, price: 110 },
    { image: "", marque: "Honda", model: "Pilot", places: 7, price: 105 },
    { image: "", marque: "Ford", model: "Edge", places: 5, price: 70 },
    { image: "", marque: "Chevrolet", model: "Equinox", places: 5, price: 65 },
    { image: "", marque: "Subaru", model: "Forester", places: 5, price: 80 },
    { image: "", marque: "Mazda", model: "Mazda6", places: 5, price: 60 },
    { image: "", marque: "Kia", model: "Sportage", places: 5, price: 75 },
    { image: "", marque: "Jeep", model: "Cherokee", places: 5, price: 85 },
    { image: "", marque: "Subaru", model: "Impreza", places: 5, price: 55 },
    { image: "", marque: "Mitsubishi", model: "Outlander", places: 5, price: 60 },
    { image: "", marque: "Ram", model: "1500", places: 5, price: 100 },
    { image: "", marque: "Buick", model: "Enclave", places: 7, price: 110 },
    { image: "", marque: "Volkswagen", model: "Golf", places: 5, price: 50 },
    { image: "", marque: "Cadillac", model: "Escalade", places: 7, price: 180 },
    { image: "", marque: "Chrysler", model: "Pacifica", places: 7, price: 100 },
    { image: "", marque: "Honda", model: "CR-V", places: 5, price: 70 },
    { image: "", marque: "Ford", model: "Ranger", places: 5, price: 85 },
    { image: "", marque: "Chevrolet", model: "Traverse", places: 7, price: 125 },
    { image: "", marque: "GMC", model: "Sierra", places: 5, price: 90 },
    { image: "", marque: "Nissan", model: "Rogue", places: 5, price: 60 },
    { image: "", marque: "Toyota", model: "Tundra", places: 5, price: 95 },
    { image: "", marque: "BMW", model: "X3", places: 5, price: 85 },
    { image: "", marque: "Kia", model: "Seltos", places: 5, price: 70 },
    { image: "", marque: "Mazda", model: "CX-9", places: 7, price: 115 },
    { image: "", marque: "Audi", model: "Q7", places: 7, price: 140 },
    { image: "", marque: "Hyundai", model: "Palisade", places: 7, price: 120 },
    { image: "", marque: "Ford", model: "F-250", places: 5, price: 125 },
    { image: "", marque: "Chevrolet", model: "Colorado", places: 5, price: 85 },
    { image: "", marque: "Ram", model: "2500", places: 5, price: 130 },
    { image: "", marque: "Honda", model: "HR-V", places: 5, price: 60 },
    { image: "", marque: "Toyota", model: "4Runner", places: 5, price: 110 },
    { image: "", marque: "Subaru", model: "Legacy", places: 5, price: 70 },
    { image: "", marque: "Chevrolet", model: "Blazer", places: 5, price: 95 },
    { image: "", marque: "Volkswagen", model: "Atlas", places: 7, price: 130 },
    { image: "", marque: "BMW", model: "X7", places: 7, price: 150 },
    { image: "", marque: "Ford", model: "Expedition", places: 7, price: 140 },
    { image: "", marque: "Mercedes-Benz", model: "GLS", places: 7, price: 160 },
    { image: "", marque: "Lexus", model: "LX", places: 7, price: 170 },
    { image: "", marque: "GMC", model: "Yukon", places: 7, price: 150 },
    { image: "", marque: "Ram", model: "3500", places: 5, price: 160 },
    { image: "", marque: "Toyota", model: "Sequoia", places: 7, price: 140 },
    { image: "", marque: "Chevrolet", model: "Suburban", places: 7, price: 155 },
    { image: "", marque: "Honda", model: "Ridgeline", places: 5, price: 85 },
    { image: "", marque: "Ford", model: "Maverick", places: 5, price: 70 },
    { image: "", marque: "BMW", model: "iX", places: 5, price: 150 },
    { image: "", marque: "Chevrolet", model: "Bolt EV", places: 5, price: 90 },
    { image: "", marque: "Tesla", model: "Cybertruck", places: 5, price: 180 },
    { image: "", marque: "Rivian", model: "R1T", places: 5, price: 200 }
];

  try {
    await Voiture.insertMany(sampleCars); // Insert multiple cars
    console.log("Sample cars inserted successfully!");
  } catch (err) {
    console.error("Error inserting sample cars:", err);
  }
}

insertSampleCars();*/

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, "public")));

// Search route
app.get("/search", async (req, res) => {
  const query = req.query.query; // Get the search query from the URL
  res.sendFile(path.join(__dirname, "explore-cars.html"));
});

// API route to fetch cars (with optional search query)
app.get("/api/voitures", async (req, res) => {
  const query = req.query.query; // Get the search query from the URL
  let filter = {};

  if (query) {
    // Filter by marque or model (case-insensitive)
    filter = {
      $or: [
        { marque: { $regex: query, $options: "i" } },
        { model: { $regex: query, $options: "i" } },
      ],
    };
  }

  const voitures = await Voiture.find(filter); // Fetch filtered data from MongoDB
  res.json(voitures); // Send data as JSON
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/explore-cars", (req, res) => {
  res.sendFile(path.join(__dirname, "explore-cars.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "contact.html"));
});

app.get("/contrat", (req, res) => {
  res.sendFile(path.join(__dirname, "contrat.html"));
});

app.get("/payment", (req, res) => {
  res.sendFile(path.join(__dirname, "payment.html"));
});

app.get("/rent", (req, res) => {
  res.sendFile(path.join(__dirname, "rent.html"));
});


//port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
