const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/MyProject")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB.", err));

// Define the Schema
const DeviceSchema = new mongoose.Schema({
  deviceName: String,
  adresseIp: String,
  adresseMac: String,
});

// Create the Model
const Device = mongoose.model("Device", DeviceSchema, "devices");

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, "public")));

// Enable parsing JSON request bodies
app.use(express.json());

// Route to serve the add device page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Route to serve the devices list page
app.get("/devices", (req, res) => {
  res.sendFile(path.join(__dirname, "devices.html"));
});

// API route to fetch devices
app.get("/api/devices", async (req, res) => {
  const query = req.query.query || "";
  const devices = await Device.find({ deviceName: { $regex: query, $options: "i" } });
  res.json(devices);
});

// API route to add a new device
app.post("/api/devices", async (req, res) => {
  try {
    console.log("Received device data:", req.body); // Log the incoming request body
    const deviceData = req.body;
    const newDevice = new Device(deviceData);
    const result = await newDevice.save();
    console.log("Device added successfully:", result); // Log the result of the save operation
    res.status(201).json({ message: "Device added successfully", insertedId: result._id });
  } catch (error) {
    console.error("Error adding device:", error);
    res.status(500).json({ message: "Error adding device" });
  }
});

// Port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));