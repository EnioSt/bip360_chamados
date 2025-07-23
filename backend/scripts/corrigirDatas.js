import Database from "better-sqlite3";

const db = new Database("database/chamados.db");

function converterData(data) {
  if (!data || data.length !== 10) return data; // ignora formatos diferentes
  const [dia, mes, ano] = data.split("-");
  return `${ano}-${mes}-${dia}`;
}

const chamados = db
  .prepare("SELECT id, data_criacao, data_finalizacao FROM chamados")
  .all();

const update = db.prepare(`
  UPDATE chamados
  SET data_criacao = ?, data_finalizacao = ?
  WHERE id = ?
`);

for (const chamado of chamados) {
  const novaCriacao = converterData(chamado.data_criacao);
  const novaFinalizacao = converterData(chamado.data_finalizacao);
  update.run(novaCriacao, novaFinalizacao, chamado.id);
}

console.log("✅ Datas convertidas para formato ISO (YYYY-MM-DD).");
