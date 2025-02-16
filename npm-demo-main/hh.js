const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");

mongoose
    .connect("mongodb://localhost:27017/locationVoiture")
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

const contractSchema = new mongoose.Schema({ // Contract schema
    carType: String,
    rentalDays: Number,
    startDate: String,
    totalPrice: Number,
    additionalInfo: String,
});

// Create the Model
const Voiture = mongoose.model("Voiture", voitureSchema);
const Contract = mongoose.model("Contract", contractSchema); // Contract model


async function insertSampleCars() {
    const sampleCars = [
      { image: "/images/toyotaCorolla.jpg", marque: "Toyota", model: "Corolla", places: 5, price: 50 },
      { image: "/images/hondaCivic.jpg", marque: "Honda", model: "Civic", places: 5, price: 45 },
      { image: "/images/fordMustang.jpg", marque: "Ford", model: "Mustang", places: 4, price: 75 },
      { image: "/images/teslaModels.jpg", marque: "Tesla", model: "Model S", places: 5, price: 120 },
      { image: "/images/bmwX5.jpg", marque: "BMW", model: "X5", places: 7, price: 100 },
      { image: "/images/AudiA4.jpg", marque: "Audi", model: "A4", places: 5, price: 60 },
      { image: "/images/toyotaCamry.jpg", marque: "Toyota", model: "Camry", places: 5, price: 55 },
      { image: "/images/hondaAccord.jpg", marque: "Honda", model: "Accord", places: 5, price: 55 },
      { image: "/images/fordF150.jpg", marque: "Ford", model: "F-150", places: 3, price: 80 },
      { image: "/images/teslaModel3.jpg", marque: "Tesla", model: "Model 3", places: 5, price: 100 },
      { image: "/images/mercedesBenz-cClass.jpg", marque: "Mercedes-Benz", model: "C-Class", places: 5, price: 85 },
      { image: "/images/chevroletMalibu.jpg", marque: "Chevrolet", model: "Malibu", places: 5, price: 65 },
      { image: "/images/nissanAltima.jpg", marque: "Nissan", model: "Altima", places: 5, price: 50 },
      { image: "/images/hyundaiElantra.jpg", marque: "Hyundai", model: "Elantra", places: 5, price: 40 },
      { image: "/images/volkswagenJetta.jpg", marque: "Volkswagen", model: "Jetta", places: 5, price: 55 },
      { image: "/images/kiaOptima.jpg", marque: "Kia", model: "Optima", places: 5, price: 60 },
      { image: "/images/jeepGrandcherokee.jpg", marque: "Jeep", model: "Grand Cherokee", places: 5, price: 95 },
      { image: "/images/subaruOutback.jpg", marque: "Subaru", model: "Outback", places: 5, price: 70 },
      { image: "/images/mazdaCx5.jpg", marque: "Mazda", model: "CX-5", places: 5, price: 65 },
      { image: "/images/lexusRx.jpg", marque: "Lexus", model: "RX", places: 5, price: 110 },
      { image: "/images/toyotaAvalon.jpg", marque: "Toyota", model: "Avalon", places: 5, price: 90 },
      { image: "/images/hondaFit.jpg", marque: "Honda", model: "Fit", places: 5, price: 40 },
      { image: "/images/fordExplorer.jpg", marque: "Ford", model: "Explorer", places: 5, price: 95 },
      { image: "/images/chevroletTahoe.jpg", marque: "Chevrolet", model: "Tahoe", places: 7, price: 120 },
      { image: "/images/teslaModelx.jpg", marque: "Tesla", model: "Model X", places: 5, price: 150 },
      { image: "/images/bmwM3.jpg", marque: "BMW", model: "M3", places: 4, price: 125 },
      { image: "/images/audiQ5.jpg", marque: "Audi", model: "Q5", places: 5, price: 95 },
      { image: "/images/hyundaiSantafe.jpg", marque: "Hyundai", model: "Santa Fe", places: 5, price: 85 },
      { image: "/images/toyotaHighlander.jpg", marque: "Toyota", model: "Highlander", places: 7, price: 110 },
      { image: "/images/hondaPilot.jpg", marque: "Honda", model: "Pilot", places: 7, price: 105 },
      { image: "/images/fordEdge.jpg", marque: "Ford", model: "Edge", places: 5, price: 70 },
      { image: "/images/chevroletEquinox.jpg", marque: "Chevrolet", model: "Equinox", places: 5, price: 65 },
      { image: "/images/subaruForester.jpg", marque: "Subaru", model: "Forester", places: 5, price: 80 },
      { image: "/images/mazda6.jpg", marque: "Mazda", model: "Mazda6", places: 5, price: 60 },
      { image: "/images/kiasportage.jpg", marque: "Kia", model: "Sportage", places: 5, price: 75 },
      { image: "/images/jeepCherokee.jpg", marque: "Jeep", model: "Cherokee", places: 5, price: 85 },
      { image: "/images/subaruImpreza.jpg", marque: "Subaru", model: "Impreza", places: 5, price: 55 },
      { image: "/images/mitsubishiOutlander.jpg", marque: "Mitsubishi", model: "Outlander", places: 5, price: 60 },
      { image: "/images/ram1500.jpg", marque: "Ram", model: "1500", places: 5, price: 100 },
      { image: "/images/buickInclave.jpg", marque: "Buick", model: "Enclave", places: 7, price: 110 },
      { image: "/images/volkswagenGolf.jpg", marque: "Volkswagen", model: "Golf", places: 5, price: 50 },
      { image: "/images/cadillacEscalade.jpg", marque: "Cadillac", model: "Escalade", places: 7, price: 180 },
      { image: "/images/chryslerPacifica.jpg", marque: "Chrysler", model: "Pacifica", places: 7, price: 100 },
      { image: "/images/hondaCrv.jpg", marque: "Honda", model: "CR-V", places: 5, price: 70 },
      { image: "/images/fordRanger.jpg", marque: "Ford", model: "Ranger", places: 5, price: 85 },
      { image: "/images/chevroletTraverse.jpg", marque: "Chevrolet", model: "Traverse", places: 7, price: 125 },
      { image: "/images/gmcgmcSierra.jpg", marque: "GMC", model: "Sierra", places: 5, price: 90 },
      { image: "/images/nissanRogue.jpg", marque: "Nissan", model: "Rogue", places: 5, price: 60 },
      { image: "/images/toyotaTundra.jpg", marque: "Toyota", model: "Tundra", places: 5, price: 95 },
      { image: "/images/bmwX3.jpg", marque: "BMW", model: "X3", places: 5, price: 85 },
      { image: "/images/kiaSeltos.jpg", marque: "Kia", model: "Seltos", places: 5, price: 70 },
      { image: "/images/mazdaCx9.jpg", marque: "Mazda", model: "CX-9", places: 7, price: 115 },
      { image: "/images/audiQ7.jpg", marque: "Audi", model: "Q7", places: 7, price: 140 },
      { image: "/images/hyundaiPalisade.jpg", marque: "Hyundai", model: "Palisade", places: 7, price: 120 },
      { image: "/images/fordF250.jpg", marque: "Ford", model: "F-250", places: 5, price: 125 },
      { image: "/images/chevroletColorado.jpg", marque: "Chevrolet", model: "Colorado", places: 5, price: 85 },
      { image: "/images/ram2500.jpg", marque: "Ram", model: "2500", places: 5, price: 130 },
      { image: "images/hondaHrv.jpg", marque: "Honda", model: "HR-V", places: 5, price: 60 },
      { image: "images/toyota4Runner.jpg", marque: "Toyota", model: "4Runner", places: 5, price: 110 },
      { image: "images/subaruc.jpg", marque: "Subaru", model: "c", places: 5, price: 70 },
      { image: "images/chevroletBlazer.jpg", marque: "Chevrolet", model: "Blazer", places: 5, price: 95 },
      { image: "images/volkswagenAtlas.jpg", marque: "Volkswagen", model: "Atlas", places: 7, price: 130 },
      { image: "images/bmwX7.jpg", marque: "BMW", model: "X7", places: 7, price: 150 },
      { image: "images/fordExpedition.jpg", marque: "Ford", model: "Expedition", places: 7, price: 140 },
      { image: "images/mercedesbenzGls.jpg", marque: "Mercedes-Benz", model: "GLS", places: 7, price: 160 },
      { image: "images/lexusLx.jpg", marque: "Lexus", model: "LX", places: 7, price: 170 },
      { image: "images/gmcYukon.jpg", marque: "GMC", model: "Yukon", places: 7, price: 150 },
      { image: "images/ram3500.jpg", marque: "Ram", model: "3500", places: 5, price: 160 },
      { image: "images/toyotaSequoia.jpg", marque: "Toyota", model: "Sequoia", places: 7, price: 140 },
      { image: "images/chevroletSuburban.jpg", marque: "Chevrolet", model: "Suburban", places: 7, price: 155 },
      { image: "images/hondaRidgeline.jpg", marque: "Honda", model: "Ridgeline", places: 5, price: 85 },
      { image: "images/fordMaverick.jpg", marque: "Ford", model: "Maverick", places: 5, price: 70 },
      { image: "images/bmwIx.jpg", marque: "BMW", model: "iX", places: 5, price: 150 },
      { image: "images/chevroletBoltev.jpg", marque: "Chevrolet", model: "Bolt EV", places: 5, price: 90 },
      { image: "images/teslaCybertruck.jpg", marque: "Tesla", model: "Cybertruck", places: 5, price: 180 },
      { image: "images/rivianR1t.jpg", marque: "Rivian", model: "R1T", places: 5, price: 200 }
  ];
  
    try {
      await Voiture.insertMany(sampleCars); // Insert multiple cars
      console.log("Sample cars inserted successfully!");
    } catch (err) {
      console.error("Error inserting sample cars:", err);
    }
  }
  
  insertSampleCars();

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, "public")));

