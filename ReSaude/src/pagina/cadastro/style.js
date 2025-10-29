import { StyleSheet } from 'react-native';
import { radius, colors, spacing } from './themes';


export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#89D99D',
    width: '100%',
    height: '100%'
  },

  containeretapa: {
    flex: 1
  },

  titulo: {
    position: 'relative',
    flexDirection: 'row',
    height: '13%',
    paddingTop: '5%',
    borderBottomWidth: 2,
    backgroundColor: '#2E8B57',
    borderColor: 'white',
    padding: 10
  },

  X: {
    position: 'absolute',
    bottom: '25%',
    left: '5%',
  },

  img2: {
    width: 45,
    height: 45,
  },

  textoTitulo: {
  color: colors.textLight,
  fontSize: 32,
  fontWeight: 'bold'
},

  campoInputs: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },

  input: {
  width: '85%',
  padding: 14,
  fontSize: 16,
  backgroundColor: colors.light,
  borderRadius: radius.md,
  borderWidth: 1,
  borderColor: '#ddd',
  color: colors.textDark,
  elevation: 2
},

  botoes: {
    flexDirection: 'row',
    gap: 20
  },

  bbotao: {
  backgroundColor: colors.secondary,
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: radius.md,
  width: '50%',
  alignItems: 'center',
  elevation: 3
},

botao2: {
  backgroundColor: colors.accent,
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: radius.md,
  alignItems: 'center',
  elevation: 3
},


  texto: {
    fontSize: 20,
    color:colors.textLight
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
