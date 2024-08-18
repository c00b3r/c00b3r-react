import { configureStore } from "@reduxjs/toolkit";
import formDataSlice from "./slice/formDataSlice";
import countrySlice from "./slice/countrySlice";

export const store = configureStore({
  reducer: {
    formData: formDataSlice,
    country: countrySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
