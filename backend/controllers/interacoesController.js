import fs from "fs";
import Database from "better-sqlite3";
import { excelDateToJSDate, excelTimeToHHMMSS } from "../utils/helpers.js";

// conecta ao banco e cria a tabela se não existir
const db = new Database("database/chamados.db");
const schema = fs.readFileSync("database/schema_interacoes.sql", "utf8");
db.exec(schema);

let contador = 0;

export function salvarInteracoes(dados) {
  const insert = db.prepare(`
    INSERT INTO interacoes (
      numero_chamado, data_acao, hora_inicial, hora_final, descricao
    ) VALUES (?, ?, ?, ?, ?)
  `);

  console.log("🧠 Colunas detectadas:");
  console.log(Object.keys(dados[0]));

  for (const row of dados) {
    if (contador < 5) {
      console.log("🔍 Registro lido:", {
        numero_chamado: row["Nº Chamado"],
        data_acao: row["Data de Criação da Ação"],
        hora_inicial: row["Hora Inicial"],
        hora_final: row["Hora Final"],
        descricao: row["Descrição"],
      });
      contador++;
    }

    insert.run([
      row["Nº Chamado"] || null,
      excelDateToJSDate(row["Data de Criação da Ação"]),
      row["Hora Inicial"] || null,
      row["Hora Final"] || null,
      row["Descrição"] || null,
    ]);
  }

  console.log("✅ Interações inseridas com sucesso.");
}
