import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { CardWrapper } from "./Card";

const Card = () => {
  const navigate = useNavigate();
  return (
    <CardWrapper>
      <h2>Nº do Chamado: 0525-000006</h2>
      <h3>Categoria</h3>
      <h4>Tipo</h4>
      <p>
        É simplesmente uma simulação de texto da indústria tipográfica e de
        impressos, e vem sendo utilizado desde o século XVI, quando um impressor
        desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um
        livro de modelos de tipos.
      </p>
      <p>23-07/2025 até 28-08-2025</p>
      <Button onClick={() => navigate("/detalhes")}>Ver mais</Button>
    </CardWrapper>
  );
};

export default Card;
