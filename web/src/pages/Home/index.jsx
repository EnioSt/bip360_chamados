import { useNavigate } from "react-router-dom";
import { Container, Content, Title } from "./styles";
import Button from "../../components/Button";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Content>
        <Title>Bem-vindo ao Bip360 chamados</Title>
        <Button onClick={() => navigate("/chamados")}>
          Consultar Chamados
        </Button>
      </Content>
    </Container>
  );
};

export default Home;
