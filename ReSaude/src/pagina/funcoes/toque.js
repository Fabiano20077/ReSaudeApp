import { StatusBar } from "expo-status-bar";
import { 
  View, 
  Text, 
  ActivityIndicator, 
  Pressable, 
  Image, 
  ScrollView,
  Alert,
  Platform,
  Vibration // Importe a API de vibração
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import styles from "./styleToque";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [lembretes, setLembretes] = useState([]);

  // Vibração simples - 400ms
  const vibrarSimples = () => {
    Vibration.vibrate(400);
    console.log('📳 Vibração simples ativada');
  };

  // Padrão de vibração personalizado
  const vibrarPadrao = () => {
    // Padrão: vibrar por 300ms, pausa 200ms, vibrar por 400ms
    Vibration.vibrate([300, 200, 400]);
    console.log('📳 Padrão de vibração ativado');
  };

  // Vibração longa
  const vibrarLonga = () => {
    Vibration.vibrate(1000); // 1 segundo
    console.log('📳 Vibração longa ativada');
  };

  // Vibração para notificação
  const vibrarNotificacao = () => {
    // Padrão comum para notificações
    Vibration.vibrate([0, 500, 200, 500]);
    console.log('📳 Vibração de notificação ativada');
  };

  // Parar vibração
  const pararVibracao = () => {
    Vibration.cancel();
    console.log('⏹️ Vibração parada');
  };

  // Teste com vibração
  const testeComVibracao = () => {
    vibrarSimples();
    Alert.alert("📳", "Vibração ativada!");
  };

  // Agendar lembrete com vibração
  const agendarComVibracao = async (hora, minuto) => {
    // Vibração de confirmação
    vibrarPadrao();
    
    // Aqui você pode adicionar a lógica de agendamento
    console.log(`Agendando para ${hora}:${minuto}`);
    
    Alert.alert(
      "✅ Agendado!",
      `Lembrete agendado para ${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`,
      [{ text: "OK", onPress: () => vibrarSimples() }]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerRelogio}>
        <View style={styles.nav}>
          <Pressable
            style={styles.backButton}
            onPress={() => {
              vibrarSimples();
              navigation.navigate("Dashboard");
            }}
          >
            <Image
              style={styles.imgPerfil}
              source={require("../../../assets/seta-esquerda.png")}
            />
          
          </Pressable>
          
        </View>

        <View style={styles.content} >
          <View style={styles.header}>
            <Text style={styles.title}>Vibração</Text>
          </View>

       
          <View style={styles.section}>
          
            
            <View style={styles.vibrationGrid}>
              <Pressable 
                style={[styles.vibrationButton, styles.vibrationSimple]}
                onPress={vibrarSimples}
              >
                <Text style={styles.vibrationButtonText}> Simples</Text>
                <Text style={styles.vibrationDescription}>400ms</Text>
              </Pressable>
              
              <Pressable 
                style={[styles.vibrationButton, styles.vibrationPattern]}
                onPress={vibrarPadrao}
              >
                <Text style={styles.vibrationButtonText}> Padrão</Text>
                <Text style={styles.vibrationDescription}>300ms-200ms-400ms</Text>
              </Pressable>
              
              <Pressable 
                style={[styles.vibrationButton, styles.vibrationLong]}
                onPress={vibrarLonga}
              >
                <Text style={styles.vibrationButtonText}> Longa</Text>
                <Text style={styles.vibrationDescription}>1000ms</Text>
              </Pressable>
              
              <Pressable 
                style={[styles.vibrationButton, styles.vibrationNotification]}
                onPress={vibrarNotificacao}
              >
                <Text style={styles.vibrationButtonText}> Notificação</Text>
                <Text style={styles.vibrationDescription}>Padrão duplo</Text>
              </Pressable>
            </View>

          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}