import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    primary: "#2E8B57",
    second: "#89D99D",
    flex: 1,
    backgroundColor: "#F7F9F8",
  },

  containerLogin: {
    flex: 1,
    borderWidth: 1,
    elevation: 4,
  },

  logo: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },

  login: {
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: "#89D99D",
    alignItems: "center",
    borderWidth: 1,
  },

  containerTitulo: {
    flex: 0.2,
  },

  titulo: {
    fontSize: 20,
    fontWeight: "500",
  },

  inputs: {
    flex: 0.8,
    width: "70%",
  },

  texto: {
    color: "#333",
    fontSize: 15,
    fontWeight: "400",
    padding: 10,
    marginLeft: 20,
  },

  inputEmail: {
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    marginVertical: 8,
  },

  ir: {
    flexDirection: "row",
  },

  botao: {
    marginTop: 20,
    width: "100%",
    backgroundColor: "#2E8B57",
    padding: 6,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
  },

  letraBotao: {
    color: "#fff",
    fontSize: 20,
  },

  link: {
    color: "#2d1efdff",
    justifyContent: "center",
  },

  texteLink: {
    color: "blue",
  },

  img: {
    width: 300,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },

  containerModal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  
});
