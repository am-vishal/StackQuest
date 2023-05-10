const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Booking = require("../models/booking");

// GET all bookings
module.exports.getAllBookings = async (req, res) => {
  console.log("GET BOOKINGS");
  try {
    const bookings = await Booking.find()
      .populate("user_id")
      .populate("vehicle_id");
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports.createBooking = async (req, res) => {
  console.log("POST BOOKINGS");

  try {
    const { user_id, vehicleType, pickupDate, returnDate, total_price } =
      req.body;

    // Check if vehicle is available for the given dates
    const available = await Availability.findOne({
      vehicleType,
      date: { $gte: pickupDate, $lte: returnDate },
    });
    if (!available || available.total_bookings >= 1) {
      return res.status(400).json({
        errors: [{ msg: "Vehicle not available for the given dates" }],
      });
    }

    // Create booking
    const booking = new Booking({
      user_id,
      vehicle_id,
      pickupDate,
      returnDate,
      total_price,
    });
    await booking.save();

    // Update availability
    await Availability.updateOne(
      { _id: available._id },
      { $inc: { total_bookings: 1 } }
    );

    res.json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
