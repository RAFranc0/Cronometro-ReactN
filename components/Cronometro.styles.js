import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#1f1f1f',
    },
    tituloCronometro: {
        fontSize: 36,
        color: '#fff',
        textAlign: 'center'
    },
    textoTopoPagina: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center'
    },
    cronometro: {
        width: 200,
        height: 200,
        margin: 10,
        borderWidth: 2,
        borderColor: 'rgba(0, 255, 0, 0.3)',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },

    cronometroContador: {
        color: '#fff',
        fontSize: 48,
        fontWeight: 'bold',
    },
    btnBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginBottom: 24,
    },
    btn: {
        width: 100,
        alignItems: 'center',
        borderColor: 'rgba(0, 255, 0, 0.3)',
        borderWidth: 2,
        borderRadius: 8,
        paddingVertical: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
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
    gravacao: {
        width: 100,
        fontSize: 16,
        padding: 8,
        backgroundColor: 'rgba(221, 221, 221, 0.5)',
        color: '#fff',
        marginBottom: 4,
        borderRadius: 4,
        textAlign: 'center',
    },
    listaDeGravacoes: {
        width: 150,
        height: 200,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 10,
    },
    textoFimPagina: {
        fontSize: 12,
        fontStyle: 'italic',
        color: '#fff'
    },
});

export default styles;