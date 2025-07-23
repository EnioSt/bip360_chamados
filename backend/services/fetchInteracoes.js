import axios from "axios";
import fs from "fs";
import path from "path";

const EXCEL_URL =
  "https://grupochq.desk.ms/Relatorios/powerbi?token=4abf4925f9ea6f0218945d09a2c0864139fc95cb9d5301ec9871be57c4fc555b";

const FILE_PATH = path.resolve("excel", "interacoes.xlsx");

// Garante que a pasta exista
const dir = path.dirname(FILE_PATH);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

export async function baixarExcel() {
  const res = await axios.get(EXCEL_URL, {
    responseType: "arraybuffer",
  });

  fs.writeFileSync(FILE_PATH, res.data);
  console.log("✅ Excel de interações baixado com sucesso.");
}
