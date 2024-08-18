import * as Yup from "yup";
export const validationSchema = Yup.object().shape({
    name: Yup.string()
        .matches(/^[A-Z][a-z]*$/, "Name must start with an uppercase letter")
        .required("Name is required"),
    age: Yup.number()
        .positive("Age must be a positive number")
        .required("Age is required"),
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain one lowercase letter")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Password need match")
        .required("Confirm password is required"),
    gender: Yup.string().required("Gender is required"),
    accept: Yup.bool().oneOf([true], "need to accept Terms"),
    picture: Yup.mixed()
        .required("Picture is required")
        .test("fileType", "Only image files are allowed", (value) => {
        return (value &&
            value.length > 0 &&
            ["image/jpeg", "image/png"].includes(value[0].type));
    }),
    country: Yup.string().required("Country is required"),
});
