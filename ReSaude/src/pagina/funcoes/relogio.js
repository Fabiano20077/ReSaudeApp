import { StatusBar } from "expo-status-bar";
import { View, Text, ActivityIndicator, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import styles from "./styleRelogio";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true, // Mostra o alerta na tela
    shouldShowList: true, // Mostra na central de notificações
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permissão para notificações negada!");
      }
    };

    requestPermissions();
  }, []);

const agendaRemedio = async (hora, minuto) => {
  try {
   
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "💊 Hora do Remédio!",
        body: "Está na hora de tomar dipirona",
        sound: true,
      },
      trigger: {
        seconds: 10,
      },
    });

    alert(
      "✅ Agendado!"
    );

  } catch (error) {
    console.log("Erro:", error);
  }
};

  return (
    <View style={styles.container}>
      <View style={styles.containerRelogio}>
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
        <View style={styles.containerRelogio}>
          <Pressable onPress={() => agendaRemedio(10, 40)}>
            <Text>aqui o </Text>
          </Pressable>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
