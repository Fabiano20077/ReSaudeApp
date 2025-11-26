import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  ActivityIndicator,
  Pressable,
  Image,
  FlatList,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";
import { Audio } from 'expo-av'; // Import correto do expo-av
import styles from "./styleMusica";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const navigation = useNavigation();

  const [musicas, setMusicas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Use ref para o som
  const soundRef = useRef(null);

  const CLIENTE_ID = "2127167b";

  useEffect(() => {
    const buscarMusicas = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.jamendo.com/v3.0/tracks/?client_id=${CLIENTE_ID}&format=json&limit=10&tags=chillout+ambient+relax&include=musicinfo`
        );

        const resData = await response.json();

        if (resData.results && resData.results.length > 0) {
          setMusicas(resData.results);
          console.log("Músicas carregadas:", resData.results.length);
        } else {
          console.log("Nenhuma música encontrada");
        }
      } catch (erro) {
        console.log("erro ao buscar musica", erro.message);
        Alert.alert("Erro", "Erro ao carregar músicas: " + erro.message);
      } finally {
        setLoading(false);
      }
    };
    
    buscarMusicas();

    // Configurar o áudio quando o componente montar
    setupAudio();

    // Cleanup quando o componente desmontar
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  const setupAudio = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
      console.log("✅ Áudio configurado");
    } catch (error) {
      console.log("❌ Erro ao configurar áudio:", error);
    }
  };

  const tocarMusica = async (musica) => {
    try {
      console.log("🎵 Tentando tocar:", musica.name);
      console.log("🔗 URL:", musica.audio);

      // Parar música atual se estiver tocando
      await pararMusica();

      // Carregar e tocar nova música
      const { sound } = await Audio.Sound.createAsync(
        { uri: musica.audio },
        { shouldPlay: true }
      );

      soundRef.current = sound;
      setCurrentPlaying(musica.id);
      setIsPlaying(true);

      // Configurar eventos
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          console.log("⏹️ Música terminou");
          setIsPlaying(false);
          setCurrentPlaying(null);
          sound.unloadAsync();
          soundRef.current = null;
        }
      });

      console.log("✅ Música tocando com sucesso!");

    } catch (erro) {
      console.log("❌ Erro ao tocar música:", erro);
      let errorMessage = "Erro ao reproduzir a música";
      
      if (erro.message.includes("Network request failed")) {
        errorMessage = "Erro de conexão. Verifique sua internet.";
      } else if (erro.message.includes("Format not supported")) {
        errorMessage = "Formato de áudio não suportado.";
      }
      
      Alert.alert("Erro", errorMessage);
    }
  };

  const pararMusica = async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }
      setIsPlaying(false);
      setCurrentPlaying(null);
      console.log("⏹️ Música parada");
    } catch (erro) {
      console.log("Erro ao parar música:", erro);
    }
  };

  const pausarMusica = async () => {
    try {
      if (soundRef.current && isPlaying) {
        await soundRef.current.pauseAsync();
        setIsPlaying(false);
        console.log("⏸️ Música pausada");
      }
    } catch (erro) {
      console.log("Erro ao pausar música:", erro);
    }
  };

  const retomarMusica = async () => {
    try {
      if (soundRef.current && !isPlaying) {
        await soundRef.current.playAsync();
        setIsPlaying(true);
        console.log("▶️ Música retomada");
      }
    } catch (erro) {
      console.log("Erro ao retomar música:", erro);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={styles.loadingText}>Carregando suas músicas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerMusica}>
        <View style={styles.nav}>
          <Pressable
            style={styles.backButton}
            onPress={() => {
              pararMusica();
              navigation.navigate("Dashboard");
            }}
          >
            <Image
              style={styles.backIcon}
              source={require("../../../assets/seta-esquerda.png")}
            />
            <Text style={styles.backText}>Voltar</Text>
          </Pressable>
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>Músicas Relaxantes</Text>
          <Text style={styles.subtitle}>
            {musicas.length} músicas encontradas
          </Text>
        </View>

        <View style={styles.musica}>
          <FlatList
            data={musicas}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.musicCard,
                  currentPlaying === item.id && styles.playingCard,
                ]}
              >
                <Image
                  source={{ 
                    uri: item.album_image || 'https://via.placeholder.com/100?text=🎵'
                  }}
                  style={styles.albumArt}
                />

                <View style={styles.musicInfo}>
                  <Text style={styles.musicTitle} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.artistName} numberOfLines={1}>
                    {item.artist_name}
                  </Text>
                  <Text style={styles.duration}>
                    ⏱️ {Math.round(item.duration)}s
                  </Text>
                </View>

                <View style={styles.controls}>
                  {currentPlaying === item.id ? (
                    <View style={styles.playingControls}>
                      {isPlaying ? (
                        <Pressable
                          onPress={pausarMusica}
                          style={styles.controlButton}
                        >
                          <Text style={styles.controlText}>pausa</Text>
                        </Pressable>
                      ) : (
                        <Pressable
                          onPress={retomarMusica}
                          style={styles.controlButton}
                        >
                          <Text style={styles.controlText}>continua</Text>
                        </Pressable>
                      )}
                      <Pressable
                        onPress={pararMusica}
                        style={[styles.controlButton, styles.stopButton]}
                      >
                        <Text style={styles.controlText}>para</Text>
                      </Pressable>
                    </View>
                  ) : (
                    <Pressable
                      onPress={() => tocarMusica(item)}
                      style={styles.playButton}
                    >
                      <Text style={styles.playButtonText}>Tocar</Text>
                    </Pressable>
                  )}
                </View>
              </View>
            )}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>Nenhuma música encontrada</Text>
                <Text style={styles.emptySubtext}>
                  Verifique sua conexão com a internet
                </Text>
              </View>
            }
          />
        </View>

        {/* Player fixo na parte inferior */}
        {currentPlaying && (
          <View style={styles.currentPlayer}>
            <View style={styles.playerInfo}>
              <Image 
                source={{ uri: musicas.find(m => m.id === currentPlaying)?.album_image }} 
                style={styles.playerAlbumArt}
              />
              <View style={styles.playerTextContainer}>
                <Text style={styles.currentPlayerTitle} numberOfLines={1}>
                  {musicas.find(m => m.id === currentPlaying)?.name}
                </Text>
                <Text style={styles.currentPlayerArtist} numberOfLines={1}>
                  {musicas.find(m => m.id === currentPlaying)?.artist_name}
                </Text>
              </View>
            </View>
            <View style={styles.playerControls}>
              {isPlaying ? (
                <Pressable onPress={pausarMusica} style={styles.playerButton}>
                  <Text style={styles.playerButtonText}>⏸</Text>
                </Pressable>
              ) : (
                <Pressable onPress={retomarMusica} style={styles.playerButton}>
                  <Text style={styles.playerButtonText}>▶</Text>
                </Pressable>
              )}
              <Pressable onPress={pararMusica} style={styles.playerButton}>
                <Text style={styles.playerButtonText}>⏹</Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}