// Search route (keep it as is)
app.get("/search", async (req, res) => {
    const query = req.query.query; 
    res.sendFile(path.join(__dirname, "explore-cars.html"));
});

// API route to fetch cars (with optional search query) (keep it as is)
app.get("/api/voitures", async (req, res) => {
    const query = req.query.query; 
    let filter = {};

    if (query) {
        filter = {
            $or: [
                { marque: { $regex: query, $options: "i" } },
                { model: { $regex: query, $options: "i" } },
            ],
        };
    }

    const voitures = await Voiture.find(filter); 
    res.json(voitures); 
});

// Your existing route handlers (keep them as is)
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

app.use(express.json()); // Important: Enable parsing JSON request bodies

// API endpoint to save contracts (new code)
app.post('/api/contracts', async (req, res) => {
    try {
        const contractData = req.body;

        // Validate required fields (important!)
        if (!contractData.carType || !contractData.rentalDays || !contractData.startDate || !contractData.totalPrice) {
            return res.status(400).json({ message: "Missing required contract data." });
        }

        const newContract = new Contract(contractData); // Create a new Contract document
        const result = await newContract.save(); // Save to the database

        res.status(201).json({ message: 'Contract saved successfully', insertedId: result._id }); // Send back the ID

    } catch (error) {
        console.error("Error saving contract:", error);
        res.status(500).json({ message: 'Error saving contract' });
    }
});


//port (keep it as is)
const port = process.env.PORT || 3003;
app.listen(port, () => console.log(`Listening on port ${port}...`));