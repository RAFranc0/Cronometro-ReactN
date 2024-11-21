import React, { useState, useRef } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

export default function Cronometro() {
  const [segundos, setSegundos] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [contando, setContando] = useState(false);
  const [gravacoes, setGravacoes] = useState([]);
  const referenciaIntervalo = useRef(null); // Referência para o intervalo

  const iniciarPausarCronometro = () => {
    if (contando) {
      clearInterval(referenciaIntervalo.current); // Pausa o cronômetro
    } else {
      referenciaIntervalo.current = setInterval(() => {
        setSegundos((segundosAtual) => {
          if (segundosAtual === 59) {
            setMinutos((minutoAtual) => minutoAtual + 1);
            return 0;
          }
          return segundosAtual + 1;
        });
      }, 1000);
    }
    setContando(!contando); // Alterna entre contando e pausado
  };

  const pararCronometro = () => {
    clearInterval(referenciaIntervalo.current); // Para o cronômetro
    setContando(false);
    setSegundos(0);
    setMinutos(0);
    setGravacoes([]); // Limpa os gravacoes
  };

  const gravar = () => {
    const tempoFormatado = `${String(minutos).padStart(2, '0')}:${String(
      segundos
    ).padStart(2, '0')}`;
    setGravacoes((prevgravacoes) => [
      ...prevgravacoes,
      `#${prevgravacoes.length + 1} ${tempoFormatado}`,
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cronometro}>
        <Text style={styles.cronometroContador}>
          {String(minutos).padStart(2, '0')}:{String(segundos).padStart(2, '0')}
        </Text>
      </View>

      <View style={styles.botoes}>
        <Button
          title={contando ? 'Pausar' : 'Iniciar'}
          onPress={iniciarPausarCronometro}
        />
        <Button title="Parar" onPress={pararCronometro} />
        <Button title="Registrar" onPress={gravar} disabled={!contando} />
      </View>

      <FlatList
        data={gravacoes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.registro}>{item}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  cronometro: {
    width: 200,
    height: 200,
    margin: 10,
    borderWidth: 2,
    borderColor: 'blue',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cronometroContador: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '40%',
    marginBottom: 24,
  },
  registro: {
    fontSize: 16,
    padding: 8,
    backgroundColor: '#ddd',
    marginBottom: 4,
    borderRadius: 4,
    textAlign: 'center',
  },
});
