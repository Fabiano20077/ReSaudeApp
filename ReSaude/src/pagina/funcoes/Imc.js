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
import { useState } from "react";
import styles from "./styleImc";

export default function App() {
  const navigation = useNavigation();

  const [imc, setImc] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [message, setMessage] = useState("");

  const calcularImc = () => {
    if (!peso) {
      alert("Digite o peso");
      return false;
    }

    if (!altura) {
      alert("Digite a altura");
      return false;
    }

    const ImcPrepa = peso / (altura * altura);

    if (ImcPrepa < 18.5) {
      setPeso("");
      setAltura("");
      setMessage("Você está abaixo do peso");
      setImc(ImcPrepa.toFixed(2));
    } else if (ImcPrepa >= 18.5 && ImcPrepa < 25) {
      setPeso("");
      setAltura("");
      setMessage("seu peso está normal");
      setImc(ImcPrepa.toFixed(2));
    } else if (ImcPrepa >= 25 && ImcPrepa < 30) {
      setPeso("");
      setAltura("");
      setMessage("Você está sobrepeso");
      setImc(ImcPrepa.toFixed(2));
    } else {
      setMessage("Você está com obesidsde");
      setImc(ImcPrepa.toFixed(2));
    }
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
              value={peso}
              onChangeText={setPeso}
            />
            <Text style={styles.txt}>Qual sua altura?</Text>
            <TextInput
              style={styles.input}
              value={altura}
              onChangeText={setAltura}
            />

            <Pressable style={styles.botao} onPress={() => calcularImc()}>
              <Text style={styles.tetxB}>Calcular</Text>
            </Pressable>
          </View>
          <View style={styles.containerCard}>
            <View style={styles.card}>
              
            </View>
          </View>
        </View>
        <View style={styles.containerMostrarImc}>
          <Text style={styles.txt}>
            {imc} {message}
          </Text>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
