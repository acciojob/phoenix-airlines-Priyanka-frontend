const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const flights = [
  {
    id: 1,
    airline: "Phoenix Airlines",
    flightNumber: "PA101",
    source: "Delhi",
    destination: "Mumbai",
    departure: "09:00 AM",
    arrival: "11:15 AM",
    price: 5500,
  },
  {
    id: 2,
    airline: "Phoenix Airlines",
    flightNumber: "PA202",
    source: "Mumbai",
    destination: "Delhi",
    departure: "02:00 PM",
    arrival: "04:15 PM",
    price: 5800,
  },
];

app.get("/api/flights", (req, res) => {
  const { source, destination } = req.query;

  let results = flights;

  if (source) {
    results = results.filter(
      (flight) =>
        flight.source.toLowerCase() === source.toLowerCase()
    );
  }

  if (destination) {
    results = results.filter(
      (flight) =>
        flight.destination.toLowerCase() === destination.toLowerCase()
    );
  }

  res.json({
    success: true,
    flights: results,
  });
});

app.post("/api/bookings", (req, res) => {
  const booking = {
    bookingId: `PA${Date.now()}`,
    ...req.body,
  };

  res.status(201).json({
    success: true,
    message: "Booking confirmed",
    booking,
  });
});

app.listen(5001, () => {
  console.log("Backend running on http://localhost:5001");
});