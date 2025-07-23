import { useNavigate } from "react-router-dom";
import {
  Container,
  Content,
  Title,
  FormSection,
  CardSection,
} from "./chamados.js";
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Card from "../../components/Card";

const Chamados = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Content>
          <FormSection>
            <Title>Chamados</Title>
            <Input htmlFor={"Operador"}>Operador</Input>
            <Input htmlFor={"Status"}>Status</Input>
            <Input htmlFor={"Data Inicial"}>Data Inicial</Input>
            <Input htmlFor={"Data Final"}>Data Final</Input>
            <Button onClick={() => navigate("/detalhes")}>Buscar</Button>
          </FormSection>
          <CardSection>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </CardSection>
        </Content>
      </Container>
    </>
  );
};

export default Chamados;
