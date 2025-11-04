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
    setAnima('fadeInRight')
  };

  const animacaoSaida = () => {
    setAnima('fadeOutRight')
    setModal(false)
  };

  const irPerfil = () => {
    setModal(false),
    navigation.navigate('Perfil')
  }

  const apagarLocal = async () => {
    try {
      await AsyncStorage.removeItem("usuario");
      console.log("apagado no local");
      navigation.navigate("Login");
    } catch (erro) {
      console.log("erro");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerDashboard}>
        <View style={styles.nav}>
          <Pressable onPress={() => animacaoEntrada()}>
            <Image
              style={styles.imgPerfil}
              source={require("../../../assets/barras.png")}
            ></Image>
          </Pressable>
        </View>

        <View style={styles.corpo}>
          <Pressable
            style={styles.card}
            onPress={() => navigation.navigate("Calorias")}
          >
            <Image source={require("../../../assets/calorias.png")}></Image>
          </Pressable>

          <Pressable
            style={styles.card}
            onPress={() => navigation.navigate("Imc")}
          >
            <Image source={require("../../../assets/imc.png")}></Image>
          </Pressable>

          <Pressable
            style={styles.card}
            onPress={() => navigation.navigate("Água")}
          >
            <Image source={require("../../../assets/agua.png")}></Image>
          </Pressable>

          <Pressable
            style={styles.card}
            onPress={() => navigation.navigate("Sangue")}
          >
            <Text style={styles.txt}>Sangue</Text>
          </Pressable>

          <Pressable
            style={styles.card}
            onPress={() => navigation.navigate("Vacinas")}
          >
            <Text style={styles.txt}>Vacinas</Text>
          </Pressable>

          <Pressable
            style={styles.card}
            onPress={() => navigation.navigate("geolocalizacao")}
          >
            <Text>mapa</Text>
          </Pressable>

          <Pressable
            style={styles.card}
            onPress={() => navigation.navigate("geolocalizacao")}
          >
            <Text>motivacional</Text>
          </Pressable>

          <Pressable
            style={styles.card}
            onPress={() => navigation.navigate("geolocalizacao")}
          >
            <Text>musica</Text>
          </Pressable>
        </View>
      </View>
      <StatusBar style="auto" />

      <Modal transparent={true} visible={modal}>
        <View style={styles.sabar}>
          <Animatable.View style={styles.lado} animation={anima} duration={500}>
            <View style={styles.perfil}>
              <Image source={require("../../../assets/perfil2.png")}></Image>
            </View>
            <View style={styles.lista}>
              <View style={styles.li}>
                <Pressable
                  style={styles.acessa}
                  onPress={() => irPerfil()}
                >
                  <Image
                    style={styles.img2}
                    source={require("../../../assets/perfil3.png")}
                  ></Image>
                  <Text style={styles.textLi}> perfil</Text>
                </Pressable>
              </View>
              <View style={styles.li}>
                <Pressable
                  style={styles.acessa}
                  onPress={() => apagarLocal()}
                >
                  <Image
                    style={styles.img2}
                    source={require("../../../assets/sair.png")}
                  ></Image>
                  <Text style={styles.textLi}> sair </Text>
                </Pressable>
              </View>
            </View>
            <Pressable style={styles.x} onPress={() => animacaoSaida()}>
              <Image source={require("../../../assets/x.png")}></Image>
            </Pressable>
          </Animatable.View>
        </View>
      </Modal>
    </View>
  );
}
