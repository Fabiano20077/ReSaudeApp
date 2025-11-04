import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
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

  const buscarCalorias = async () => {

    setLoanding(true);

    try {

      const response = await fetch(
        "https://trackapi.nutritionix.com/v2/natural/nutrients",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-app-id": "a0514f11",
            "x-app-key": "0fe676f1389fe11fe47dfbe162a4261b",
          },
          body: JSON.stringify({
            query: nomeAlimento,
          }),
        }
      );

      console.log('status', response.status)

      console.log(response);
      const resData = await response.json();

      console.log("zika", resData);
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
        <View style={styles.containerBuscar}>
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
            <Text style={styles.txt}> escreva algum alimento</Text>
          ) : !loading ? (
            <>
              <Text style={styles.txt}>🍎 {arrey.food_name}</Text>
              <Text style={styles.txt}>Calorias: {arrey.nf_calories} kcal</Text>
              <Text style={styles.txt}>Proteínas: {arrey.nf_protein} g</Text>
              <Text style={styles.txt}>
                Carboidratos: {arrey.nf_total_carbohydrate} g
              </Text>
              <Text style={styles.txt}>Gorduras: {arrey.nf_total_fat} g</Text>
            </>
          ) : (
            <ActivityIndicator size="large" color="blue">
              <Text>carregando...</Text>
            </ActivityIndicator>
          )}
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
