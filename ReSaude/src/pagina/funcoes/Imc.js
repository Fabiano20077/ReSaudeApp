import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styleImc";

export default function App() {
  const navigation = useNavigation();

  const [imc, setImc] = useState();
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [message, setMessage] = useState("");
  const [img, setImg] = useState("");

  useEffect(() => {
    const automatico = async () => {
      const respnse = await AsyncStorage.getItem("usuario");
      if (respnse) {
        const usuario = JSON.parse(respnse);
        console.log(usuario.user.peso);
        setPeso(usuario.user.peso);
        var arruma = usuario.user.altura.toString();
        arruma = arruma.replace(/(\d{1})(\d{1,2})/, "$1.$2");
        setAltura(arruma);
        console.log(peso);
      }
    };
    automatico();
  }, []);

  useEffect(() => {
    if (peso && altura) {
      calcularImc();
    }
  }, [peso, altura]);

  const calcularImc = () => {
    console.log("foi");
    if (!peso) {
      alert("Digite o peso");
      return false;
    }
    if (!altura) {
      alert("Digite a altura");
      return false;
    }

    const pesoV = parseFloat(peso);
    const alturaV = parseFloat(altura);

    const ImcPrepa = pesoV / (alturaV * alturaV);

    if (ImcPrepa < 18.5) {
      setMessage("Você está abaixo do peso");
      setImg(require("../../../assets/magro.png"));
    } else if (ImcPrepa >= 18.5 && ImcPrepa < 25) {
      setMessage("seu peso está normal");
      setImg(require("../../../assets/normal.png"));
    } else if (ImcPrepa >= 25 && ImcPrepa < 30) {
      setMessage("Você está com sobrepeso");
      setImg(require("../../../assets/gordo.png"));
    } else {
      setMessage("Você está com obesidsde");
      setImg(require("../../../assets/obesidade.png"));
    }

    console.log(pesoV);
    console.log(alturaV);
    console.log(ImcPrepa);
    setImc(ImcPrepa.toFixed(1));
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerImc}>
        <View style={styles.nav}>
          <Pressable onPress={() => navigation.navigate("Dashboard")}>
            <Image
              style={styles.imgPerfil}
              source={require("../../../assets/seta-esquerda.png")}
            ></Image>
          </Pressable>
        </View>

        <View style={styles.containerCalcular}>
          <View style={styles.botoes}>
            <Text style={styles.txt}>Qual seu peso?</Text>
            <TextInput
              style={styles.input}
              value={String(peso)}
              onChangeText={setPeso}
            />
            <Text style={styles.txt}>Qual sua altura?</Text>
            <TextInput
              style={styles.input}
              value={String(altura)}
              onChangeText={setAltura}
            />
          </View>
          <View style={styles.containerCard}>
            <View style={styles.card}>
              <View style={styles.containerMostrarImc}>
                <Text style={styles.txt}>
                  {imc} {message}
                </Text>
              </View>
              <View style={styles.corpo}>
                <Image source={img}></Image>
              </View>
            </View>
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
