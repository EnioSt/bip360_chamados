import express from "express";
import Database from "better-sqlite3";

const router = express.Router();
const db = new Database("database/chamados.db");

// 🔍 Rota de busca com filtros flexíveis
router.get("/search", (req, res) => {
  //http://localhost:3000/chamados/search?fantasia=apte
  const {
    numero,
    fantasia,
    status,
    operador,
    solicitante,
    data_inicio,
    data_fim,
  } = req.query;

  function normalizarData(data) {
    if (!data || data.length !== 10 || !data.includes("-")) return data;
    const [dia, mes, ano] = data.split("-");
    return `${ano}-${mes}-${dia}`;
  }

  const dataInicioNormalizada = normalizarData(data_inicio);
  const dataFimNormalizada = normalizarData(data_fim);

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
    query += " AND status = ?";
    params.push(status);
  }
  if (operador) {
    query += " AND LOWER(operador) LIKE ? LIMIT 10";
    params.push(`%${operador.toLowerCase()}%`);
  }
  if (solicitante) {
    query += " AND LOWER(operador) LIKE ?";
    params.push(`%${solicitante.toLowerCase()}%`);
  }
  if (data_inicio && data_fim) {
    query += " AND data_criacao BETWEEN ? AND ?";
    params.push(dataInicioNormalizada, dataFimNormalizada);
  } else if (data_inicio) {
    query += " AND data_criacao >= ?";
    params.push(dataInicioNormalizada);
  } else if (data_fim) {
    query += " AND data_criacao <= ?";
    params.push(dataFimNormalizada);
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
    res
      .status(500)
      .json({ erro: "Erro ao executar busca", detalhes: err.message });
  }
});
export default router;
