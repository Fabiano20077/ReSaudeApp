import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  ActivityIndicator,
  Pressable,
  Image,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import styles from "./styleMusica";
import * as Audio from "expo-audio";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const navigation = useNavigation();

  const [musicas, setMusicas] = useState([]);
  const [players, setPlayers] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPlaying, setCurrentPlaying] = useState(null);

  const CLIENTE_ID = "2127167b";

  useEffect(() => {
    const buscarMusicas = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.jamendo.com/v3.0/tracks/?client_id=${CLIENTE_ID}&format=json&limit=10&tags=chillout+ambient+relax&include=musicinfo`
        );

        const resData = await response.json();

        setMusicas(resData.results);
        console.log("funfo", resData);
      } catch (erro) {
        console.log("erro ao buscar musica", erro.message);
      } finally {
        setLoading(false);
      }
    };
    buscarMusicas();
  }, []);

  const tocarMusica = async (musica) => {
    try {
      console.log("🎵 Tentando tocar:", musica.name);

      // Para o player anterior, se existir
      if (currentPlaying && players[currentPlaying]) {
        await players[currentPlaying].stopAsync();
        await players[currentPlaying].unloadAsync();
        setCurrentPlaying(null);
      }

      // Cria o player
      const sound = new Audio.Sound();
      await sound.loadAsync({ uri: musica.audio });
      await sound.playAsync();

      setPlayers((prev) => ({ ...prev, [musica.id]: sound }));
      setCurrentPlaying(musica.id);

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setCurrentPlaying(null);
        }
      });
    } catch (erro) {
      console.log("❌ Erro ao tocar música:", erro);
      alert("Erro ao reproduzir: " + erro.message);
    }
  };

  const pararMusica = async (id) => {
    try {
      if (players[id]) {
        await players[id].stopAsync();
        await players[id].unloadAsync();
        setCurrentPlaying(null);
      }
    } catch (erro) {
      console.log("Erro ao parar música:", erro);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={styles.loadingText}>Carregando suas musicas</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerMusica}>
        <View style={styles.nav}>
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.navigate("Dashboard")}
          >
            <Image
              style={styles.backIcon}
              source={require("../../../assets/seta-esquerda.png")}
            />
          </Pressable>
        </View>

        <View style={styles.musica}>
          <FlatList
            data={musicas}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.musicCard,
                  currentPlaying === item.id && styles.playingCard,
                ]}
              >
                <Image
                  source={{ uri: item.album_image }}
                  style={styles.albumArt}
                />

                <View style={styles.musicInfo}>
                  <Text style={styles.musicTitle}>{item.name}</Text>
                  <Text style={styles.artistName}>{item.artist_name}</Text>

                  <View style={styles.controls}>
                    <Pressable
                      onPress={() =>
                        currentPlaying === item.id
                          ? pararMusica(item.id)
                          : tocarMusica(item)
                      }
                      style={[
                        styles.playButton,
                        currentPlaying === item.id && styles.stopButton,
                      ]}
                    >
                      <Text style={styles.buttonText}>
                        {currentPlaying === item.id ? "⏹️ Parar" : "▶️ Tocar"}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
