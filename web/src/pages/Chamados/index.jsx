import {
  Container,
  Content,
  Title,
  FormSection,
  CardSection,
} from "./chamados.js";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Card from "../../components/Card";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { api } from "../../services/api.js";
import LoadingOverlay from "../../components/LoadingOverlay/index.jsx";

const Chamados = () => {
  const location = useLocation();
  const [operador, setOperador] = useState("");
  const [status, setStatus] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [numeroChamado, setNumeroChamado] = useState("");
  const [fantasia, setFantasia] = useState("");
  const [solicitante, setSolicitante] = useState("");
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buscou, setBuscou] = useState(false);

  const buscarChamados = async () => {
    setLoading(true);
    setBuscou(true);
    try {
      const filtros = {};

      if (operador) filtros.operador = operador;
      if (status) filtros.status = status;
      if (dataInicio) filtros.data_inicio = dataInicio;
      if (dataFim) filtros.data_fim = dataFim;
      if (numeroChamado) filtros.numero = numeroChamado;
      if (fantasia) filtros.fantasia = fantasia;
      if (solicitante) filtros.solicitante = solicitante;

      const res = await api.get("/chamados/search", {
        params: filtros,
      });

      setResultados(res.data);
    } catch (err) {
      console.error("Erro ao buscar chamados", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.state?.resultadosAtuais) {
      setResultados(location.state.resultadosAtuais);
      setOperador(location.state.filtrosAtuais?.operador || "");
      setStatus(location.state.filtrosAtuais?.status || "");
      setDataInicio(location.state.filtrosAtuais?.data_inicio || "");
      setDataFim(location.state.filtrosAtuais?.data_fim || "");
      setNumeroChamado(location.state.filtrosAtuais?.numeroChamado || "");
      setFantasia(location.state.filtrosAtuais?.fantasia || "");
      setSolicitante(location.state.filtrosAtuais?.solicitante || "");
    }
  }, []);

  return (
    <>
      {loading && <LoadingOverlay />}
      <Container>
        <Content>
          <FormSection>
            <Title>Chamados</Title>
            <Input
              htmlFor="operador"
              type="text"
              value={operador}
              onChange={(e) => setOperador(e.target.value)}
            >
              Operador
            </Input>
            <Input
              htmlFor={"Status"}
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              Status
            </Input>
            <Input
              htmlFor={"numeroChamado"}
              type="text"
              value={numeroChamado}
              onChange={(e) => setNumeroChamado(e.target.value)}
            >
              Numero
            </Input>
            <Input
              htmlFor={"Fantasia"}
              type="text"
              value={fantasia}
              onChange={(e) => setFantasia(e.target.value)}
            >
              Empresa
            </Input>
            <Input
              htmlFor={"Solicitante"}
              type="text"
              value={solicitante}
              onChange={(e) => setSolicitante(e.target.value)}
            >
              Solicitante
            </Input>
            <Input
              htmlFor={"Data Inicial"}
              type="text"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
            >
              Data Inicial
            </Input>
            <Input
              htmlFor={"Data Final"}
              type="text"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
            >
              Data Final
            </Input>
            <Button onClick={buscarChamados}>Buscar</Button>
          </FormSection>
          <CardSection>
            <p>{resultados.length} chamados encontrados</p>
            <br />
            {resultados.length > 0
              ? resultados.map((chamado) => (
                  <Card
                    key={chamado.numero_chamado}
                    chamado={chamado}
                    operador={operador}
                    status={status}
                    numeroChamado={numeroChamado}
                    fantasia={fantasia}
                    solicitante={solicitante}
                    resultados={resultados}
                  />
                ))
              : buscou &&
                resultados.length === 0 && <p>Nenhum chamado encontrado.</p>}
          </CardSection>
        </Content>
      </Container>
    </>
  );
};

export default Chamados;
