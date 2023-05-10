const Vehicle = require("../models/vehicle");

module.exports.getAllVehicles = async (req, res) => {
  try {
    // const vehicles = await Vehicle.find();
    // res.json(vehicles);
    res.send("<h1>asdasd</h1>");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports.createVehicle = async (req, res) => {
  const {
    vehicleType,
    name,
    brand,
    model,
    year,
    seating_capacity,
    mileage,
    fuel_type,
    price_per_day,
  } = req.body;

  console.log(
    vehicleType,
    name,
    brand,
    model,
    year,
    seating_capacity,
    mileage,
    fuel_type,
    price_per_day
  );

  const vehicle = new Vehicle({
    vehicleType: vehicleType.toLowerCase(),
    name: name.toLowerCase(),
    brand,
    model,
    year,
    seating_capacity,
    mileage,
    fuel_type,
    price_per_day,
  });

  try {
    const existingVehicle = await Vehicle.findOne({ name });
    if (existingVehicle) {
      return res.status(409).json({ message: "Vehicle name already taken" });
    }
    let isValidVehicleType = Vehicle.schema
      .path("vehicleType")
      .enumValues.includes(vehicle.vehicleType);

    let isValidFuelType = Vehicle.schema
      .path("fuel_type")
      .enumValues.includes(vehicle.fuel_type);

    console.log(isValidFuelType);

    if (!isValidVehicleType) {
      return res.status(400).json({ message: "Invalid vehicle type" });
    }
    if (!isValidFuelType) {
      return res.status(400).json({ message: "Invalid fuel type" });
    }
    await vehicle.save();
    res.status(201).json({ message: "Vehicle added successfully", vehicle });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to add vehicle" });
  }
};
