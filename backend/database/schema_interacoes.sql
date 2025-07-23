CREATE TABLE IF NOT EXISTS interacoes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  numero_chamado TEXT,
  data_acao TEXT,
  hora_inicial TEXT,
  hora_final TEXT,
  descricao TEXT,
  FOREIGN KEY(numero_chamado) REFERENCES chamados_novo(numero_chamado)
);