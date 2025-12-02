import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#89D99D",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F8FF",
  },

  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: "#666",
    fontFamily: 'System',
  },

  containerPrincipal: {
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

  backText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },

  imgPerfil: {
    width: 20,
    height: 20,
    tintColor: "#333",
  },

  corpoCalorias: {
    flex: 1,
    padding: 10,
    gap: 20,
  },

  containerTitulo: {
    marginBottom: 30,
  },

  titulo: {
    fontSize: 40,
    fontWeight: "700",
    color: "#2C3E50",
    marginBottom: 8,
    textAlign: "center",
    padding: 10,
  },

  subtitle: {
    fontSize: 16,
    color: "#7F8C8D",
    textAlign: "center",
    fontWeight: "400",
  },

  containerBuscar: {
    padding: 20,
    gap: 10,
    height: '30%',
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderRadius: 20,
  },

  Text: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2C3E50",
    marginBottom: 8,
    marginLeft: 5,
  },

  input: {
    padding: 16,
    fontSize: 18,
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderColor: "#E9ECEF",
    color: "#2C3E50",
    fontWeight: "500",
  },

  botao: {
    width: '100%',
    height: "30%",
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },

  containerAlimentos: {
    borderRadius: 20,
    padding: 10,
    height: "20%",
    backgroundColor: "white",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  negrito: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2C3E50",
    marginBottom: 8,
    marginLeft: 5,
  },

  txt: {
    fontSize: 20,
    color: "#592AF5",
  },

  txt2: {
    fontSize: 20,
    color: "#2C3E50",
  },
  
  containerTex2: {
    fontSize: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});
