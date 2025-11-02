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
import api from "../api";
import styles from "./style";
import InputScale from "./inputAnima";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function etapa5({ data, onChange, onFinish, onBack }) {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const [senhaC, setSenhaC] = useState('')

  const insert = async () => {

    setLoading(true);

    if(senhaC !== data.senha){
      alert('senhas diferents')
      setLoading(false)
      return false;
    } 

    var usuario = new FormData();

    usuario.append("inputSenha", data.senha);

    var array = await AsyncStorage.getItem("usuario");

    var user = JSON.parse(array);

    try {
      const response = await fetch(
        `http://10.0.2.2:8000/api/cadastra-etapa5/${user.usuario["id"]}`,
        {
          method: "POST",
          body: usuario,
        }
      );

      const resData = await response.json();

      if (!response.ok) {
        throw Error(JSON.stringify(resData));
      }

      console.log("etapa5 sucesso", resData);
      alert('sucesso')
      await AsyncStorage.setItem("usuario", JSON.stringify(resData));
      onFinish();
    } catch (error) {
      console.log("erro", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="blue"></ActivityIndicator>
        <Text>carregando</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.containeretapa}>
        <View style={styles.titulo}></View>
        <View style={styles.campoInputs}>
          <View style={styles.parte3}>
            <InputScale
              label="confirma senha"
              keyboardType="numeric"
              value={senhaC}
              onChangeText={setSenhaC}
              containerStyle={{ width: 370, height: 100 }}
              inputStyle={{ height: "100%", fontSize: 32 }}
              labelEstilo={40}
              position={23}
            />
            <InputScale
              label="senha"
              keyboardType="numeric"
              value={data.senha}
              onChangeText={(text) => onChange('senha', text)}
              containerStyle={{ width: 370, height: 100 }}
              inputStyle={{ height: "100%", fontSize: 32 }}
              labelEstilo={40}
              position={23}
            />
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
