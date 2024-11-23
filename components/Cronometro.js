import React, { useState, useRef } from 'react';
import { View, Text, Pressable, FlatList, StatusBar } from 'react-native';
import styles from './Cronometro.styles.js';

export default function Cronometro() {
  const [segundos, setSegundos] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [contando, setContando] = useState(false);
  const [gravacoes, setGravacoes] = useState([]);
  const referenciaIntervalo = useRef(null);
  const flatListRef = useRef();

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
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#000" />
      <View>
        <Text style={styles.tituloCronometro}>CronometroApp</Text>
        <Text style={styles.textoTopoPagina}>Atividade 2 - Módulo III</Text>
      </View>

      <View style={styles.cronometro}>
        <Text style={styles.cronometroContador}>
          {String(minutos).padStart(2, '0')}:{String(segundos).padStart(2, '0')}
        </Text>
      </View>

      <View style={styles.listaDeGravacoes}>
        <Text style={styles.textoTopoPagina}>Lista de gravações</Text>
        <FlatList
          data={gravacoes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text style={styles.gravacao}>{item}</Text>}
          ref={flatListRef}
        />
      </View>

      <View style={styles.btnBox}>
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


      <View>
        <Text style={styles.textoFimPagina}>Desenvolvido por Raul Ayrton Franco - Novembro de 2024</Text>
      </View>
    </View>
  );
}