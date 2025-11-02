import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  Pressable,
  Image,
  TextInput,
  ActivityIndicator,
  Platform,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import api from "../api";
import styles from "./style";
import InputScale from "./inputAnima";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function etapa3({ data, onChange, onNext, onBack }) {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const [remedio, setRemedio] = useState([{ id: 1, nome: "" }]);

  const addRemedio = () => {
    setRemedio((prev) => [...prev, { id: Date.now(), nome: "" }]);
  };

  const handleAlergiaChange = (id, valor) => {
    const atualizar = remedio.map((item) =>
      item.id === id ? { ...item, nome: valor } : item
    );

    setRemedio(atualizar);
    onChange("remedios", atualizar)
  };

  const insert = async () => {
    setLoading(true);

    var usuario = new FormData();

    usuario.append('remedios', JSON.stringify(data.remedios))

    var array = await AsyncStorage.getItem("usuario");

    var user = JSON.parse(array);

    try {
      const response = await fetch(
        `http://10.0.2.2:8000/api/cadastra-etapa3/${user.usuario["id"]}`,
        {
          method: "POST",
          body: usuario,
        }
      );

         const resData = await response.json();
      if (!response.ok) {
   
        throw new error(JSON.stringify(resData));
      }

      console.log("funfo", resData);
      await AsyncStorage.setItem("usuario", JSON.stringify(resData));
      onNext();
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
          <View style={styles.addContainer}>
            <ScrollView
              style={{ gap: 20 }}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.parte2}>
                {remedio.map((item) => (
                  <InputScale
                    key={item.id}
                    label="remedios"
                    keyboardType="numeric"
                    value={item.nome}
                    onChangeText={(text) => handleAlergiaChange(item.id, text)}
                    containerStyle={{ width: 370, height: 100 }}
                    inputStyle={{ height: "100%", fontSize: 32 }}
                    labelEstilo={40}
                    position={23}
                  />
                ))}
              </View>
              <View style={styles.parte2}>
                <Pressable onPress={addRemedio}>
                  <View style={styles.card}>
                    <View style={styles.addFoto}>
                      <Image
                        source={require("../../../assets/adicionar.png")}
                      ></Image>
                    </View>
                    <View style={styles.addText}>
                      <Text style={styles.textCard}>Adiciona remedios</Text>
                    </View>
                  </View>
                </Pressable>
              </View>
            </ScrollView>
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
      </View>

      <StatusBar style="auto" />
    </View>
  );
}
