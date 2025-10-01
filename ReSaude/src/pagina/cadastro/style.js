import { StyleSheet } from 'react-native';



export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0396039d',
    width: 375,
    height: 200
  },

  containeretapa: {
    flex: 1
  },

  titulo: {
    flex: .1,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  textoTitulo: {
    color: 'white',
    fontSize: 50

  },

  campoInputs: {
    flex: .9,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },

  input: {
    width: '80%',
    padding: 15,
    fontSize: 25,
    backgroundColor: '#0000007c',
    color: '#fff',
    borderRadius: 10,
  },

  botoes: {
    flexDirection: 'row',
    gap: 20
  },

  botao: {
    backgroundColor: '#002efdff',
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10
  },
  botaoRed: {
    backgroundColor: 'red',
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10
  },

  texto: {
    fontSize: 20,
    color: 'white'
  },

  imagem: {
    flex: .5,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent:'center'
  },

  img: {
    width: '70%',
    height: '78%',
    borderRadius: 150
  
 
  },

  escolher:{
    flex: .2,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  escolha2:{
    flex: .3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  botoes2:{
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'space-evenly'
  }


});
