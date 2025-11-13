import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

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

  containerSangue: {
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

  containerBolsa: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    justifyContent: "center",
  },

  junto: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
  },

  imageContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 20,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    transform: [{ rotate: '-5deg' }],
  },

  imgSangue: {
    width: width * 0.6,
    height: width * 0.6,
  },

  bloodTypeContainer: {
    alignItems: 'center',
    marginBottom: 40,
    backgroundColor: '#FFFFFF',
    padding: 30,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#FF6B6B',
  },

  sangue: {
    fontSize: 82,
    fontWeight: '800',
    color: '#FF6B6B',
    textShadowColor: 'rgba(255, 107, 107, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    marginBottom: 10,
    letterSpacing: 2,
  },

  bloodLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

  infoContainer: {
    backgroundColor: '#E3F2FD',
    padding: 25,
    borderRadius: 20,
    width: '100%',
    borderLeftWidth: 5,
    borderLeftColor: '#2196F3',
  },

  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1976D2',
    marginBottom: 12,
    textAlign: 'center',
  },

  infoText: {
    fontSize: 14,
    color: '#455A64',
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '400',
  },
});