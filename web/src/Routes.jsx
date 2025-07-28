import GlobalStyle from "./styles/global";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Chamados from "./pages/Chamados";
import Detalhes from "./pages/Detalhes";
import PaginaPadrao from "./pages/PaginaPadrao";

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/" element={<PaginaPadrao />}>
          <Route path="chamados" element={<Chamados />} />
          <Route path="chamados/:numero" element={<Detalhes />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
