import { StyleSheet } from 'react-native';



export default StyleSheet.create(
  {
    container: {
      flex: 1,
      backgroundColor: '#3543ffda',
  },

  containerLogin: {
      flex: 1,
      borderWidth: 1,
  },
 
  espaco:{
    height:20,
    fontFamily:'verdana',
    padding:5
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
      width: '70',
      justifyContent:'center',
      padding:20,
  },

  texto: {
      fontSize:13,
      fontWeight: 350,
      padding: 10 
  },

  inputEmail: {
      padding: 10,
      fontSize: 15,
      borderWidth: 1
  },
  
  botao: {
    marginTop: 5,
    marginRight:5,
    width: 55,
    borderWidth: 1,
    padding: 4,
    backgroundColor:'#ccc',
    borderRadius: 5
},

letraBotao: {
    color: '#fff',
    fontSize:20,
},

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
