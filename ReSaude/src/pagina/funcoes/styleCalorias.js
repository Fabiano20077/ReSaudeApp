import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    containerPrincipal: {
        flex: 1
    },

    containerBuscar: {
        flexDirection: 'row',
        borderWidth: 1,
        padding: 20,
        gap: 10
    },

    input: {
        padding: 5,
        width: '60%',
        fontSize: 20,
        borderWidth: 1,
        borderRadius: 5
    },

    botao: {
        width: 100,
        height: '100%',
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },

    containerAlimentos: {
        justifyContent: 'center'
    }

});
