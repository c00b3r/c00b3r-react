import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/controlled")}>Controlled Form</button>
      <button onClick={() => navigate("/uncontrolled")}>
        Uncontrolled Form
      </button>
    </div>
  );
}
