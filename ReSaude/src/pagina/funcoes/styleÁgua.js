import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#89D99D",
  },
  containerAgua: {
    flex: 1,
  },

  nav: {
    flexDirection: "row",
    width: "100%",
    height: height * 0.12,
    alignItems: "flex-end",
    padding: 20,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },



    imgPerfil: {
    width: 20,
    height: 20,
    tintColor: "#333",
  },

  containerCalcular: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  botoes: {
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: "#333",
  },
  input: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  botao: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    minWidth: 120,
    alignItems: "center",
    marginBottom: 20,
  },
  botaoDisabled: {
    backgroundColor: "#ccc",
  },
  resultadoContainer: {
    marginTop: 10,
    padding: 15,
    backgroundColor: "#e8f4fd",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#007AFF",
    alignItems: "center",
  },
  resultadoTexto: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  consumoTexto: {
    fontSize: 14,
    color: "#666",
  },
  resultadoDestaque: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
  },
  consumoDestaque: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
  },
  containerMostra: {
    alignItems: "center",
    marginBottom: 40,
  },
  card: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: "90%",
  },
  copoLabel: {
    fontSize: 18,
    marginBottom: 15,
    color: "#333",
    fontWeight: "500",
  },
  copoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  copo: {
    width: 120,
    height: 200,
    borderWidth: 3,
    borderColor: "#007AFF",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#f8f8f8",
    justifyContent: "flex-end",
  },
  agua: {
    backgroundColor: "#4CD964",
    width: "100%",
  },
  nivelMarcacao: {
    position: "absolute",
    left: -30,
    top: 0,
    bottom: 0,
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  marcacaoTexto: {
    fontSize: 12,
    color: "#666",
  },
  botoesControle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    width: "100%",
  },
  botaoMl: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  botoesAcao: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  botaoSecundario: {
    backgroundColor: "#FF3B30",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: "center",
  },
  txt: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  texto: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  textoSecundario: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
});
