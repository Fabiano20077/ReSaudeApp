import { StyleSheet, Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },

  containerGeo: {
    flex: 1,
    position: "relative",
  },

  mapa: {
    flex: 1,
  },

  // Header Styles
  header: {
    position: "absolute",
    top: Platform.OS === 'ios' ? 50 : 40,
    left: 15,
    right: 15,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 10,
  },

  backButton: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginRight: 10,
  },

  backIcon: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backIconText: {
    fontSize: 18,
    color: "#2C3E50",
    fontWeight: 'bold',
  },

  searchContainer: {
    flex: 1,
    position: "relative",
    marginRight: 10,
  },

  searchInput: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 45,
    paddingVertical: 15,
    borderRadius: 12,
    fontSize: 16,
    color: "#2C3E50",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  searchIcon: {
    position: "absolute",
    left: 15,
    top: 15,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchIconText: {
    fontSize: 16,
  },

  listButton: {
    backgroundColor: "#FF6B6B",
    padding: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },

  listIcon: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  listIconText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: 'bold',
  },

  // Marker Styles
  userMarker: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  userPulse: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(74, 144, 226, 0.3)',
  },

  userMarkerIcon: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  userMarkerText: {
    fontSize: 24,
  },

  placeMarker: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#FF6B6B',
    minWidth: 40,
    minHeight: 40,
  },

  selectedMarker: {
    backgroundColor: '#FF6B6B',
    transform: [{ scale: 1.2 }],
  },

  markerIcon: {
    fontSize: 18,
  },

  // Callout Styles
  callout: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    minWidth: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },

  calloutTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 4,
  },

  calloutSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 6,
  },

  calloutPhone: {
    fontSize: 12,
    color: '#27AE60',
    fontWeight: '500',
  },

  calloutLink: {
    fontSize: 12,
    color: '#3498DB',
    fontWeight: '500',
  },

  // Results List Styles
  resultsList: {
    position: "absolute",
    top: Platform.OS === 'ios' ? 120 : 110,
    left: 15,
    right: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    maxHeight: height * 0.6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 10,
  },

  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ECF0F1',
  },

  resultsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },

  closeList: {
    fontSize: 18,
    color: '#7F8C8D',
    fontWeight: '600',
  },

  scrollView: {
    maxHeight: height * 0.5,
  },

  placeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F9FA',
  },

  selectedPlaceItem: {
    backgroundColor: '#E3F2FD',
  },

  placeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6B6B',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  placeTypeIcon: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  placeInfo: {
    flex: 1,
  },

  placeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },

  placeType: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 4,
  },

  placePhone: {
    fontSize: 12,
    color: '#27AE60',
  },

  distanceBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },

  distanceText: {
    fontSize: 12,
    color: '#3498DB',
    fontWeight: '600',
  },

  // Center Button
  centerButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },

  centerIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  centerIconText: {
    fontSize: 18,
  },

  // Modal Styles
  containerModal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center",
    justifyContent: "center",
  },

  loadingContent: {
    backgroundColor: '#FFFFFF',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    minWidth: width * 0.7,
  },

  loadingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginTop: 20,
    marginBottom: 8,
    textAlign: 'center',
  },

  loadingSubtext: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 20,
  },
});