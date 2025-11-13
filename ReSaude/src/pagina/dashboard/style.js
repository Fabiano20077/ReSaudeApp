import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#89D99D",
  },

  containerDashboard: {
    flex: 1,
  },

  nav: {
    flexDirection: "row",
    width: "100%",
    height: height * 0.12,
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },

  navTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2C3E50",
  },

  menuButton: {
    padding: 8,
  },

  imgPerfil: {
    width: 28,
    height: 28,
    tintColor: "#2C3E50",
  },

  header: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    backgroundColor: "#FFFFFF",
  },

  welcome: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2C3E50",
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 16,
    color: "#7F8C8D",
    fontWeight: "500",
  },

  scrollView: {
    flex: 1,
  },

  corpo: {
    padding: 15,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: (width - 45) / 2,
    height: 160,
    borderRadius: 20,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
  },

  cardContent: {
    alignItems: 'center',
    zIndex: 2,
  },

  cardIcon: {
    width: 50,
    height: 50,
    marginBottom: 12,
    tintColor: '#FFFFFF',
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },

  cardOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },

  // Modal Styles
  sabar: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: 'flex-end'
  },

  lado: {
    position: "relative",
    backgroundColor: "#FFFFFF",
    width: width * 0.75,
    height: "100%",
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },

  menuHeader: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 25,
    backgroundColor: "#89D99D",
    borderTopLeftRadius: 30,
    alignItems: 'center',
  },

  perfil: {
    marginBottom: 15,
  },

  perfilIcon: {
    width: 80,
    height: 80,
    tintColor: '#FFFFFF',
  },

  menuTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  lista: {
    paddingTop: 30,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#ECF0F1",
  },

  menuIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
    tintColor: "#7F8C8D",
  },

  menuText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2C3E50",
    flex: 1,
  },

  arrow: {
    width: 8,
    height: 8,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: "#BDC3C7",
    transform: [{ rotate: '-45deg' }],
  },

  closeButton: {
    position: "absolute",
    top: 40,
    left: 20,
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },

  closeIcon: {
    width: 16,
    height: 16,
    tintColor: "#2C3E50",
  },
});