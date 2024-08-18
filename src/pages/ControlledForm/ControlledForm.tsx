import { Controller, useForm } from "react-hook-form";
import "./ControlledForm.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function ControlledForm() {
  const { register, control } = useForm();
  const countries = useSelector((state: RootState) => state.country);
  return (
    <form>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" {...register("name")} />
      </div>
      <div>
        <label htmlFor="age">Age</label>
        <input id="age" type="number" {...register("age")} />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" {...register("email")} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="pasword" type="password" {...register("password")} />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
        />
      </div>
      <div>
        <label htmlFor="gender">Gender</label>
        <select id="gender" {...register("gender")}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div>
        <label htmlFor="accept">Acceptm Terms</label>
        <input id="accept" type="checkbox" {...register("accept")} />
      </div>
      <div>
        <label htmlFor="picture">Upload Picture</label>
        <input id="picture" type="file" {...register("picture")} />
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <Controller
          name="country"
          control={control}
          render={({ field }) => <input list="country-list" {...field} />}
        />
      </div>
      <datalist id="country-list">
        {countries.map((country) => (
          <option key={country} value={country} />
        ))}
      </datalist>
      <button type="submit">Submit</button>
    </form>
  );
}
