import { useNavigate } from "react-router-dom";
import "./MainPage.css";

export default function MainPage() {
  const navigate = useNavigate();
  return (
    <div className="button-container">
      <button onClick={() => navigate("/controlled")}>Controlled Form</button>
      <button onClick={() => navigate("/uncontrolled")}>
        Uncontrolled Form
      </button>
    </div>
  );
}
