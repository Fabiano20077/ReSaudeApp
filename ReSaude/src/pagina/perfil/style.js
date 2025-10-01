import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  containerPerfil: {
    flex: 1
  },

  containerImage: {
    height: '30%',
    borderWidth: 1
  },

  nomee: {
    fontSize:50
  },

  foto: {
    width: 150,
    height: 150
  },

  containerModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)',
    alignItems: 'center',
    justifyContent: 'center'
  },

  containerEdita: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  containerDados:{

  },

  img: {
    width: 200,
    height: 200,
    borderRadius: 100
  },

  input: {
    padding: 10,
    fontSize: 15,
    borderWidth: 1,
    width: 200
  },

  botoes:{
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-evenly'
  },

  botao: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 90,
    borderWidth: 1,
    padding: 4,
    backgroundColor: '#164773',
    borderRadius: 5,
  },

  letraBotao: {
    color: '#fff',
    fontSize: 20,
  },

});
