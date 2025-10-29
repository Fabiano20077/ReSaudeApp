import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    containerImc: {
        flex: 1
    },

    containerCalcular: {
        flex: .5,

    },

    input: {
        padding: 5,
        width: '60%',
        fontSize: 20,
        borderWidth: 1,
        borderRadius: 5
    },

    containerMostrarImc: {
        flex: .5,
        
    },

    txt:{
        fontSize:20,
        color:'#333'
     },

     botao: {
        width: 120,
        height: '15%',
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        padding:10
    },
});
