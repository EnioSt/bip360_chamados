import fs from "fs";
import Database from "better-sqlite3"; //driver SQLite moderno e rápido com suporte a comandos preparados.
import { excelDateToJSDate, excelTimeToHHMMSS } from "../utils/helpers.js";

// Conecta ao SQLite e cria a tabela se não existir
const db = new Database("database/chamados.db");

// Lê o conteúdo do schema.sql e executa no banco
const schema = fs.readFileSync("database/schema.sql", "utf8");
db.exec(schema); // Executa o script de criação

// Inserção ou atualização no banco (UPSERT)
export function salvarNoBanco(dados) {
  const upsert = db.prepare(`
    INSERT INTO chamados (
      fantasia, data_criacao_mes, numero_chamado, data_criacao, data_finalizacao,
      assunto, status, categoria_subcategoria, tipo, causa, grupo, operador,
      horas_tarifadas, solicitante, departamento, fcr,
      prioridade, pesquisa_respondida, hora_criacao, descricao,
      tempo_ate_atendimento, descricao_ultima_acao, solucao
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(numero_chamado) DO UPDATE SET
      fantasia=excluded.fantasia,
      data_criacao_mes=excluded.data_criacao_mes,
      data_criacao=excluded.data_criacao,
      data_finalizacao=excluded.data_finalizacao,
      assunto=excluded.assunto,
      status=excluded.status,
      categoria_subcategoria=excluded.categoria_subcategoria,
      tipo=excluded.tipo,
      causa=excluded.causa,
      grupo=excluded.grupo,
      operador=excluded.operador,
      horas_tarifadas=excluded.horas_tarifadas,
      solicitante=excluded.solicitante,
      departamento=excluded.departamento,
      fcr=excluded.fcr,
      prioridade=excluded.prioridade,
      pesquisa_respondida=excluded.pesquisa_respondida,
      hora_criacao=excluded.hora_criacao,
      descricao=excluded.descricao,
      tempo_ate_atendimento=excluded.tempo_ate_atendimento,
      descricao_ultima_acao=excluded.descricao_ultima_acao,
      solucao=excluded.solucao
  `);

  for (const row of dados) {
    upsert.run([
      row["Fantasia"] || null,
      row["Data de Criação (Somente Ano - Mes)"] || null,
      row["Nº Chamado"] || null,
      excelDateToJSDate(row["Data de Criação"]),
      excelDateToJSDate(row["Data de Finalização"]),
      row["Assunto"] || null,
      row["Nome do Status"] || null,
      row["Categoria - SubCategoria"] || null,
      row["Tipo"] || null,
      row["Nome da Causa"] || null,
      row["Nome do Grupo"] || null,
      row["Nome Completo do Operador"] || null,
      excelTimeToHHMMSS(row["Total de Horas Tarifadas"]),
      row["Nome Completo do Solicitante"] || null,
      row["Nome do Departamento"] || null,
      row["First Call Resolution"] || null,
      row["Nome da Prioridade"] || null,
      row["A Pesquisa de Satisfação deste Chamado já foi respondida"] || null,
      row["Hora da Criação (Somente Hora)"] || null,
      row["Descrição"] || null,
      excelTimeToHHMMSS(row["Tempo da Abertura até o Atendimento"]),
      row["Descrição da Última Ação"] || null,
      row["Solução Realizada"] || null,
    ]);
  }

  console.log("✅ Dados inseridos/atualizados com sucesso no banco.");
}
