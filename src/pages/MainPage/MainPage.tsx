import { useNavigate } from "react-router-dom";
import "./MainPage.css";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

export default function MainPage() {
  const navigate = useNavigate();
  const formData = useSelector((state: RootState) => state.formData);
  return (
    <div className="main-container">
      <div className="button-container">
        <button onClick={() => navigate("/controlled")}>Controlled Form</button>
        <button onClick={() => navigate("/uncontrolled")}>
          Uncontrolled Form
        </button>
      </div>
      <div className="data-container">
        {formData
          ? formData.map((item) => {
              return (
                <div className="data-item" key={item.name}>
                  <span className="data-item_name">{item.name}</span>
                  <img src={item.picture} alt="page from form" width={100} />
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}
