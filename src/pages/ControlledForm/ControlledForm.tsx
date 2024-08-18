import { Controller, useForm } from "react-hook-form";
import "./ControlledForm.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { addFormData } from "../../store/slice/formDataSlice";
import { FormData } from "../../interface";

const validationSchema = Yup.object().shape({
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
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character",
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password need match")
    .required("Confirm password is required"),
  gender: Yup.string().required("Gender is required"),
  accept: Yup.bool().oneOf([true], "need to accept Terms"),
  picture: Yup.mixed<FileList>()
    .required("Picture is required")
    .test("fileType", "Only image files are allowed", (value) => {
      return (
        value &&
        value.length > 0 &&
        ["image/jpeg", "image/png"].includes(value[0].type)
      );
    }),
  country: Yup.string().required("Country is required"),
});

export default function ControlledForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector((state: RootState) => state.country);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const onSubmit = (data: FormData) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      const accept = data.accept ?? false;
      dispatch(
        addFormData({
          ...data,
          picture: result,
          accept,
          acceptPassword: "",
        }),
      );
      navigate("/");
    };
    reader.readAsDataURL(data.picture[0]);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="age">Age</label>
        <input id="age" type="number" {...register("age")} />
        {errors.age && <p>{errors.age.message}</p>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="pasword" type="password" {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>
      <div>
        <label htmlFor="gender">Gender</label>
        <select id="gender" {...register("gender")}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && <p>{errors.gender.message}</p>}
      </div>
      <div>
        <label htmlFor="accept">Acceptm Terms</label>
        <input id="accept" type="checkbox" {...register("accept")} />
        {errors.accept && <p>{errors.accept.message}</p>}
      </div>
      <div>
        <label htmlFor="picture">Upload Picture</label>
        <input id="picture" type="file" {...register("picture")} />
        {errors.picture && <p>{errors.picture.message}</p>}
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <Controller
          name="country"
          control={control}
          render={({ field }) => <input list="country-list" {...field} />}
        />
        <datalist id="country-list">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
        {errors.country && <p>{errors.country.message}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
