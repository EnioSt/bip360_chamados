import Menu from "../../components/Menu";
import Footer from "../../components/Footer";
import { Outlet } from "react-router-dom";

const PaginaPadrao = () => {
  return (
    <>
      <Menu />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PaginaPadrao;
