import React from "react";
import { useHistory } from "react-router-dom";

function Home() {
  const history = useHistory();

  return (
    <div className="page home-page">
      <nav className="navbar">
        <h2>Phoenix Airlines</h2>
      </nav>

      <div className="hero">
        <div className="hero-content">
          <h1>Fly with Phoenix Airlines</h1>

          <p>
            Book your next journey with Phoenix Airlines.
          </p>

          <button
            className="primary-btn"
            onClick={() => history.push("/flight-search")}
          >
            Search Flights
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;