const express = require("express");
const router = express.Router();
const bookingsController = require("../controllers/bookings");
const vehiclesController = require("../controllers/vehicles");
const usersController = require("../controllers/users");
const { isAuthenticated } = require("../config/isAuthenticated");

router.post("/", async (req, res) => {
  const cookieValue = req.cookies.Cookie;
  res.header({ keyAuth: cookieValue });
  res.send(cookieValue);
});

// Bookings routes
router.get("/bookings", isAuthenticated, bookingsController.getAllBookings);
router.post("/bookings", isAuthenticated, bookingsController.createBooking);

// Vehicles routes
router.get("/vehicles", vehiclesController.getAllVehicles);
router.post("/vehicles", vehiclesController.createVehicle);

// Users routes
router.post("/signin", usersController.signin);
router.post("/signup", usersController.signup);

module.exports = router;
