import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#89D99D",
  },

  containerMusica: {
    flex: 1,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
  },

  loadingText: {
    fontSize: 18,
    color: "#2C3E50",
    marginTop: 20,
  },

  nav: {
    flexDirection: "row",
    width: "100%",
    height: height * 0.12,
    alignItems: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },

  backIcon: {
    width: 24,
    height: 24,
    tintColor: "#2C3E50",
  },

  backText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#2C3E50",
    fontWeight: "500",
  },

  musica: {
    flex: 1,
    padding: 15,
  },

  musicCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 15,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },

  playingCard: {
    backgroundColor: "#E3F2FD",
    borderLeftWidth: 4,
    borderLeftColor: "#2196F3",
  },

  albumArt: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },

  musicInfo: {
    flex: 1,
  },

  musicTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 4,
  },

  artistName: {
    fontSize: 14,
    color: "#7F8C8D",
    marginBottom: 8,
  },

  controls: {
    flexDirection: "row",
  },

  playButton: {
    backgroundColor: "#4ECDC4",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },

  stopButton: {
    backgroundColor: "#FF6B6B",
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
});