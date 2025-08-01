import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./Routes.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
