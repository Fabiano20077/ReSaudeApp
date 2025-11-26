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
import styles from "./styleCalorias";

export default function App() {
  const navigation = useNavigation();

  const [nomeAlimento, setNomeAlimento] = useState("");
  const [arrey, setArray] = useState("");
  const [loading, setLoanding] = useState(false);

  /* const traduzir = async (texto) => {

    try {

      const res = await axios.post('https://libretranslate.de/translate',
        {
          q: texto,
          source: "pt",
          target:  'en',
          format: "text"
        },
        {
          headers: {
       
          }
        })

      return res.data.translatedText;
    } catch (erro) {
      console.log('erro tradução:', erro.response?.data || erro.message);
      return texto; // se der erro, usa o original
    }
  } */

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={styles.loadingText}>Buscando seu alimento...</Text>
      </View>
    );
  }

  const buscarCalorias = async () => {
    setLoanding(true);
    console.log("iniciou");
    try {
      console.log("chegou aqui");
      // Fazendo busca por nome
      const response = await fetch(
        `https://api.api-ninjas.com/v1/nutrition?query=${encodeURIComponent(
          nomeAlimento
        )}`,
        {
          method: "GET",
          headers: {
            "X-Api-Key": "cZALYXZjcf8e1QtnDjmw0A==n1UFR1DZ3XkzFHZH",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }
      const dataRes = await response.json();
      console.log("funfo");
      console.log(dataRes);
      if (!Array.isArray(dataRes) || dataRes.length === 0) {
        setArray(null);
      } else {
        setArray(dataRes[0]);
      }
    } catch (erro) {
      console.log("erro no nutri", erro.message);
    } finally {
      setLoanding(false);
    }

    /* const alimento = await traduzir(nomeAlimento)
    console.log('aeee', alimento) */

    /*   axios.post("https://trackapi.nutritionix.com/v2/natural/nutrients",
      {
        query: nomeAlimento
      },
      {
        headers: {
          "x-app-id": "c9716735",
          "x-app-key": "19eec9f13fecc141f7b9847251334609",
          "Content-Type": "application/json",
        },
      })
      .then(res => {
        console.log('funof', res.data)
        setArray(res.data.foods[0])
        setLoanding(false)
      })
      .catch(erro => {
        console.log('erro', erro.response?.data || erro.message)
        setLoanding(false)
      }) */
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerPrincipal}>
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
        <View style={styles.corpoCalorias}>
          <View style={styles.containerTitulo}>
            <Text style={styles.titulo}>Calorias</Text>
            <Text style={styles.subtitle}>
              Descubra seu Índice de Massa Corporal
            </Text>
          </View>

          <View style={styles.containerBuscar}>
            <Text style={styles.Text}>escreva um alimento</Text>
            <TextInput
              style={styles.input}
              value={nomeAlimento}
              onChangeText={setNomeAlimento}
            />
            <Pressable style={styles.botao} onPress={() => buscarCalorias()}>
              <Text style={{ color: "white", fontSize: 20 }}>buscar</Text>
            </Pressable>
          </View>
          <View style={styles.containerAlimentos}>
            {arrey == "" ? (
              <View style={styles.containerTex2}>
                <Text style={styles.txt2}> nenhum alimento encontrado</Text>
              </View>
            ) : !loading ? (
              <>
                <Text style={styles.txt}>
                  <Text style={styles.negrito}>Nome:</Text> {arrey.name}
                </Text>
                <Text style={styles.txt}>
                <Text style={styles.negrito}>sodio:</Text> {arrey.sodium_mg?.toFixed(1)} mg
                </Text>
                <Text style={styles.txt}>
                <Text style={styles.negrito}>açucar:</Text> {arrey.sugar_g?.toFixed(1)} g
                </Text>
                <Text style={styles.txt}>
                <Text style={styles.negrito}>Carboidratos:</Text> {arrey.carbohydrates_total_g?.toFixed(1)} g
                </Text>
                <Text style={styles.txt}>
                <Text style={styles.negrito}>gordura:</Text> {arrey.fat_total_g?.toFixed(1)} g
                </Text>
              </>
            ) : (
              <ActivityIndicator size="large" color="blue">
                <Text>carregando...</Text>
              </ActivityIndicator>
            )}
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
