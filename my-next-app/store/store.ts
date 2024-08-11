import { configureStore } from "@reduxjs/toolkit";
import selectedItemSlice from "./slices/selectedItemsSlice";
import { starWarsApi } from "./thunks/starWarsApi";
const store = configureStore({
  reducer: {
    selectedItem: selectedItemSlice,
    [starWarsApi.reducerPath]: starWarsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(starWarsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
