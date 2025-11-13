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

  containerCalcular: {
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
    fontSize: 28,
    fontWeight: "700",
    color: "#2C3E50",
    marginBottom: 8,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 16,
    color: "#7F8C8D",
    textAlign: "center",
    fontWeight: "400",
  },

  inputContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  inputGroup: {
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
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

  containerCard: {
    flex: 1,
    alignItems: "center",
  },

  card: {
    width: "100%",
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    padding: 20,
  },

  cardHeader: {
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ECF0F1",
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2C3E50",
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  containerMostrarImc: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    minHeight: 150,
  },

  imcCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 6,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    backgroundColor: "#F8F9FA",
  },

  imcValue: {
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 4,
  },

  imcLabel: {
    fontSize: 14,
    color: "#7F8C8D",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  category: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },

  message: {
    fontSize: 16,
    color: "#7F8C8D",
    textAlign: "center",
    fontWeight: "500",
    lineHeight: 22,
  },

  placeholderText: {
    fontSize: 16,
    color: "#BDC3C7",
    textAlign: "center",
    fontStyle: "italic",
    padding: 20,
  },

  corpo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  imcImage: {
    width: width * 0.5,
    height: width * 0.4,
    maxWidth: 250,
    maxHeight: 200,
  },

  legend: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    width: "48%",
  },

  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },

  legendText: {
    fontSize: 12,
    color: "#7F8C8D",
    fontWeight: "500",
  },

  reta: {
    flexDirection: "row",
  },
});
