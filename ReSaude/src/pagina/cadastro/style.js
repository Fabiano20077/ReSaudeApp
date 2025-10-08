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
    flex: .1,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  textoTitulo: {
  color: colors.textLight,
  fontSize: 32,
  fontWeight: 'bold'
},

  campoInputs: {
    flex: .9,
    borderWidth: 1,
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

  botaoRed: {
    backgroundColor: colors.accent,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10
  },

  texto: {
    fontSize: 20,
    color:colors.textDark
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
