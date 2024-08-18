import { configureStore } from "@reduxjs/toolkit";
import formDataSlice from "./slice/formDataSlice";

export const store = configureStore({
  reducer: {
    formData: formDataSlice,
  },
});
