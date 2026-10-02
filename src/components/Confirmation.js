import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function Confirmation() {
  const history = useHistory();

  const { booking } = useSelector(
    (state) => state.flight
  );

  if (!booking) {
    return (
      <div className="page">
        <div className="container">
          <h1>No Booking Found</h1>

          <button
            onClick={() => history.push("/")}
          >
            Go Home
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

      <main className="container confirmation">
        <div className="success-icon">✓</div>

        <h1>Booking Confirmed!</h1>

        <p>
          Your flight has been successfully booked.
        </p>

        <div className="confirmation-card">
          <h2>Booking Details</h2>

          <p>
            <strong>Booking ID:</strong>{" "}
            {booking.bookingId}
          </p>

          <p>
            <strong>Passenger:</strong>{" "}
            {booking.passenger.name}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {booking.passenger.email}
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            {booking.passenger.phone}
          </p>

          <hr />

          <p>
            <strong>Flight:</strong>{" "}
            {booking.flight.flightNumber}
          </p>

          <p>
            <strong>Route:</strong>{" "}
            {booking.source} → {booking.destination}
          </p>

          <p>
            <strong>Journey Date:</strong>{" "}
            {booking.journeyDate}
          </p>

          {booking.tripType === "round-trip" && (
            <p>
              <strong>Return Date:</strong>{" "}
              {booking.returnDate}
            </p>
          )}

          <p>
            <strong>Amount:</strong> ₹
            {booking.flight.price}
          </p>
        </div>

        <button
          onClick={() => history.push("/")}
        >
          Return to Home
        </button>
      </main>
    </div>
  );
}

export default Confirmation;