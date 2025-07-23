import xlsx from "xlsx";

// Lê o Excel e converte para JSON
export function lerExcel() {
  const workbook = xlsx.readFile("excel/interacoes.xlsx");
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(sheet);
  console.log(`📄 Lidas ${data.length} linhas do Excel.`);
  return data; // Retorna array de objetos com os dados da planilha
}
