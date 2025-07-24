import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { CardWrapper } from "./Card";

const Card = ({
  chamado,
  operador,
  status,
  numeroChamado,
  fantasia,
  solicitante,
  resultados,
}) => {
  const navigate = useNavigate();
  return (
    <CardWrapper>
      <h2>Nº do Chamado: {chamado.numero_chamado}</h2>
      <h3>{chamado.categoria}</h3>
      <h4>
        <b>Tipo: </b>
        {chamado.tipo}
      </h4>
      <p>{chamado.solicitante}</p>
      <p>{chamado.descricao}</p>
      <p>
        {chamado.data_criacao} até {chamado.data_finalizacao}
      </p>

      <Button
        onClick={() =>
          navigate(`/chamados/${chamado.numero_chamado}`, {
            state: {
              filtrosAtuais: {
                operador,
                status,
                numeroChamado,
                fantasia,
                solicitante,
              },
              resultadosAtuais: resultados,
            },
          })
        }
      >
        Ver mais
      </Button>
    </CardWrapper>
  );
};

export default Card;
