import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addFormData } from "../../store/slice/formDataSlice";
import { validationSchema } from "../../utils/validationSchema";
export default function UncontrolledForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const countries = useSelector((state) => state.country);
    const nameRef = useRef(null);
    const ageRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const genderRef = useRef(null);
    const acceptRef = useRef(null);
    const pictureRef = useRef(null);
    const countryRef = useRef(null);
    const validateForm = () => {
        const formData = {
            name: nameRef.current?.value,
            age: parseInt(ageRef.current?.value || "", 10),
            email: emailRef.current?.value,
            password: passwordRef.current?.value,
            confirmPassword: confirmPasswordRef.current?.value,
            gender: genderRef.current?.value,
            accept: acceptRef.current?.checked ?? false,
            picture: pictureRef.current?.files,
            country: countryRef.current?.value,
        };
        document.querySelectorAll(".error").forEach((el) => (el.textContent = ""));
        return validationSchema
            .validate(formData, { abortEarly: false })
            .then(() => formData)
            .catch((errors) => {
            errors.inner.forEach((error) => {
                const element = document.getElementById(`${error.path}Error`);
                if (element) {
                    element.textContent = error.message || "";
                    element.classList.add("error");
                }
            });
            throw new Error("Validation failed");
        });
    };
    const onSubmit = (event) => {
        event.preventDefault();
        validateForm()
            .then((data) => {
            const reader = new FileReader();
            if (data.picture && data.picture[0]) {
                reader.onloadend = () => {
                    const result = reader.result;
                    dispatch(addFormData({
                        name: data.name || "",
                        age: data.age || 0,
                        email: data.email || "",
                        password: data.password || "",
                        gender: data.gender || "",
                        accept: data.accept ?? false,
                        picture: result,
                        country: data.country || "",
                        acceptPassword: "",
                    }));
                    navigate("/");
                };
                reader.readAsDataURL(data.picture[0]);
            }
        })
            .catch((error) => {
            console.error("Form submission error:", error);
        });
    };
    return (_jsxs("form", { onSubmit: onSubmit, children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "name", children: "Name" }), _jsx("input", { id: "name", type: "text", ref: nameRef }), _jsx("p", { id: "nameError", className: "error" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "age", children: "Age" }), _jsx("input", { id: "age", type: "number", ref: ageRef }), _jsx("p", { id: "ageError", className: "error" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "email", children: "Email" }), _jsx("input", { id: "email", type: "text", ref: emailRef }), _jsx("p", { id: "emailError", className: "error" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "password", children: "Password" }), _jsx("input", { id: "password", type: "password", ref: passwordRef }), _jsx("p", { id: "passwordError", className: "error" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "confirmPassword", children: "Confirm Password" }), _jsx("input", { id: "confirmPassword", type: "password", ref: confirmPasswordRef }), _jsx("p", { id: "confirmPasswordError", className: "error" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "gender", children: "Gender" }), _jsxs("select", { id: "gender", ref: genderRef, children: [_jsx("option", { value: "male", children: "Male" }), _jsx("option", { value: "female", children: "Female" })] }), _jsx("p", { id: "genderError", className: "error" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "accept", children: "Accept Terms" }), _jsx("input", { id: "accept", type: "checkbox", ref: acceptRef }), _jsx("p", { id: "acceptError", className: "error" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "picture", children: "Upload Picture" }), _jsx("input", { id: "picture", type: "file", ref: pictureRef }), _jsx("p", { id: "pictureError", className: "error" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "country", children: "Country" }), _jsx("select", { id: "country", ref: countryRef, children: countries.map((country) => (_jsx("option", { value: country, children: country }, country))) }), _jsx("p", { id: "countryError", className: "error" })] }), _jsx("button", { type: "submit", children: "Submit" })] }));
}
