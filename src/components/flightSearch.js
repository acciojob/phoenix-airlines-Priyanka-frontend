import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  setSearchDetails,
  setSelectedFlight,
} from "../redux/flightSlice";

const flights = [
  {
    id: 1,
    airline: "Phoenix Airlines",
    flightNumber: "PA101",
    source: "Delhi",
    destination: "Mumbai",
    departure: "08:00 AM",
    arrival: "10:15 AM",
    duration: "2h 15m",
    price: 4500,
  },
  {
    id: 2,
    airline: "Phoenix Airlines",
    flightNumber: "PA202",
    source: "Delhi",
    destination: "Bangalore",
    departure: "10:30 AM",
    arrival: "01:15 PM",
    duration: "2h 45m",
    price: 5500,
  },
  {
    id: 3,
    airline: "Phoenix Airlines",
    flightNumber: "PA303",
    source: "Mumbai",
    destination: "Delhi",
    departure: "02:00 PM",
    arrival: "04:10 PM",
    duration: "2h 10m",
    price: 4800,
  },
  {
    id: 4,
    airline: "Phoenix Airlines",
    flightNumber: "PA404",
    source: "Bangalore",
    destination: "Delhi",
    departure: "06:00 PM",
    arrival: "08:45 PM",
    duration: "2h 45m",
    price: 5200,
  },
];

function FlightSearch() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [tripType, setTripType] = useState("one-way");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [journeyDate, setJourneyDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!source) {
      newErrors.source = "Please select source city";
    }

    if (!destination) {
      newErrors.destination = "Please select destination city";
    }

    if (
      source &&
      destination &&
      source.toLowerCase() === destination.toLowerCase()
    ) {
      newErrors.destination =
        "Source and destination cannot be the same";
    }

    if (!journeyDate) {
      newErrors.journeyDate = "Please select journey date";
    }

    if (tripType === "round-trip" && !returnDate) {
      newErrors.returnDate = "Please select return date";
    }

    if (
      tripType === "round-trip" &&
      journeyDate &&
      returnDate &&
      returnDate < journeyDate
    ) {
      newErrors.returnDate =
        "Return date cannot be before journey date";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSearch = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    dispatch(
      setSearchDetails({
        tripType,
        source,
        destination,
        journeyDate,
        returnDate,
      })
    );
  };

  const availableFlights = flights.filter((flight) => {
    if (!source || !destination) {
      return false;
    }

    return (
      flight.source.toLowerCase() === source.toLowerCase() &&
      flight.destination.toLowerCase() ===
        destination.toLowerCase()
    );
  });

  const handleBookFlight = (flight) => {
    dispatch(setSelectedFlight(flight));
    history.push("/flight-booking");
  };

  return (
    <div className="page">
      <nav className="navbar">
        <h2>Phoenix Airlines</h2>

        <button
          className="nav-home"
          onClick={() => history.push("/")}
        >
          Home
        </button>
      </nav>

      <main className="container">
        <h1>Search Flights</h1>

        <div className="trip-type">
          <button
            type="button"
            className={
              tripType === "one-way"
                ? "trip-btn active"
                : "trip-btn"
            }
            onClick={() => {
              setTripType("one-way");
              setReturnDate("");
            }}
          >
            One-way
          </button>

          <button
            type="button"
            className={
              tripType === "round-trip"
                ? "trip-btn active"
                : "trip-btn"
            }
            onClick={() => setTripType("round-trip")}
          >
            Round-trip
          </button>
        </div>

        <form
          className="search-form"
          onSubmit={handleSearch}
        >
          <div className="form-group">
            <label>From</label>

            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
            >
              <option value="">Select source</option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">Bangalore</option>
            </select>

            {errors.source && (
              <p className="error">{errors.source}</p>
            )}
          </div>

          <div className="form-group">
            <label>To</label>

            <select
              value={destination}
              onChange={(e) =>
                setDestination(e.target.value)
              }
            >
              <option value="">Select destination</option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">Bangalore</option>
            </select>

            {errors.destination && (
              <p className="error">
                {errors.destination}
              </p>
            )}
          </div>

          <div className="form-group">
            <label>Date of Journey</label>

            <input
              type="date"
              value={journeyDate}
              onChange={(e) =>
                setJourneyDate(e.target.value)
              }
            />

            {errors.journeyDate && (
              <p className="error">
                {errors.journeyDate}
              </p>
            )}
          </div>

          {tripType === "round-trip" && (
            <div className="form-group">
              <label>Return Date</label>

              <input
                type="date"
                value={returnDate}
                onChange={(e) =>
                  setReturnDate(e.target.value)
                }
              />

              {errors.returnDate && (
                <p className="error">
                  {errors.returnDate}
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            className="primary-btn"
          >
            Search Flights
          </button>
        </form>

        {source && destination && journeyDate && (
          <div className="results">
            <h2>Available Flights</h2>

            {availableFlights.length === 0 ? (
              <p className="error">
                No flights available for the selected route.
              </p>
            ) : (
              availableFlights.map((flight) => (
                <div
                  className="flight-card"
                  key={flight.id}
                >
                  <div>
                    <h3>{flight.airline}</h3>

                    <p>
                      Flight: {flight.flightNumber}
                    </p>

                    <p>
                      {flight.source} →{" "}
                      {flight.destination}
                    </p>
                  </div>

                  <div>
                    <p>
                      {flight.departure} -{" "}
                      {flight.arrival}
                    </p>

                    <p>{flight.duration}</p>
                  </div>

                  <div>
                    <h3>₹{flight.price}</h3>

                    <button
                      className="book-flight"
                      onClick={() =>
                        handleBookFlight(flight)
                      }
                    >
                      Book Flight
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default FlightSearch;