import { useNavigate } from "react-router-dom";

const Detalhes = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Detalhes</h2>
      <button onClick={() => navigate("/")}>Home</button>
    </div>
  );
};

export default Detalhes;
