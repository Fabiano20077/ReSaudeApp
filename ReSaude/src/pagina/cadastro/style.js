import { Dimensions, StyleSheet } from "react-native";
import { radius, colors, spacing } from "./themes";

const { width } = Dimensions.get("window");
const size = width * 0.6;

export default StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  containeretapa: {
    flex: 1,
  },

  titulo: {
    position: "relative",
    flexDirection: "row",
    height: "7%",
  },

  X: {
    position: "absolute",
    bottom: "25%",
    left: "5%",
  },

  img2: {
    width: 45,
    height: 45,
  },

  textoTitulo: {
    color: colors.textLight,
    fontSize: 32,
    fontWeight: "bold",
  },

  campoInputs: {
    flex: 1,
    alignItems: "center",
    paddingTop: "10%",
    gap: 15,
    backgroundColor: "#89D99D",
    borderWidth: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },

  conjunto: {
    alignItems: "center",
    paddingTop: "10%",
    gap: 15,
  },

  partes: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10
  },

  input: {
    width: "40%",
    padding: 14,
    fontSize: 16,
    backgroundColor: colors.light,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: "#ddd",
    color: colors.textDark,
    elevation: 2,
  },

  botoes: {
    flexDirection: "row",
    gap: 20,
  },

  bbotao: {
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: radius.md,
    width: "40%",
    alignItems: "center",
    elevation: 3,
  },

  botao2: {
    backgroundColor: colors.accent,
    paddingVertical: 12,
    paddingHorizontal: 20,
     width: "40%",
    borderRadius: radius.md,
    alignItems: "center",
    elevation: 3,
  },

  texto: {
    fontSize: 20,
    color: colors.textLight,
  },

  imagem: {
    flex: 0.6,
    width: "95%",
    marginTop: 10
  },

  imagem2: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  img: {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: 'white'
  },

  escolher: {
    flex: 0.2,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  escolha2: {
    flex: 0.3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  botoes2: {
    flexDirection: "row",
    width: "50%",
    justifyContent: "space-evenly",
  },

  // modal

  containerModal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  x: {
    position: "absolute",
    top: "40%",
    left: "5%",
    zIndex: 2,
  },

  escolherFoto: {
    flexDirection: "row",
    width: "95%",
    height: "23%",
    backgroundColor: "white",
    borderRadius: 20,
  },

  dividir: {
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    height: "100%",
  },
});
