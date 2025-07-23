import { baixarExcel } from "../services/fetchPlanilha.js";
import { lerExcel } from "../utils/excelParser.js";
import { salvarNoBanco } from "../controllers/chamadosController.js";

async function executar() {
  await baixarExcel();
  const dados = lerExcel();
  salvarNoBanco(dados);
}

executar();
