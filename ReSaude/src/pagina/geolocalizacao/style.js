import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  containerGeo: {
    flex: 1,
    position: "relative",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
  },

  mapa: {
    flex: 1,
  },

  inputFlu: {
    position: "absolute",
    top: "6%",
    left: "20%",
    padding: 15,
    width: "60%",
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    zIndex: 2,
  },

  flu: {
    position: "absolute",
    top: '6%',
    left: '3%'
  },

  containerModal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
});
