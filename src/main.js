import { jsx as _jsx } from "react/jsx-runtime";
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
        element: _jsx(MainPage, {}),
    },
    {
        path: "/controlled",
        element: _jsx(ControlledForm, {}),
    },
    {
        path: "/uncontrolled",
        element: _jsx(UncontrolledForm, {}),
    },
]);
createRoot(document.getElementById("root")).render(_jsx(Provider, { store: store, children: _jsx(RouterProvider, { router: router }) }));
