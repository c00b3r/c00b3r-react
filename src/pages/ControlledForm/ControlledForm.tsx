import { Controller, useForm } from "react-hook-form";
import "./ControlledForm.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { addFormData } from "../../store/slice/formDataSlice";
import { FormData } from "../../interface";
import { validationSchema } from "../../utils/validationSchema";

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
