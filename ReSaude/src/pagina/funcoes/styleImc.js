import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#89D99D",
  },

  containerImc: {
    flex: 1,
  },

  containerCalcular: {
    height: '98%'
  },

  nav: {
    flexDirection: "row",
    width: "100%",
    height: "12%",
    alignItems: "flex-end",
    padding: 10,
    backgroundColor: "#F7F9F8",
  },

  botoes: {
    height: "25%",
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    padding: 5,
    width: "60%",
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "white",
  },

  containerMostrarImc: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center'
  },

  txt: {
    fontSize: 20,
    color: "black",
  },

  tetxB: {
    fontSize: 20,
    color: "white",
  },

  botao: {
    marginTop: 20,
    width: "50%",
    backgroundColor: "#2E8B57",
    padding: 6,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
  },

  containerCard: {
    height: '60%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  card: {
    width: "90%",
    height: "90%",
    backgroundColor: 'white',
    borderRadius: 12
  },

  corpo: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center'
  }

});
