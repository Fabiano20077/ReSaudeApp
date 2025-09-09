import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3543ffda',
    },

    containerLogin: {
        flex: 1,
        borderWidth: 1,
    },

    logo: {
        flex: 1,
    },

    login: {
        flex: 1,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderWidth: 1
    },

    containerTitulo: {
        flex: .2,
    },

    titulo:{
        fontSize: 20,
        fontWeight: 500
    },

    inputs: {
        flex: 1,
        width: '70'
    },

    texto: {
        fontSize:15,
        fontWeight: 400,
        padding: 10 
    },

    inputEmail: {
        padding: 10,
        fontSize: 20,
        borderWidth: 1
    },

    botao: {
        marginTop: 5,
        width: '100',
        borderWidth: 1,
        padding: 10,
        backgroundColor:'#2d1efdff',
        alignItems: 'center',
        borderRadius: 10
    },

    letraBotao: {
        color: '#fff',
        fontSize:20,
    },

    link:{
        color: '#2d1efdff'
    }

});
