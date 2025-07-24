import { Container, ContainerNav, Logo, Nav } from "./Menu";
import LogoBip from "../../assets/bip_360_logo.jpg";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <h1 onClick={() => navigate("/")}>
        <Logo src={LogoBip} alt="Logo Bip" />
      </h1>
      <ContainerNav>
        <Nav href="/">Home</Nav>
        <Nav href="/chamados">Chamados</Nav>
      </ContainerNav>
    </Container>
  );
};

export default Menu;
