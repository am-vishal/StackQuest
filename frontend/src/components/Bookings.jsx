import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const Bookings = () => {
  const [vehicleType, setVehicleType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [bookings, setBookings] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBooking = {
      vehicleType,
      fromDate,
      toDate,
      pickupAddress,
    };
    setBookings([...bookings, newBooking]);
    setVehicleType("");
    setFromDate("");
    setToDate("");
    setPickupAddress("");
  };

  return (
    <Container sx={{ display: "flex" }}>
      <Box sx={{ width: "70%", mr: "5%" }}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2" mb={3}>
              Book a Vehicle
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: "flex", gap: 3 }}>
                <FormControl fullWidth>
                  <InputLabel id="vehicle-type-label">Vehicle Type</InputLabel>
                  <Select
                    labelId="vehicle-type-label"
                    id="vehicle-type"
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                  >
                    <MenuItem value="Bike">Bike</MenuItem>
                    <MenuItem value="Car">Car</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label="From Date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="To Date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
                <FormControl fullWidth>
                  <InputLabel id="pickup-address-label">
                    Pickup Address
                  </InputLabel>
                  <Select
                    labelId="pickup-address-label"
                    id="pickup-address"
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                  >
                    <MenuItem value="Address 1">Address 1</MenuItem>
                    <MenuItem value="Address 2">Address 2</MenuItem>
                    <MenuItem value="Address 3">Address 3</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                <button type="submit">Book Now</button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ width: "25%" }}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2" mb={3}>
              My Bookings
            </Typography>
            {bookings.map((booking, index) => (
              <div key={index} sx={{ display: "flex", marginBottom: 2 }}>
                <img
                  src={booking.vehicle === "bike" ? "bike.jpg" : "car.jpg"}
                  alt={booking.vehicle}
                  height="80"
                  width="80"
                  sx={{ marginRight: 2 }}
                />
                <div>
                  <Typography variant="subtitle1">
                    {booking.vehicle.toUpperCase()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {booking.fromDate} - {booking.toDate}
                  </Typography>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Bookings;
