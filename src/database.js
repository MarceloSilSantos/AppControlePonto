import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('jornada_trabalho.db');

// Função para criar a tabela
const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS jornada (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data TEXT NOT NULL,
        marca_entrada TEXT,
        marca_saida TEXT,
        marca_almoco_entrada TEXT,
        marca_almoco_saida TEXT,
        total_trabalhado TEXT
      );`
    );
  });
};

// Função para inserir marcações
const insertMarcacoes = (data, marca_entrada, marca_saida, marca_almoco_entrada, marca_almoco_saida, total_trabalhado) => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO jornada (data, marca_entrada, marca_saida, marca_almoco_entrada, marca_almoco_saida, total_trabalhado) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [data, marca_entrada, marca_saida, marca_almoco_entrada, marca_almoco_saida, total_trabalhado]
    );
  });
};

// Função para buscar os registros
const getMarcacoes = (callback) => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM jornada ORDER BY data DESC LIMIT 30;', [], (_, { rows }) => {
      callback(rows._array);
    });
  });
};

export { createTable, getMarcacoes, insertMarcacoes };

