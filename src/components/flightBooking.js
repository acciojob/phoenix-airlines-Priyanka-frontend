import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  setPassenger,
  setBooking,
} from "../redux/flightSlice";

function FlightBooking() {
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    selectedFlight,
    source,
    destination,
    journeyDate,
    returnDate,
    tripType,
  } = useSelector((state) => state.flight);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[A-Za-z ]+$/.test(name)) {
      newErrors.name =
        "Name should contain only letters";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      newErrors.email = "Enter a valid email";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(phone)) {
      newErrors.phone =
        "Phone number must contain 10 digits";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const passenger = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
    };

    const booking = {
      bookingId:
        "PA" +
        Date.now().toString().slice(-8),

      passenger,

      flight: selectedFlight,

      tripType,
      source,
      destination,
      journeyDate,
      returnDate,

      bookingDate: new Date().toISOString(),
    };

    dispatch(setPassenger(passenger));
    dispatch(setBooking(booking));

    history.push("/confirmation");
  };

  if (!selectedFlight) {
    return (
      <div className="page">
        <div className="container">
          <h1>No Flight Selected</h1>

          <button
            className="primary-btn"
            onClick={() =>
              history.push("/flight-search")
            }
          >
            Search Flights
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <nav className="navbar">
        <h2>Phoenix Airlines</h2>
      </nav>

      <main className="container">
        <h1>Flight Booking</h1>

        <div className="selected-flight">
          <h2>Selected Flight</h2>

          <p>
            <strong>Flight:</strong>{" "}
            {selectedFlight.flightNumber}
          </p>

          <p>
            <strong>Route:</strong> {source} →{" "}
            {destination}
          </p>

          <p>
            <strong>Journey:</strong>{" "}
            {journeyDate}
          </p>

          {tripType === "round-trip" && (
            <p>
              <strong>Return:</strong>{" "}
              {returnDate}
            </p>
          )}

          <p>
            <strong>Price:</strong> ₹
            {selectedFlight.price}
          </p>
        </div>

        <form
          className="booking-form"
          onSubmit={handleSubmit}
        >
          <h2>Passenger Details</h2>

          <div className="form-group">
            <label>Name</label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />

            {errors.name && (
              <p className="error">{errors.name}</p>
            )}
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />

            {errors.email && (
              <p className="error">{errors.email}</p>
            )}
          </div>

          <div className="form-group">
            <label>Phone Number</label>

            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter 10 digit phone number"
            />

            {errors.phone && (
              <p className="error">{errors.phone}</p>
            )}
          </div>

          <button
            type="submit"
            className="primary-btn"
          >
            Confirm Booking
          </button>
        </form>
      </main>
    </div>
  );
}

export default FlightBooking;