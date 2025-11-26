import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#89D99D",
  },

  containerImc: {
    flex: 1,
  },

  containerToque: {
    flex: 1,
    padding: 20,
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

  header: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },

  section: {
    height: "100%",
  },

  // Estilos para os botões de vibração
  vibrationGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 16,
  },

  vibrationButton: {
    flex: 1,
    minWidth: 150,
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },

  vibrationSimple: {
    backgroundColor: "rgba(59, 130, 246, 0.8)",
    shadowColor: "#3B82F6",
  },

  vibrationPattern: {
    backgroundColor: "rgba(16, 185, 129, 0.8)",
    shadowColor: "#10B981",
  },

  vibrationLong: {
    backgroundColor: "rgba(245, 158, 11, 0.8)",
    shadowColor: "#F59E0B",
  },

  vibrationNotification: {
    backgroundColor: "rgba(139, 92, 246, 0.8)",
    shadowColor: "#8B5CF6",
  },

  vibrationButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },

  vibrationDescription: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 12,
    textAlign: "center",
  },

  vibrationActions: {
    flexDirection: "row",
    gap: 12,
  },

  vibrationActionButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  vibrationActionText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },

  // Mantenha os estilos existentes e adicione esses
});
