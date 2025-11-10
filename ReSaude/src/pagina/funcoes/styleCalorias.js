import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#89D99D",
  },

  containerPrincipal: {
    flex: 1,
  },

  nav: {
    flexDirection: "row",
    width: "100%",
    height: "12%",
    alignItems: "flex-end",
    padding: 10,
    backgroundColor: "#F7F9F8",
  },

  containerBuscar: {
    flexDirection: "row",
    padding: 20,
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    padding: 5,
    width: "60%",
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white'
  },

  botao: {
    width: 100,
    height: "30%",
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },

  containerAlimentos: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },

  txt: {
    fontSize: 20,
    color: "#333",
  },
});
