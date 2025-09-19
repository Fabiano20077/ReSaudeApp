import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    containerLogin: {
        flex: 1,
        borderWidth: 1,
    },

    logo: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },

    login: {
        flex: 1,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: '#89D99D',
        alignItems: 'center',
        borderWidth: 1
    },

    containerTitulo: {
        flex: .2,
    },

    titulo:{
        fontSize: 20,
        fontWeight: '500'
    },

    inputs: {
        flex: .8,
        width: '70%'
    },

    texto: {
        fontSize:15,
        fontWeight: '400',
        padding: 10, 
        marginLeft:20
    },

    inputEmail: {
        padding: 10,
        fontSize: 20,
        borderWidth: 1
    },

    ir:{
        flexDirection: 'row',
    },

    botao: {
        marginTop: 10,
        width: '100%',
        borderWidth: 1,
        padding: 10,
        backgroundColor:'#164773',
        alignItems: 'center',
        borderRadius: 10
    },

    letraBotao: {
        color: '#fff',
        fontSize:20,
    },

    link:{
        color: '#2d1efdff',
        justifyContent: 'center'
    },

    texteLink: {
        color: 'blue'
    },

    img: {
    width:350,
    height:350,
    justifyContent:'center',
    resizeMode: "contain", 
    },


});
