const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
  vehicle_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  total_bookings: {
    type: Number,
    default: 0,
  },
});

const Availability = mongoose.model("Availability", availabilitySchema);

module.exports = Availability;
