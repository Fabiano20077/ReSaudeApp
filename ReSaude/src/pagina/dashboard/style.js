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
    borderWidth: 1,
    borderRadius: 10
  },

  nav: {
    flex: .1,
    flexDirection: 'row',
    width: '100%',
    height: 70,
    borderTopWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5
  },

  img: {
    width: 50,
    height: 50
  }

});
