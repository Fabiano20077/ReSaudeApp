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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={styles.loadingText}>Carregando seu tipo sanguíneo...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerSangue}>
        <View style={styles.nav}>
          <Pressable 
            style={styles.backButton}
            onPress={() => navigation.navigate("Dashboard")}
          >
            <Image
              style={styles.imgPerfil}
              source={require("../../../assets/seta-esquerda.png")}
            />
       
          </Pressable>
        </View>
        
        <View style={styles.containerBolsa}>
          <View style={styles.junto}>
            <View style={styles.imageContainer}>
              <Image 
                style={styles.imgSangue} 
                source={require('../../../assets/bolsaSangue2.png')}
                resizeMode="contain"
              />
            </View>
            
            <View style={styles.bloodTypeContainer}>
              <Text style={styles.sangue}>{sangue || "Não informado"}</Text>
              <Text style={styles.bloodLabel}>SEU TIPO SANGUÍNEO</Text>
            </View>
            
            <View style={styles.infoContainer}>
              <Text style={styles.infoTitle}>Por que isso é importante?</Text>
              <Text style={styles.infoText}>
                Saber seu tipo sanguíneo é crucial em emergências médicas e para doações de sangue.
              </Text>
            </View>
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}