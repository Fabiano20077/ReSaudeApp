import { StyleSheet } from 'react-native';



export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      width:375,
      height:200
  },

  containerCadastra: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

   imagem: {

   },

  img: {
    width: 200,
    height: 200
  },

  espaco:{
    height:20,
    fontFamily:'Arial',
    padding:5
  },

  logo: {
      flex: 1,
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
      borderWidth: 1,
      width:200
  },
  
  botao: {
    marginTop: 5,
    marginRight:5,
    marginLeft:140,
},

letraBotao: {
    color: '#fff',
    fontSize:20,
},

botao:{
    justifyContent:'center',
    alignItems:'center',
     height:40,
    width: 100,
    borderWidth: 1,
    padding: 4,
    backgroundColor:'#164773',
    borderRadius: 5,
}

});
