import { StatusBar } from "expo-status-bar";
import { View, Text, ActivityIndicator, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import styles from "./styleSangue";
import api from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const navigation = useNavigation();
  const [sangue, setSangue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const vemId = async () => {
      setLoading(true);
      try {
        const valor = await AsyncStorage.getItem("usuario");
        if (!valor) {
          console.log("Nenhum usuário salvo no AsyncStorage");
          setLoading(false);
          return;
        }

        const usuario = JSON.parse(valor);
        const id = usuario.user["id"];

        const res = await api.get(`/chamar-usuario/${id}`);
        console.log("foi", res.data);
        setSangue(res.data.user.sangue);
      } catch (erro) {
        console.log("erro", erro.response?.data || erro.message);
      } finally {
        setLoading(false);
      }
    };

    vemId();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerSangue}>
        <View style={styles.nav}>
          <Pressable onPress={() => navigation.navigate("Dashboard")}>
            <Image
              style={styles.imgPerfil}
              source={require("../../../assets/seta-esquerda.png")}
            ></Image>
          </Pressable>
        </View>
        <View style={styles.containerBolsa}>
            <View style={styles.junto}>
            <Image style={styles.imgSangue} source={require('../../../assets/bolsaSangue.png')}></Image>
          <Text style={styles.sangue}>{sangue}</Text>
            </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
