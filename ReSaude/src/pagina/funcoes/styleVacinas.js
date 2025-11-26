import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
     backgroundColor: "#89D99D",
  },

  containerVacinas: {
    flex: 1,
  },

  nav: {
    flexDirection: "row",
    width: "100%",
    height: height * 0.12,
    alignItems: "flex-end",
    padding: 20,
    paddingBottom: 15,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
 
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    paddingRight: 16,
  },

  backText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#4A5568",
    fontWeight: "500",
  },

  navTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2D3748",
    flex: 1,
    textAlign: "center",
    marginRight: 40,
  },

  imgPerfil: {
    width: 20,
    height: 20,
    tintColor: "#4A5568",
  },

  corpoVacinas: {
    flex: 1,
    padding: 20,
    paddingTop: 16,
  },

  categoriaContainer: {
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },

  categoriaHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 40,
    backgroundColor: '#667eea',
  },

  categoriaIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  categoriaIconText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },

  categoriaTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    flex: 1,
  },

  arrowContainer: {
    
    borderRadius: 12,
    padding: 4,
  },

  arrow: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
  },

 
  vacinasLista: {
    padding: 20,
    gap: 16,
  },

  vacinaCard: {
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 16,
    marginBottom: 8,
    borderLeftWidth: 6,
    borderLeftColor: "#48BB78",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#bebebeff",
  },

  vacinaHeader: {
    marginBottom: 16,
  },

  vacinaTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },

  vacinaNome: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D3748",
    flex: 1,
    marginRight: 12,
    marginBottom: 8,
  },

  obrigatoriaBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },

  obrigatoria: {
    backgroundColor: "#48BB78",
  },

  opcional: {
    backgroundColor: "#ED8936",
  },

  obrigatoriaTexto: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },

  vacinaInfo: {
    marginBottom: 16,
  },

  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    width: 16,
    height: 16,
    tintColor: "#718096",
    marginRight: 8,
  },

  vacinaIdade: {
    fontSize: 15,
    color: "#4A5568",
    fontWeight: "500",
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 12,
  },

  vacinaDescricao: {
    fontSize: 15,
    color: "#718096",
    lineHeight: 22,
    textAlign: "left",
  },

  footer: {
    padding: 24,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 30,
  },

  footerText: {
    fontSize: 16,
    color: "#718096",
    fontStyle: "italic",
    textAlign: "center",
  },
});