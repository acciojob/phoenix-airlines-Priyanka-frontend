import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tripType: "one-way",

  source: "",
  destination: "",

  journeyDate: "",
  returnDate: "",

  selectedFlight: null,

  passenger: {
    name: "",
    email: "",
    phone: "",
  },

  booking: null,
};

const flightSlice = createSlice({
  name: "flight",

  initialState,

  reducers: {
    setSearchDetails: (state, action) => {
      state.tripType = action.payload.tripType;
      state.source = action.payload.source;
      state.destination = action.payload.destination;
      state.journeyDate = action.payload.journeyDate;
      state.returnDate = action.payload.returnDate;
    },

    setSelectedFlight: (state, action) => {
      state.selectedFlight = action.payload;
    },

    setPassenger: (state, action) => {
      state.passenger = action.payload;
    },

    setBooking: (state, action) => {
      state.booking = action.payload;
    },

    resetBooking: () => {
      return initialState;
    },
  },
});

export const {
  setSearchDetails,
  setSelectedFlight,
  setPassenger,
  setBooking,
  resetBooking,
} = flightSlice.actions;

export default flightSlice.reducer;