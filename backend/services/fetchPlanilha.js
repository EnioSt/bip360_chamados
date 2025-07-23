import axios from "axios";
import fs from "fs";

// URL da planilha e header necessário
const EXCEL_URL =
  "https://grupochq.desk.ms/Relatorios/excel?token=3ecce995847e18beca6e85f437a51eec3b987aa6029eb74aea949403388c610b";
const HEADERS = { DeskManager: "6a1356f9696c637522dd477bcb66cfa78721bc5e" };
// Cabeçalho de autenticação

// Baixa o Excel da API
export async function baixarExcel() {
  const res = await axios.get(EXCEL_URL, {
    headers: HEADERS,
    responseType: "arraybuffer", // Recebe dados binários
  });
  fs.writeFileSync("relatorio.xlsx", res.data); //sanva localmente
  console.log("✅ Excel baixado com sucesso.");
}
