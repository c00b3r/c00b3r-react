import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { addFormData } from "../../store/slice/formDataSlice";
import { validationSchema } from "../../utils/validationSchema";

export default function UncontrolledForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector((state: RootState) => state.country);

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const acceptRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);

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
        errors.inner.forEach(
          (error: { path: string; message: string | null }) => {
            const element = document.getElementById(`${error.path}Error`);
            if (element) {
              element.textContent = error.message || "";
              element.classList.add("error");
            }
          },
        );
        throw new Error("Validation failed");
      });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validateForm()
      .then((data) => {
        const reader = new FileReader();
        if (data.picture && data.picture[0]) {
          reader.onloadend = () => {
            const result = reader.result as string;
            dispatch(
              addFormData({
                name: data.name || "",
                age: data.age || 0,
                email: data.email || "",
                password: data.password || "",
                gender: data.gender || "",
                accept: data.accept ?? false,
                picture: result,
                country: data.country || "",
                acceptPassword: "", 
              }),
            );
            navigate("/");
          };
          reader.readAsDataURL(data.picture[0]);
        }
      })
      .catch((error) => {
        console.error("Form submission error:", error);
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" ref={nameRef} />
        <p id="nameError" className="error"></p>
      </div>
      <div>
        <label htmlFor="age">Age</label>
        <input id="age" type="number" ref={ageRef} />
        <p id="ageError" className="error"></p>
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" ref={emailRef} />
        <p id="emailError" className="error"></p>
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" ref={passwordRef} />
        <p id="passwordError" className="error"></p>
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input id="confirmPassword" type="password" ref={confirmPasswordRef} />
        <p id="confirmPasswordError" className="error"></p>
      </div>
      <div>
        <label htmlFor="gender">Gender</label>
        <select id="gender" ref={genderRef}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <p id="genderError" className="error"></p>
      </div>
      <div>
        <label htmlFor="accept">Accept Terms</label>
        <input id="accept" type="checkbox" ref={acceptRef} />
        <p id="acceptError" className="error"></p>
      </div>
      <div>
        <label htmlFor="picture">Upload Picture</label>
        <input id="picture" type="file" ref={pictureRef} />
        <p id="pictureError" className="error"></p>
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <select id="country" ref={countryRef}>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <p id="countryError" className="error"></p>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
