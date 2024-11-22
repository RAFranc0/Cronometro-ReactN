import React, { useState, useRef } from 'react';
import { View, Text, Button, Pressable, FlatList, StyleSheet, StatusBar } from 'react-native';

export default function Cronometro() {
  const [segundos, setSegundos] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [contando, setContando] = useState(false);
  const [gravacoes, setGravacoes] = useState([]);
  const referenciaIntervalo = useRef(null);

  const iniciarPausarCronometro = () => {
    if (contando) {
      clearInterval(referenciaIntervalo.current);
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
    setContando(!contando);
  };

  const pararCronometro = () => {
    clearInterval(referenciaIntervalo.current);
    setContando(false);
    setSegundos(0);
    setMinutos(0);
    setGravacoes([]);
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
      <StatusBar barStyle="dark-content" backgroundColor="#000" />
      <View>
        <Text>CronometroApp</Text>
      </View>
      <View style={styles.cronometro}>
        <Text style={styles.cronometroContador}>
          {String(minutos).padStart(2, '0')}:{String(segundos).padStart(2, '0')}
        </Text>
      </View>

      <View style={styles.botoes}>
        <Pressable style={styles.btn} onPress={iniciarPausarCronometro}>
          <Text style={styles.btnText}>{contando ? 'Pausar' : 'Iniciar'}</Text>
        </Pressable>

        <Pressable style={styles.btn} onPress={pararCronometro}>
        <Text style={styles.btnText}>Parar</Text>
      </Pressable>

      <Pressable style={[styles.btn, !contando && styles.btnDisabled]} onPress={gravar} disabled={!contando}>
        <Text style={[styles.btnText, !contando && styles.btnTextDisabled]}>Gravar</Text>
      </Pressable>
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1f1f1f',
    borderWidth: 1,
    borderColor: 'red'
  },
  cronometro: {
    width: 200,
    height: 200,
    margin: 100,
    borderWidth: 2,
    borderColor: '#00ff00',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cronometroContador: {
    color: '#fff',
    fontSize: 48,
    fontWeight: 'bold',
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 24,
    borderWidth: 1,
  },
  btn: {
    borderColor: '#00ff00', 
    borderWidth: 1, 
    borderRadius: 8,
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    backgroundColor: '#07ffde',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  btnDisabled: {
    borderColor: '#c7c7c7', 
    borderWidth: 1, 
    borderRadius: 8,
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    backgroundColor: 'transparent',
  },

  btnTextDisabled: {
    color: '#c7c7c7',
    fontSize: 16,
    fontWeight: 'bold',
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
