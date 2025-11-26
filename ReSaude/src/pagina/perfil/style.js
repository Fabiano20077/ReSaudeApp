import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#89D99D",
  },

  containerPerfil: {
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

  backText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#2C3E50",
    fontWeight: "500",
  },

  profileHeader: {
    flexDirection: "row",
    padding: 25,
    backgroundColor: "#FFFFFF",
    margin: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },

  avatarContainer: {
    position: 'relative',
    marginRight: 20,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#FF6B6B",
  },

  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: "#FF6B6B",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },

  editBadgeText: {
    fontSize: 14,
    color: "#FFFFFF",
  },

  userInfo: {
    flex: 1,
    justifyContent: 'center',
  },

  userName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2C3E50",
    marginBottom: 4,
  },

  userEmail: {
    fontSize: 16,
    color: "#7F8C8D",
    marginBottom: 15,
  },

  userStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  stat: {
    alignItems: 'center',
  },

  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FF6B6B",
    marginBottom: 2,
  },

  statLabel: {
    fontSize: 12,
    color: "#7F8C8D",
    fontWeight: "500",
  },

  actions: {
    paddingHorizontal: 20,
    gap: 12,
  },

  primaryButton: {
    backgroundColor: "#FF6B6B",
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },

  primaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  secondaryButton: {
    backgroundColor: "transparent",
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: "#E74C3C",
      backgroundColor: 'white'
  },

  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E74C3C",
  
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    width: width * 0.9,
    height: '90%',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    overflow: 'hidden',
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ECF0F1",
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2C3E50",
  },

  closeButton: {
    fontSize: 24,
    color: "#7F8C8D",
    fontWeight: "300",
  },

  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: "#F8F9FA",
  },

  step: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#BDC3C7",
    justifyContent: 'center',
    alignItems: 'center',
  },

  activeStep: {
    backgroundColor: "#FF6B6B",
  },

  stepText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  activeStepText: {
    color: "#FFFFFF",
  },

  modalContent: {
    flex: 1,
    padding: 20,
  },

  stepContent: {
    gap: 20,
  },

  stepTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2C3E50",
    marginBottom: 10,
  },

  inputRow: {
    flexDirection: 'row',
    gap: 15,
  },

  inputField: {
    flex: 1,
  },

  fullInput: {
    width: '100%',
  },

  section: {
    marginTop: 10,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2C3E50",
    marginBottom: 15,
  },

  listContainer: {
    maxHeight: 200,
  },

  listInput: {
    marginBottom: 10,
    width: '100%'
  },

  addButton: {
    backgroundColor: "#3498DB",
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },

  addButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  passwordSection: {
    gap: 15,
  },

  passwordInput: {
    width: '100%',
  },

  modalActions: {
    flexDirection: 'row',
    padding: 20,
    gap: 15,
    borderTopWidth: 1,
    borderTopColor: "#ECF0F1",
  },

  cancelButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: "#BDC3C7",
  },

  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#7F8C8D",
  },

  saveButton: {
    flex: 1,
    backgroundColor: "#FF6B6B",
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },

  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  loadingOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingContainer: {
    backgroundColor: "#FFFFFF",
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: "#2C3E50",
    fontWeight: "500",
  },

  containerModal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  x: {
    position: "absolute",
    top: "40%",
    left: "5%",
    zIndex: 2,
  },

  escolherFoto: {
    flexDirection: "row",
    width: "95%",
    height: "23%",
    backgroundColor: "white",
    borderRadius: 20,
  },

  dividir: {
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    height: "100%",
  },
});