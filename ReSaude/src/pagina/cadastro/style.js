import { StyleSheet } from 'react-native';



export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#89D99D',
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
    fontSize: 15,
    backgroundColor: '#fff',
    color: '#ccc',
    borderRadius: 10,
  },

  botoes: {
    flexDirection: 'row',
    gap: 20
  },

  botao: {
    backgroundColor: '#164773',
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10
  },

  botao2:{
 backgroundColor: '#a91f1fff',
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
