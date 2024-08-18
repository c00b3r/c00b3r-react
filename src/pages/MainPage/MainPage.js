import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import "./MainPage.css";
import { useSelector } from "react-redux";
export default function MainPage() {
    const navigate = useNavigate();
    const formData = useSelector((state) => state.formData);
    return (_jsxs("div", { className: "main-container", children: [_jsxs("div", { className: "button-container", children: [_jsx("button", { onClick: () => navigate("/controlled"), children: "Controlled Form" }), _jsx("button", { onClick: () => navigate("/uncontrolled"), children: "Uncontrolled Form" })] }), _jsx("div", { className: "data-container", children: formData
                    ? formData.map((item) => {
                        return (_jsxs("div", { className: "data-item", children: [_jsx("span", { className: "data-item_name", children: item.name }), _jsx("img", { src: item.picture, alt: "page from form", width: 100 })] }, item.name));
                    })
                    : null })] }));
}
