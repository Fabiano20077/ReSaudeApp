import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  containerDashboard: {
    flex: 1
  },

  corpo: {
    flex: .9,
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10
  },

 card: {
  width: '45%',
  height: 150,
  backgroundColor: '#E8F5E9',
  borderRadius: 12,
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 3
},

  nav: {
    flex: .1,
    flexDirection: 'row',
    width: '100%',
    height: 70,
    borderTopWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    backgroundColor:'#F7F9F8'
  },

  imgPerfil: {
   width:50,
   height:50
  },

  img: {
    width:'100%',
    height:'100%',
    borderRadius:15,
    marginTop:8
  },

  txt: {
  fontSize: 16,
  fontWeight: '500',
  marginTop: 8,
  color: '#333'
  }
});
