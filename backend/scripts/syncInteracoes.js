import { baixarExcel } from "../services/fetchInteracoes.js"; // você pode reaproveitar fetchPlanilha.js se quiser
import { lerExcel } from "../utils/excelInteracoes.js";
import { salvarInteracoes } from "../controllers/interacoesController.js";

async function executar() {
  await baixarExcel(); // faz download do Excel de interações
  const dados = lerExcel(); // transforma em array de objetos
  salvarInteracoes(dados); // insere no banco
}

executar();
