import { StatusBar } from "expo-status-bar";
import { 
  View, 
  Text, 
  ActivityIndicator, 
  Pressable, 
  Image, 
  ScrollView,
  Alert 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import styles from "./styleRelogio";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Configurar o handler de notificações
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [lembretes, setLembretes] = useState([]);

  useEffect(() => {
    setupNotifications();
    carregarLembretes();
  }, []);

  const setupNotifications = async () => {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Ative as notificações para receber lembretes.');
        return;
      }

      // Configurar o canal de notificação (Android)
      await Notifications.setNotificationChannelAsync('medicamentos', {
        name: 'Lembretes de Medicamentos',
        importance: Notifications.AndroidImportance.HIGH,
        sound: 'default',
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });

      console.log('✅ Notificações configuradas');
    } catch (error) {
      console.log('❌ Erro ao configurar notificações:', error);
    }
  };

  const carregarLembretes = async () => {
    try {
      const salvos = await AsyncStorage.getItem('lembretes_remedios');
      if (salvos) {
        setLembretes(JSON.parse(salvos));
      }
    } catch (error) {
      console.log('Erro ao carregar lembretes:', error);
    }
  };

  const salvarLembretes = async (novosLembretes) => {
    try {
      await AsyncStorage.setItem('lembretes_remedios', JSON.stringify(novosLembretes));
      setLembretes(novosLembretes);
    } catch (error) {
      console.log('Erro ao salvar lembretes:', error);
    }
  };

  const agendarLembrete = async (hora, minuto, remedio = "Dipirona") => {
    try {
      setLoading(true);

      // Verificar permissão
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Você precisa permitir notificações para agendar lembretes.');
        return;
      }

      // Criar data para o trigger
      const agora = new Date();
      const dataLembrete = new Date();
      dataLembrete.setHours(hora, minuto, 0, 0);

      // Se a hora já passou hoje, agenda para amanhã
      if (dataLembrete <= agora) {
        dataLembrete.setDate(dataLembrete.getDate() + 1);
      }

      const segundosParaLembrete = Math.floor((dataLembrete.getTime() - agora.getTime()) / 1000);

      if (segundosParaLembrete <= 0) {
        Alert.alert('Erro', 'Hora inválida para agendamento.');
        return;
      }

      // Agendar notificação
      const idNotificacao = await Notifications.scheduleNotificationAsync({
        content: {
          title: "💊 Hora do Remédio!",
          body: `Está na hora de tomar ${remedio}`,
          sound: 'default',
          data: { remedio, hora: `${hora}:${minuto.toString().padStart(2, '0')}` },
        },
        trigger: {
          seconds: segundosParaLembrete,
          channelId: 'medicamentos',
        },
      });

      // Salvar o lembrete
      const novoLembrete = {
        id: idNotificacao,
        remedio,
        hora: `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`,
        data: dataLembrete.toISOString(),
      };

      const novosLembretes = [...lembretes, novoLembrete];
      await salvarLembretes(novosLembretes);

   
      console.log('📅 Notificação agendada:', idNotificacao);

    } catch (error) {
      console.log('❌ Erro ao agendar:', error);
      Alert.alert('Erro', 'Não foi possível agendar o lembrete. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const cancelarLembrete = async (id) => {
    try {
      await Notifications.cancelScheduledNotificationAsync(id);
      
      const novosLembretes = lembretes.filter(lembrete => lembrete.id !== id);
      await salvarLembretes(novosLembretes);

      
    } catch (error) {
      console.log('Erro ao cancelar lembrete:', error);
      Alert.alert('Erro', 'Não foi possível cancelar o lembrete.');
    }
  };

  const agendarLembreteRapido = (minutos) => {
    const agora = new Date();
    const hora = agora.getHours();
    const minuto = agora.getMinutes() + minutos;
    
    agendarLembrete(hora, minuto, "Dipirona");
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

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}> Lembretes de Medicamentos</Text>
            <Text style={styles.subtitle}>
              Agende lembretes para não esquecer de tomar seus remédios
            </Text>
          </View>

          {/* Agendamento Rápido */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Agendamento Rápido</Text>
            <View style={styles.quickActions}>
              <Pressable 
                style={styles.quickButton}
                onPress={() => agendarLembreteRapido(1)}
                disabled={loading}
              >
                <Text style={styles.quickButtonText}> 1 minuto</Text>
              </Pressable>
              <Pressable 
                style={styles.quickButton}
                onPress={() => agendarLembreteRapido(5)}
                disabled={loading}
              >
                <Text style={styles.quickButtonText}> 5 minutos</Text>
              </Pressable>
              <Pressable 
                style={styles.quickButton}
                onPress={() => agendarLembrete(10, 0)}
                disabled={loading}
              >
                <Text style={styles.quickButtonText}> 10 minutos</Text>
              </Pressable>
            </View>
          </View>

          {/* Agendamento Manual */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Agendar para Horário Específico</Text>
            <View style={styles.timeGrid}>
              {[
                { hora: 8, minuto: 0, label: "Manhã " },
                { hora: 12, minuto: 0, label: "Almoço " },
                { hora: 16, minuto: 0, label: "Tarde " },
                { hora: 20, minuto: 0, label: "Noite " },
              ].map((horario, index) => (
                <Pressable
                  key={index}
                  style={styles.timeButton}
                  onPress={() => agendarLembrete(horario.hora, horario.minuto)}
                  disabled={loading}
                >
                  <Text style={styles.timeText}>{horario.label}</Text>
                  <Text style={styles.timeHour}>
                    {horario.hora.toString().padStart(2, '0')}:{horario.minuto.toString().padStart(2, '0')}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Lembretes Ativos */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Lembretes Ativos ({lembretes.length})
            </Text>
            
            {lembretes.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>Nenhum lembrete agendado</Text>
                <Text style={styles.emptySubtext}>
                  Use os botões acima para agendar seu primeiro lembrete
                </Text>
              </View>
            ) : (
              lembretes.map((lembrete) => (
                <View key={lembrete.id} style={styles.lembreteCard}>
                  <View style={styles.lembreteInfo}>
                    <Text style={styles.lembreteRemedio}> {lembrete.remedio}</Text>
                    <Text style={styles.lembreteHora}> {lembrete.hora}</Text>
                    <Text style={styles.lembreteData}>
                      {new Date(lembrete.data).toLocaleDateString('pt-BR')}
                    </Text>
                  </View>
                  <Pressable
                    style={styles.cancelButton}
                    onPress={() => cancelarLembrete(lembrete.id)}
                  >
                    <Text style={styles.cancelButtonText}>❌</Text>
                  </Pressable>
                </View>
              ))
            )}
          </View>

          {loading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#3B82F6" />
              <Text style={styles.loadingText}>Agendando lembrete...</Text>
            </View>
          )}
        </ScrollView>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}