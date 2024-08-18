import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormDataState {
  name: string;
  age: number;
  email: string;
  password: string;
  acceptPassword: string;
  gender: string;
  accept: boolean;
  picture: string;
  country: string;
}

const initialState: FormDataState[] = [];

const formDataSlice = createSlice({
  name: "formData",
  initialState,
  reducers: {
    addFormData(state, action: PayloadAction<FormDataState>) {
      state.push(action.payload);
    },
  },
});

export const { addFormData } = formDataSlice.actions;
export default formDataSlice.reducer;
