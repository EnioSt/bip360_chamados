import {
  Container,
  Content,
  Title,
  FormSection,
  CardSection,
  SelectDiv,
  ButtonDiv,
  CardHeader,
  Paginacao,
} from "./chamados.js";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Card from "../../components/Card";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { api } from "../../services/api.js";
import LoadingOverlay from "../../components/LoadingOverlay/index.jsx";
import DateInput from "../../components/DateInput/index.jsx";
import SelectInput from "../../components/SelectInput/index.jsx";
import AutoCompleteInput from "../../components/AutoCompleteInput/index.jsx";

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
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [ordemInvertida, setOrdemInvertida] = useState(false);

  const chamadosPorPagina = 30;

  const indexInicial = (paginaAtual - 1) * chamadosPorPagina;
  const indexFinal = indexInicial + chamadosPorPagina;

  //const chamadosPaginados = resultados.slice(indexInicial, indexFinal);
  const cardsRef = useRef(null);

  const totalPaginas = Math.ceil(resultados.length / chamadosPorPagina);

  const resultadosOrdenados = ordemInvertida
    ? [...resultados].reverse()
    : resultados;

  const chamadosPaginados = resultadosOrdenados.slice(indexInicial, indexFinal);

  const alternarOrdem = () => {
    setOrdemInvertida((prev) => !prev);
    scrollToTop();
  };

  const scrollToTop = () => {
    if (cardsRef.current) {
      cardsRef.current.scrollTop = 0; // rola o conteúdo interno da div
    }
  };

  const buscarChamados = async () => {
    setLoading(true);
    setBuscou(true);
    setPaginaAtual(1);
    try {
      const filtros = {};
      const filtrosAtuais = [];

      if (operador) filtros.operador = operador;
      if (status) filtros.status = status;
      if (dataInicio) filtros.data_inicio = dataInicio;
      if (dataFim) filtros.data_fim = dataFim;
      if (numeroChamado) filtros.numero = numeroChamado;
      if (fantasia) filtros.fantasia = fantasia;
      if (solicitante) filtros.solicitante = solicitante;

      const res = await api.get("/chamados/search", {
        params: filtros,
        filtrosAtuais,
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
      setNumeroChamado(location.state.filtrosAtuais?.numero || "");
      setFantasia(location.state.filtrosAtuais?.fantasia || "");
      setSolicitante(location.state.filtrosAtuais?.solicitante || "");
      setPaginaAtual(location.state.paginaAnterior || 1); // ✅ aqui!
    }
  }, []);

  const limparFiltrosEChamados = () => {
    setOperador("");
    setStatus("");
    setDataInicio("");
    setDataFim("");
    setNumeroChamado("");
    setFantasia("");
    setSolicitante("");
    setResultados([]);
    setBuscou(false);
  };

  return (
    <>
      {loading && <LoadingOverlay />}
      <Container>
        <Content>
          <FormSection>
            <Title>Chamados</Title>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                buscarChamados();
              }}
              noValidate
            >
              <SelectDiv>
                <SelectInput
                  htmlFor="Operador"
                  value={operador}
                  onChange={(e) => setOperador(e.target.value)}
                >
                  <option value="">Selecione</option>
                  <option value="Enio">Enio</option>
                  <option value="Pablo">Pablo</option>
                  <option value="Daniel">Daniel</option>
                  <option value="Suporte Chq">Suporte Chq</option>
                  <option value="Suporte Protheus">Suporte Protheus</option>
                </SelectInput>

                <SelectInput
                  htmlFor="Status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Selecione</option>
                  <option value="Resolvido">Resolvido</option>
                  <option value="Cancelado">Cancelado</option>
                </SelectInput>
              </SelectDiv>

              <Input
                htmlFor={"numeroChamado"}
                type="text"
                value={numeroChamado}
                onChange={(e) => setNumeroChamado(e.target.value)}
              >
                Numero
              </Input>
              <AutoCompleteInput
                endpoint="/chamados/fantasias"
                value={fantasia}
                onChange={(e) => setFantasia(e.target.value)}
                htmlFor="fantasia"
              >
                Empresa
              </AutoCompleteInput>
              <AutoCompleteInput
                endpoint="/chamados/solicitantes"
                value={solicitante}
                onChange={(e) => setSolicitante(e.target.value)}
                htmlFor="solicitante"
              >
                Solicitante
              </AutoCompleteInput>
              {/* <Input
                htmlFor={"Solicitante"}
                type="text"
                value={solicitante}
                onChange={(e) => setSolicitante(e.target.value)}
              >
                Solicitante
              </Input> */}
              <SelectDiv>
                <DateInput
                  htmlFor={"Data Inicial"}
                  type="text"
                  value={dataInicio}
                  onChange={(e) => setDataInicio(e.target.value)}
                >
                  Data Inicial
                </DateInput>
                <DateInput
                  htmlFor={"Data Final"}
                  type="text"
                  value={dataFim}
                  onChange={(e) => setDataFim(e.target.value)}
                >
                  Data Final
                </DateInput>
              </SelectDiv>
              <ButtonDiv>
                <Button type="submit" onClick={buscarChamados}>
                  Buscar
                </Button>
              </ButtonDiv>
            </form>
          </FormSection>
          <CardSection ref={cardsRef}>
            <CardHeader>
              <p>
                {resultados.length === 0
                  ? "0 chamado encontrado"
                  : resultados.length === 1
                  ? "1 chamado encontrado"
                  : `${resultados.length} chamados encontrados`}
              </p>

              <div>
                {(resultados.length > 0 || buscou) && (
                  <>
                    <button
                      onClick={alternarOrdem}
                      title="Inverter ordem dos chamados"
                    >
                      🔃 <span className="btn-text">Inverter ordem</span>
                    </button>

                    <button
                      onClick={limparFiltrosEChamados}
                      title="Limpar filtros e resultados"
                    >
                      ❌ <span className="btn-text">Limpar</span>
                    </button>
                  </>
                )}
              </div>
            </CardHeader>
            {resultados.length > 0
              ? chamadosPaginados.map((chamado) => (
                  <Card
                    key={chamado.numero_chamado}
                    chamado={chamado}
                    operador={operador}
                    status={status}
                    numeroChamado={numeroChamado}
                    fantasia={fantasia}
                    solicitante={solicitante}
                    dataInicio={dataInicio}
                    dataFim={dataFim}
                    resultados={resultados}
                    paginaAtual={paginaAtual}
                  />
                ))
              : buscou &&
                resultados.length === 0 && <p>Nenhum chamado encontrado.</p>}
            {resultados.length > chamadosPorPagina && (
              <Paginacao className="paginacao">
                <button
                  onClick={() => {
                    setPaginaAtual(1);
                    scrollToTop();
                  }}
                  disabled={paginaAtual === 1}
                >
                  ⏮ Primeira
                </button>

                <button
                  disabled={paginaAtual === 1}
                  onClick={() => {
                    setPaginaAtual(paginaAtual - 1);
                    scrollToTop();
                  }}
                >
                  ←
                </button>

                {Array.from({ length: totalPaginas }, (_, i) => i + 1)
                  .filter((num) => {
                    if (totalPaginas <= 10) return true;
                    if (paginaAtual <= 6) return num <= 10;
                    if (paginaAtual >= totalPaginas - 4)
                      return num >= totalPaginas - 9;
                    return Math.abs(num - paginaAtual) <= 4;
                  })
                  .map((num) => (
                    <button
                      key={num}
                      onClick={() => {
                        setPaginaAtual(num);
                        scrollToTop();
                      }}
                      style={{
                        fontWeight: num === paginaAtual ? "bold" : "normal",
                        backgroundColor:
                          num === paginaAtual ? "#003366" : "white",
                        color: num === paginaAtual ? "white" : "#003366",
                        border: "1px solid #003366",
                        borderRadius: "4px",
                        padding: "4px 8px",
                        cursor: "pointer",
                      }}
                    >
                      {num}
                    </button>
                  ))}

                <button
                  disabled={paginaAtual === totalPaginas}
                  onClick={() => {
                    setPaginaAtual(paginaAtual + 1);
                    scrollToTop();
                  }}
                >
                  →
                </button>

                <button
                  onClick={() => {
                    setPaginaAtual(totalPaginas);
                    scrollToTop();
                  }}
                  disabled={paginaAtual === totalPaginas}
                >
                  ⏭ Última
                </button>
              </Paginacao>
            )}
          </CardSection>
        </Content>
      </Container>
    </>
  );
};

export default Chamados;
