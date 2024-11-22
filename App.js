import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import RegistroJornada from './src/components/RegistroJornada';
import { createTable } from './src/database';

export default function App() {
  useEffect(() => {
    createTable(); // Criar a tabela no banco de dados
  }, []);

  return (
    <View>
      <Text>Controle de Jornada de Trabalho</Text>
      <ScrollView style={styles.container}>
        <RegistroJornada />
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
});

