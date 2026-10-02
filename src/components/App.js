import React from "react";
import { Switch, Route } from "react-router-dom";

import Landing from "./Landing";
import FlightSearch from "./FlightSearch";
import FlightBooking from "./FlightBooking";
import Confirmation from "./Confirmation";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />

      <Route
        path="/flight-search"
        component={FlightSearch}
      />

      <Route
        path="/flight-booking"
        component={FlightBooking}
      />

      <Route
        path="/confirmation"
        component={Confirmation}
      />
    </Switch>
  );
}

export default App;