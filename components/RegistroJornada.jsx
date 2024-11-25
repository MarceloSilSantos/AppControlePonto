import moment from 'moment';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { insertMarcacoes } from '../src/database';
import gerarRelatorioPDF from '../src/utils/relatorio';

const RegistroJornada = () => {
  const [marcacoes, setMarcacoes] = useState({
    entrada: null,
    saida: null,
    almocoEntrada: null,
    almocoSaida: null,
  });

  const registrarMarca = (tipo) => {
    const horarioAtual = moment().format('HH:mm:ss');
    setMarcacoes(prev => ({ ...prev, [tipo]: horarioAtual }));

    // Salvar no banco de dados
    const totalTrabalhado = calcularTempoTrabalhado(marcacoes); // Função para calcular o total de horas trabalhadas
    insertMarcacoes(moment().format('YYYY-MM-DD'), marcacoes.entrada, marcacoes.saida, marcacoes.almocoEntrada, marcacoes.almocoSaida, totalTrabalhado);
  };

  const calcularTempoTrabalhado = (marcacoes) => {
    // Exemplo simplificado, o cálculo real dependeria das marcações
    return '8h00m'; // Retorne o cálculo correto do tempo trabalhado
  };

    const gerarRelatorio = async () => {
      const uri = await gerarRelatorioPDF();
      alert(`Relatório gerado: ${uri}`);
    };

  return (
    <View style={styles.container}>
      
      <Button title="Registrar Entrada" onPress={() => registrarMarca('entrada')} />
      <Button title="Registrar Entrada Almoço" onPress={() => registrarMarca('almocoEntrada')} />
      <Button title="Registrar Saída Almoço" onPress={() => registrarMarca('almocoSaida')} />
      <Button title="Registrar Saída" onPress={() => registrarMarca('saida')} />
      <Button title="Gerar Relatório em PDF" onPress={gerarRelatorio} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default RegistroJornada;
