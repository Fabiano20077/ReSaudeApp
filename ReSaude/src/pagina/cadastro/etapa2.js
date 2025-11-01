import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  Pressable,
  Image,
  TextInput,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";

import styles from "./style";
import InputScale from "./inputAnima";
import SelectScan from "./select";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function etapa2({ data, onChange, onNext, onBack }) {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const insert = async () => {
    setLoading(true);

    const usuario = new FormData();

    usuario.append("inputCep", data.cep);
    usuario.append("inputLogra", data.logradouro);
    usuario.append("inputNum", data.num);

    var array = await AsyncStorage.getItem("usuario");

    var user = JSON.parse(array);

    try {
      const response = await fetch(
        `http://10.0.2.2:8000/api/cadastra-etapa2/${user.usuario["id"]}`,
        {
          method: "POST",
          body: usuario,
        }
      );

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(JSON.stringify(errorData));
      }

      console.log("etapa1 feita", resData);
      await AsyncStorage.setItem("usuario", JSON.stringify(resData));
      onNext();
    } catch (error) {
      console.log("erro etapa2", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="blue"></ActivityIndicator>
        <Text>carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.containeretapa}>
        <View style={styles.titulo}></View>

        <View style={styles.campoInputs}>
          <View style={styles.conjunto}>
            <View style={styles.partes}>
              <InputScale
                label="peso"
                value={data.peso}
                onChangeText={(text) => onChange("nome", text)}
              />
              <InputScale
                label="altura"
                keyboardType="numeric"
                value={data.altura}
                onChangeText={(text) => onChange("sangue")}
              />
            </View>
            <View style={styles.partes}>
              <SelectScan
                label="sangue"
                selectedValue={data.sangue}
                onValueChange={(itemValue, itemIndex) =>
                  onChange("sangue", itemValue)
                }
              />
            </View>
          </View>

          <View style={styles.botoes}>
            <Pressable style={styles.botao2} onPress={() => onBack()}>
              <Text style={styles.texto}>Voltar</Text>
            </Pressable>

            <Pressable style={styles.bbotao} onPress={() => insert()}>
              <Text style={styles.texto}>Prosseguir</Text>
            </Pressable>
          </View>
        </View>

        <StatusBar style="auto" />
      </View>
    </View>
  );
}
