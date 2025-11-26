import { StatusBar } from "expo-status-bar";
import { View, Text, Pressable, Image, ScrollView, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api";
import styles from "./style";
import * as Animatable from "react-native-animatable";
import { useState } from "react";

export default function App() {
  const navigation = useNavigation();

  const [modal, setModal] = useState(false);
  const [anima, setAnima] = useState("");

  const animacaoEntrada = () => {
    setModal(true);
    setAnima("fadeInRight");
  };

  const animacaoSaida = () => {
    setAnima("fadeOutRight");
    setTimeout(() => setModal(false), 300);
  };

  const irPerfil = () => {
    setModal(false);
    navigation.navigate("Perfil");
  };

  const apagarLocal = async () => {
    try {
      await AsyncStorage.removeItem("usuario");
      console.log("apagado no local");
      navigation.navigate("Login");
    } catch (erro) {
      console.log("erro");
    }
  };

  // Dados dos cards
  const cards = [
    {
      key: "calorias",
      title: "Calorias",
      icon: require("../../../assets/calorias.png"),
      route: "Calorias",
      color: "#FF6B6B",
    },
    {
      key: "imc",
      title: "IMC",
      icon: require("../../../assets/imc.png"),
      route: "Imc",
      color: "#4ECDC4",
    },
    {
      key: "agua",
      title: "Água",
      icon: require("../../../assets/agua.png"),
      route: "Água",
      color: "#45B7D1",
    },
    {
      key: "sangue",
      title: "Tipo Sanguíneo",
      icon: require("../../../assets/bolsaSangue.png"),
      route: "Sangue",
      color: "#FFA726",
    },
    {
      key: "vacinas",
      title: "Vacinas",
      icon: require("../../../assets/vacina.png"),
      route: "Vacinas",
      color: "#AB47BC",
    },
    {
      key: "mapa",
      title: "Hospitais Próximos",
      icon: require("../../../assets/hospital.png"),
      route: "geolocalizacao",
      color: "#66BB6A",
    },
    {
      key: "motivacional",
      title: "Motivação",
      icon: require("../../../assets/motivacao.png"),
      route: "Motivacional",
      color: "#FFA726",
    },
    {
      key: "musica",
      title: "Relaxamento",
      icon: require("../../../assets/relaxamento.png"),
      route: "Musica",
      color: "#5C6BC0",
    },
    {
      key: "relogio",
      title: "Dispertador",
      icon: require("../../../assets/relogio.png"),
      route: "Relogio",
      color: "#4ECDC4",
    },
    {
      key: "vibração",
      title: "toque teste",
      icon: require("../../../assets/relogio.png"),
      route: "toque",
      color: "#4ECDC4",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.containerDashboard}>
        <View style={styles.nav}>
          <Text style={styles.navTitle}>Home</Text>
          <Pressable
            style={styles.menuButton}
            onPress={() => animacaoEntrada()}
          >
            <Image
              style={styles.imgPerfil}
              source={require("../../../assets/barras.png")}
            />
          </Pressable>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.corpo}
          showsVerticalScrollIndicator={false}
        >
          {cards.map((card, index) => (
            <Animatable.View
              key={card.key}
              animation="fadeInUp"
              delay={index * 100}
              duration={800}
            >
              <Pressable
                style={[styles.card, { backgroundColor: card.color }]}
                onPress={() => navigation.navigate(card.route)}
              >
                <View style={styles.cardContent}>
                  <Image style={styles.cardIcon} source={card.icon} />
                  <Text style={styles.cardTitle}>{card.title}</Text>
                </View>
                <View style={styles.cardOverlay} />
              </Pressable>
            </Animatable.View>
          ))}
        </ScrollView>
      </View>
      <StatusBar style="auto" />

      <Modal transparent={true} visible={modal} animationType="none">
        <Pressable style={styles.sabar} onPress={animacaoSaida}>
          <Animatable.View style={styles.lado} animation={anima} duration={300}>
            <View style={styles.menuHeader}>
              <View style={styles.perfil}>
                <Image
                  style={styles.perfilIcon}
                  source={require("../../../assets/perfil2.png")}
                />
              </View>
              <Text style={styles.menuTitle}>Menu</Text>
            </View>

            <View style={styles.lista}>
              <Pressable style={styles.menuItem} onPress={() => irPerfil()}>
                <Image
                  style={styles.menuIcon}
                  source={require("../../../assets/perfil3.png")}
                />
                <Text style={styles.menuText}>Meu Perfil</Text>
                <View style={styles.arrow}></View>
              </Pressable>

              <Pressable style={styles.menuItem} onPress={() => apagarLocal()}>
                <Image
                  style={styles.menuIcon}
                  source={require("../../../assets/sair.png")}
                />
                <Text style={styles.menuText}>Sair</Text>
                <View style={styles.arrow}></View>
              </Pressable>
            </View>

            <Pressable style={styles.closeButton} onPress={animacaoSaida}>
              <Image
                style={styles.closeIcon}
                source={require("../../../assets/x.png")}
              />
            </Pressable>
          </Animatable.View>
        </Pressable>
      </Modal>
    </View>
  );
}
