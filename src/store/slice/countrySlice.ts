import { createSlice } from "@reduxjs/toolkit";
import { countries } from "../country";

const initialState = countries;

const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {},
});

export default countrySlice.reducer;
