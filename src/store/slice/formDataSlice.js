import { createSlice } from "@reduxjs/toolkit";
const initialState = [];
const formDataSlice = createSlice({
    name: "formData",
    initialState,
    reducers: {
        addFormData(state, action) {
            state.push(action.payload);
        },
    },
});
export const { addFormData } = formDataSlice.actions;
export default formDataSlice.reducer;
