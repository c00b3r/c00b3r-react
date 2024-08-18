import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "../src/pages/MainPage/MainPage";
import ControlledForm from "./pages/ControlledForm/ControlledForm";
import UncontrolledForm from "./pages/UncontrolledForm/UncontrolledForm";
import { store } from "./store/store";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/controlled",
    element: <ControlledForm />,
  },
  {
    path: "/uncontrolled",
    element: <UncontrolledForm />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
