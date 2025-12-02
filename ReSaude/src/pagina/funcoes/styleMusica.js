import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#89D99D",
  },

  containerMusica: {
    flex: 1,
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


  backIcon: {
    width: 20,
    height: 20,
  },

  backText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#F8FAFC",
    fontWeight: "500",
  },

  header: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#1E293B",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#F8FAFC",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: "#94A3B8",
    fontWeight: "500",
  },

  musica: {
    flex: 1,
    padding: 16,
  },

  musicCard: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },

  playingCard: {
    backgroundColor: "rgba(59, 130, 246, 0.2)",
    borderColor: "#3B82F6",
    borderWidth: 2,
    transform: [{ scale: 1.02 }],
  },

  albumArt: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 16,
    backgroundColor: "#475569",
  },

  musicInfo: {
    flex: 1,
    justifyContent: "center",
    marginRight: 12,
  },

  musicTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#F8FAFC",
    marginBottom: 6,
  },

  artistName: {
    fontSize: 14,
    color: "#94A3B8",
    marginBottom: 6,
  },

  duration: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "500",
  },

  controls: {
    justifyContent: "center",
    alignItems: "center",
  },

  playButton: {
    backgroundColor: "#10B981",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    shadowColor: "#10B981",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },

  playButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },

  playingControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  controlButton: {
    backgroundColor: "#3B82F6",
    padding: 12,
    borderRadius: 25,
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    minWidth: 50,
    alignItems: "center",
  },

  stopButton: {
    backgroundColor: "#EF4444",
    shadowColor: "#EF4444",
  },

  controlText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0F172A",
  },

  loadingText: {
    marginTop: 16,
    fontSize: 18,
    color: "#94A3B8",
    fontWeight: "500",
  },

  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 80,
  },

  emptyText: {
    fontSize: 20,
    color: "#94A3B8",
    marginBottom: 12,
    fontWeight: "600",
  },

  emptySubtext: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 24,
  },

  currentPlayer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(30, 41, 59, 0.95)",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#475569",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backdropFilter: "blur(10px)",
  },

  playerInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 16,
  },

  playerAlbumArt: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 16,
    backgroundColor: "#475569",
  },

  playerTextContainer: {
    flex: 1,
  },

  currentPlayerTitle: {
    color: "#F8FAFC",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },

  currentPlayerArtist: {
    color: "#94A3B8",
    fontSize: 14,
  },

  playerControls: {
    flexDirection: "row",
    gap: 8,
  },

  playerButton: {
    backgroundColor: "rgba(59, 130, 246, 0.8)",
    padding: 12,
    borderRadius: 25,
    minWidth: 50,
    alignItems: "center",
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },

  playerButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  // Estados de hover/ativação
  buttonHover: {
    opacity: 0.8,
  },

  // Animação para o card que está tocando
  pulseAnimation: {
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
  },

  // Gradiente background (se quiser adicionar posteriormente)
  gradientBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 300,
    opacity: 0.1,
  },
});
