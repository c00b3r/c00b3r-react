import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Controller, useForm } from "react-hook-form";
import "./ControlledForm.css";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { addFormData } from "../../store/slice/formDataSlice";
import { validationSchema } from "../../utils/validationSchema";
export default function ControlledForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const countries = useSelector((state) => state.country);
    const { register, handleSubmit, control, formState: { errors }, } = useForm({
        resolver: yupResolver(validationSchema),
        mode: "onChange",
    });
    const onSubmit = (data) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result;
            const accept = data.accept ?? false;
            dispatch(addFormData({
                ...data,
                picture: result,
                accept,
                acceptPassword: "",
            }));
            navigate("/");
        };
        reader.readAsDataURL(data.picture[0]);
    };
    return (_jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "name", children: "Name" }), _jsx("input", { id: "name", type: "text", ...register("name") }), errors.name && _jsx("p", { children: errors.name.message })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "age", children: "Age" }), _jsx("input", { id: "age", type: "number", ...register("age") }), errors.age && _jsx("p", { children: errors.age.message })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "email", children: "Email" }), _jsx("input", { id: "email", type: "text", ...register("email") }), errors.email && _jsx("p", { children: errors.email.message })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "password", children: "Password" }), _jsx("input", { id: "pasword", type: "password", ...register("password") }), errors.password && _jsx("p", { children: errors.password.message })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "confirmPassword", children: "Confirm Password" }), _jsx("input", { id: "confirmPassword", type: "password", ...register("confirmPassword") }), errors.confirmPassword && _jsx("p", { children: errors.confirmPassword.message })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "gender", children: "Gender" }), _jsxs("select", { id: "gender", ...register("gender"), children: [_jsx("option", { value: "male", children: "Male" }), _jsx("option", { value: "female", children: "Female" })] }), errors.gender && _jsx("p", { children: errors.gender.message })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "accept", children: "Acceptm Terms" }), _jsx("input", { id: "accept", type: "checkbox", ...register("accept") }), errors.accept && _jsx("p", { children: errors.accept.message })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "picture", children: "Upload Picture" }), _jsx("input", { id: "picture", type: "file", ...register("picture") }), errors.picture && _jsx("p", { children: errors.picture.message })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "country", children: "Country" }), _jsx(Controller, { name: "country", control: control, render: ({ field }) => _jsx("input", { list: "country-list", ...field }) }), _jsx("datalist", { id: "country-list", children: countries.map((country) => (_jsx("option", { value: country }, country))) }), errors.country && _jsx("p", { children: errors.country.message })] }), _jsx("button", { type: "submit", children: "Submit" })] }));
}
