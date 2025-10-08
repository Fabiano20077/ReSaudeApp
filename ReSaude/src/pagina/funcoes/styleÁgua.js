import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    containerAgua: {
        flex: 1
    },

    containerCalcular: {
        flexDirection: 'row',
        padding: 20,
        gap: 10,
        justifyContent:'center',
        alignItems:'center'
    },

    input: {
        padding: 5,
        width: '60%',
        fontSize: 20,
        borderWidth: 1,
        borderRadius: 5
    },

    containerMostra: {
        flex: .7,
    },

    txt:{
        fontSize:20
    },

    botao: {
        width: 100,
        height: '100%',
        backgroundColor: 'blue',
        alignItems:'center',
        alignContent:'center',
        borderRadius: 5,
    },
});
