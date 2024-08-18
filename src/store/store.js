import { configureStore } from "@reduxjs/toolkit";
import formDataSlice from "./slice/formDataSlice";
import countrySlice from "./slice/countrySlice";
export const store = configureStore({
    reducer: {
        formData: formDataSlice,
        country: countrySlice,
    },
});
