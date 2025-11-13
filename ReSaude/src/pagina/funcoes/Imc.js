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
  const [category, setCategory] = useState("");

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
    const imcValue = ImcPrepa.toFixed(1);

    let newMessage = "";
    let newCategory = "";
    let newImg = null;

    if (ImcPrepa < 18.5) {
      newMessage = "Você está abaixo do peso";
      newCategory = "Abaixo do peso";
      newImg = require("../../../assets/magro.png");
    } else if (ImcPrepa >= 18.5 && ImcPrepa < 25) {
      newMessage = "Seu peso está normal";
      newCategory = "Peso normal";
      newImg = require("../../../assets/normal.png");
    } else if (ImcPrepa >= 25 && ImcPrepa < 30) {
      newMessage = "Você está com sobrepeso";
      newCategory = "Sobrepeso";
      newImg = require("../../../assets/gordo.png");
    } else {
      newMessage = "Você está com obesidade";
      newCategory = "Obesidade";
      newImg = require("../../../assets/obesidade.png");
    }

    console.log(pesoV);
    console.log(alturaV);
    console.log(ImcPrepa);

    setImc(imcValue);
    setMessage(newMessage);
    setCategory(newCategory);
    setImg(newImg);
  };

  const getImcColor = () => {
    if (!imc) return "#666";
    const value = parseFloat(imc);
    if (value < 18.5) return "#FFA726"; // Laranja
    if (value < 25) return "#4CAF50"; // Verde
    if (value < 30) return "#FF9800"; // Laranja escuro
    return "#F44336"; // Vermelho
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerImc}>
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

        <View style={styles.containerCalcular}>
          <View style={styles.header}>
            <Text style={styles.title}>Calculadora de IMC</Text>
            <Text style={styles.subtitle}>
              Descubra seu Índice de Massa Corporal
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Peso (kg)</Text>
              <TextInput
                style={styles.input}
                value={String(peso)}
                onChangeText={setPeso}
                keyboardType="numeric"
                placeholder="Ex: 70"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Altura (m)</Text>
              <TextInput
                style={styles.input}
                value={String(altura)}
                onChangeText={setAltura}
                keyboardType="numeric"
                placeholder="Ex: 1.75"
                placeholderTextColor="#999"
              />
            </View>
          </View>

          <View style={styles.containerCard}>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Seu Resultado</Text>
              </View>

              
                <View style={styles.containerMostrarImc}>
                  {imc ? (
                    <>
                      <View
                        style={[
                          styles.imcCircle,
                          { borderColor: getImcColor() },
                        ]}
                      >
                        <Text
                          style={[styles.imcValue, { color: getImcColor() }]}
                        >
                          {imc}
                        </Text>
                        <Text style={styles.imcLabel}>IMC</Text>
                      </View>
                      <Text style={[styles.category, { color: getImcColor() }]}>
                        {category}
                      </Text>
                      <Text style={styles.message}>{message}</Text>
                    </>
                  ) : (
                    <Text style={styles.placeholderText}>
                      Preencha peso e altura para calcular seu IMC
                    </Text>
                  )}
                </View>
          
            </View>
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
