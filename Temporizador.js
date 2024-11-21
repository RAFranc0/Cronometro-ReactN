import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Temporizador() {
  const [segundos, setSegundos] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [contador, setContador] = useState(0);

  useEffect(() => {
    // Cria o intervalo para incrementar o contador a cada 1 segundo
    const intervalo = setInterval(() => {
      setContador((prevContador) => {
        if (prevContador === 59) {
          setMinutos((prevMinutos) => prevMinutos + 1);
          return 0;
        }
        return prevContador + 1;
      });
    }, 1000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(intervalo);
  }, []); // O array vazio [] garante que o efeito seja executado apenas uma vez

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Segundos: {segundos}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Adicionar" onPress={() => setSegundos(segundos + 1)} />
        <Button
          title="Reduzir"
          onPress={() => {
            if (segundos > 0) {
              setSegundos(segundos - 1);
            } else {
              setSegundos(0);
            }            
          }} />

      </View>

      <Text style={styles.text}>
        Contador: {contador} | Minutos: {minutos}
      </Text>
      <Button title="Reset" onPress={() => setContador(0)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 20,
  },
});
