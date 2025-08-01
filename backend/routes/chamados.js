import express from "express";
import Database from "better-sqlite3";

const router = express.Router();
const db = new Database("database/chamados.db");

// 🔍 Rota de autocomplete para campo fantasia
router.get("/fantasias", (req, res) => {
  const { query } = req.query;

  try {
    const stmt = db.prepare(`
      SELECT DISTINCT fantasia 
      FROM chamados_novo 
      WHERE LOWER(fantasia) LIKE ? 
      LIMIT 10
    `);
    const resultados = stmt.all(`%${query.toLowerCase()}%`);
    const nomes = resultados.map((r) => r.fantasia);
    res.json(nomes);
  } catch (err) {
    console.error("Erro ao buscar fantasias:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// 🔍 Rota de autocomplete para campo solicitante
router.get("/solicitantes", (req, res) => {
  const { query } = req.query;

  try {
    const stmt = db.prepare(`
      SELECT DISTINCT solicitante 
      FROM chamados_novo 
      WHERE LOWER(solicitante) LIKE ? 
      LIMIT 10
    `);
    const resultados = stmt.all(`%${query.toLowerCase()}%`);
    const nomes = resultados.map((r) => r.solicitante);
    res.json(nomes);
  } catch (err) {
    console.error("Erro ao buscar solicitantes:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// 🔍 Rota de busca com filtros flexíveis
router.get("/search", (req, res) => {
  const {
    numero,
    fantasia,
    status,
    operador,
    solicitante,
    data_inicio,
    data_fim,
  } = req.query;

  let query = "SELECT * FROM chamados_novo WHERE 1=1";
  const params = [];

  if (numero) {
    query += " AND numero_chamado = ?";
    params.push(numero);
  }
  if (fantasia) {
    query += " AND LOWER(fantasia) LIKE ?";
    params.push(`%${fantasia.toLowerCase()}%`);
  }
  if (status) {
    query += " AND LOWER(status) LIKE ?";
    params.push(`%${status.toLowerCase()}%`);
  }
  if (operador) {
    query += " AND LOWER(operador) LIKE ?";
    params.push(`%${operador.toLowerCase()}%`);
  }
  if (solicitante) {
    query += " AND LOWER(solicitante) LIKE ?";
    params.push(`%${solicitante.toLowerCase()}%`);
  }

  if (data_inicio && data_fim) {
    query += `
      AND substr(data_criacao, 7, 4) || '-' || substr(data_criacao, 4, 2) || '-' || substr(data_criacao, 1, 2)
      BETWEEN ? AND ?
    `;
    params.push(data_inicio, data_fim);
  } else if (data_inicio) {
    query += `
      AND substr(data_criacao, 7, 4) || '-' || substr(data_criacao, 4, 2) || '-' || substr(data_criacao, 1, 2)
      >= ?
    `;
    params.push(data_inicio);
  } else if (data_fim) {
    query += `
      AND substr(data_criacao, 7, 4) || '-' || substr(data_criacao, 4, 2) || '-' || substr(data_criacao, 1, 2)
      <= ?
    `;
    params.push(data_fim);
  }

  try {
    const resultados = db.prepare(query).all(...params);

    for (const chamado of resultados) {
      const interacoes = db
        .prepare(
          "SELECT * FROM interacoes WHERE numero_chamado = ? ORDER BY data_acao, hora_inicial"
        )
        .all(chamado.numero_chamado);

      chamado.interacoes = interacoes;
    }

    res.json(resultados);
  } catch (err) {
    res.status(500).json({
      erro: "Erro ao executar busca",
      detalhes: err.message,
    });
  }
});

export default router;
