import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import {
  Container,
  Header,
  InfoBlock,
  Section,
  SubTitle,
  Paragraph,
} from "./Detalhes.js";
import ArrowBack from "../../components/ArrowBack/index.jsx";
import { useLocation } from "react-router-dom";

const Detalhes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { numero } = useParams();
  const [chamado, setChamado] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarDetalhes = async () => {
      try {
        const res = await api.get("/chamados/search", {
          params: { numero },
        });
        setChamado(res.data[0]); // retorna um array, pegamos o primeiro
      } catch (err) {
        console.error("Erro ao buscar detalhes do chamado", err);
      } finally {
        setLoading(false);
      }
    };

    buscarDetalhes();
  }, [numero]);

  if (loading)
    return (
      <Container>
        <p>Carregando...</p>
      </Container>
    );
  if (!chamado)
    return (
      <Container>
        <p>Chamado não encontrado.</p>
      </Container>
    );

  return (
    <Container>
      <ArrowBack
        onClick={() =>
          navigate("/chamados", {
            state: location.state, // ✅ envia os dados de volta
          })
        }
      />

      <Header>
        <h2>{chamado.assunto}</h2>
        <h3>Chamado Nº: {chamado.numero_chamado}</h3>
        <h4>
          Período: {chamado.data_criacao} até {chamado.data_finalizacao}
        </h4>
      </Header>

      <InfoBlock>
        <h5>{chamado.fantasia}</h5>
        <Paragraph>
          <b>Status:</b> {chamado.status}
        </Paragraph>
        <Paragraph>
          <b>Categoria:</b> {chamado.categoria_subcategoria}
        </Paragraph>
        <Paragraph>
          <b>Tipo:</b> {chamado.tipo}
        </Paragraph>
        <Paragraph>
          <b>Causa:</b> {chamado.causa}
        </Paragraph>
        <Paragraph>
          <b>Operador:</b> {chamado.operador}
        </Paragraph>
        <Paragraph>
          <b>Horas Tarifadas:</b> {chamado.horas_tarifadas}
        </Paragraph>
        <Paragraph>
          <b>Solicitante:</b> {chamado.solicitante}
        </Paragraph>
        <Paragraph>
          <b>Departamento:</b> {chamado.departamento}
        </Paragraph>
      </InfoBlock>

      <Section>
        <SubTitle>Descrição</SubTitle>
        <Paragraph>{chamado.descricao}</Paragraph>
        <Paragraph>
          <b>Tempo até o atendimento:</b> {chamado.tempo_ate_atendimento}
        </Paragraph>
        <Paragraph>
          <b>Descrição da solução:</b> {chamado.descricao_ultima_acao}
        </Paragraph>
        <Paragraph>
          <b>Solução:</b> {chamado.solucao}
        </Paragraph>
      </Section>

      {chamado.interacoes?.length > 0 && (
        <Section>
          <SubTitle>Outras interações durante o atendimento</SubTitle>
          {chamado.interacoes.map((interacao, index) => (
            <Paragraph key={index}>
              <b>Interação {index + 1}:</b> {interacao.descricao}
            </Paragraph>
          ))}
        </Section>
      )}
    </Container>
  );
};

export default Detalhes;
