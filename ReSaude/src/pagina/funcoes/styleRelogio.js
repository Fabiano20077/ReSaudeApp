import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#89D99D",
  },

  containerRelogio: {
    flex: 1,
  },

  nav: {
    flexDirection: "row",
    width: "100%",
    height: height * 0.12,
    alignItems: "flex-end",
    padding: 20,
    paddingBottom: 15,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#1E293B",
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },

  backText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#F8FAFC",
    fontWeight: "500",
  },

  navTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F8FAFC",
    flex: 1,
    textAlign: "center",
    marginRight: 40,
  },

  imgPerfil: {
    width: 20,
    height: 20,
  },

  content: {
    flex: 1,
    padding: 20,
  },

  header: {
    marginBottom: 30,
  },

  title: {
    fontSize: 40,
    fontWeight: "700",
    color: "#2C3E50",
    marginBottom: 8,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 16,
    color: "black",
    lineHeight: 24,
  },

  section: {
    marginBottom: 30,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#F8FAFC",
    marginBottom: 16,
  },

  quickActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  quickButton: {
    backgroundColor: "rgba(59, 130, 246, 0.8)",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 12,
    flex: 1,
    minWidth: 100,
    alignItems: "center",
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },

  quickButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },

  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  timeButton: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 16,
    flex: 1,
    minWidth: 150,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  timeText: {
    color: "black",
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 4,
  },

  timeHour: {
    color: "#3B82F6",
    fontWeight: "bold",
    fontSize: 18,
  },

  lembreteCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },

  lembreteInfo: {
    flex: 1,
  },

  lembreteRemedio: {
    color: "black",
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 4,
  },

  lembreteHora: {
    color: "#3B82F6",
    fontWeight: "500",
    fontSize: 14,
    marginBottom: 2,
  },

  lembreteData: {
    color: "#5d5d5dff",
    fontSize: 12,
  },

  cancelButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "rgba(239, 68, 68, 0.2)",
  },

  cancelButtonText: {
    fontSize: 16,
  },

  emptyState: {
    padding: 40,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderStyle: "dashed",
  },

  emptyText: {
    color: "#94A3B8",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },

  emptySubtext: {
    color: "#64748B",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },

  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(15, 23, 42, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 16,
    color: "#F8FAFC",
    fontSize: 16,
  },
});
