const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  vehicleType: {
    type: String,
    required: true,
    enum: ["car", "bike", "hatchback", "suv", "sedan", "cruiser", "sports"],
  },
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  seating_capacity: {
    type: Number,
    required: true,
    min: 2,
    max: 10,
  },
  mileage: {
    type: Number,
    required: true,
    min: 0,
  },
  fuel_type: {
    type: String,
    required: true,
    enum: ["petrol", "diesel", "electric"],
  },
  price_per_day: {
    type: Number,
    required: true,
    index: true,
  },
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;
