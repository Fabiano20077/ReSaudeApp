import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  Pressable,
  TextInput,
  ActivityIndicator,
  Platform,
  Image,
  ScrollView,
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

  const [alergias, setAlergias] = useState([{ id: 1, nome: "" }]);

  const addAlergia = () => {
    setAlergias((prev) => [...prev, { id: Date.now(), nome: "" }]);
  };

  const handleAlergiaChange = (id, valor) => {
    setAlergias((prev) =>
      prev.map((item) => (item.id === id ? { ...item, nome: valor } : item))
    );
  };

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
                onChangeText={(text) => onChange("peso", text)}
              />

              <InputScale
                label="altura"
                keyboardType="numeric"
                value={data.altura}
                onChangeText={(text) => onChange("altura", text)}
              />
            </View>

            <View style={styles.partes}>
              <SelectScan
                label="sangue"
                selectedValue={data.sangue}
                onValueChange={(itemValue, itemIndex) =>
                  onChange("sangue", itemValue)
                }
                opitions={[
                  { label: "", value: "" },
                  { label: "A-", value: "A-" },
                  { label: "B+", value: "B+" },
                  { label: "B-", value: "B-" },
                  { label: "AB+", value: "AB+" },
                  { label: "AB-", value: "AB-" },
                  { label: "O+", value: "O+" },
                  { label: "O-", value: "O-" },
                ]}
              />

              <SelectScan
                label="diabetico"
                selectedValue={data.diabetico}
                onValueChange={(itemValue, itemIndex) =>
                  onChange("diabetico", itemValue)
                }
                opitions={[
                  { label: "", value: "" },
                  { label: "sim", value: "sim" },
                  { label: "não", value: "não" },
                ]}
              />
            </View>

            <View style={styles.partes}>
              <SelectScan
                label="fumante"
                selectedValue={data.fumante}
                onValueChange={(itemValue, itemIndex) =>
                  onChange("fumante", itemValue)
                }
                opitions={[
                  { label: "", value: "" },
                  { label: "sim", value: "sim" },
                  { label: "não", value: "não" },
                ]}
              />

              <SelectScan
                label="alcolatra"
                selectedValue={data.alcolatra}
                onValueChange={(itemValue, itemIndex) =>
                  onChange("alcolatra", itemValue)
                }
                opitions={[
                  { label: "", value: "" },
                  { label: "sim", value: "sim" },
                  { label: "não", value: "não" },
                  { label: "bebo socialmente", value: "bebo socialmente" },
                ]}
              />
            </View>
            <View style={styles.containerScrrol}>
              <ScrollView
                contentContainerStyle={{ padding: 20 }}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.parte2}>
                  {alergias.map((item) => (
                    <InputScale
                      key={item.id}
                      label="alergia"
                      keyboardType="numeric"
                      value={item.nome}
                      onChangeText={(text) =>
                        handleAlergiaChange(item.id, text)
                      }
                      containerStyle={{ width: 370, height: 100 }}
                      inputStyle={{ height: "100%", fontSize: 32 }}
                      labelEstilo={40}
                      position={23}
                    />
                  ))}
                </View>
                <View style={styles.parte2}>
                  <Pressable onPress={addAlergia}>
                    <View style={styles.card}>
                      <View style={styles.addFoto}>
                        <Image
                          source={require("../../../assets/adicionar.png")}
                        ></Image>
                      </View>
                      <View style={styles.addText}>
                        <Text style={styles.textCard}>Adiciona alergia</Text>
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

              <Pressable style={styles.bbotao} onPress={() => onNext()}>
                <Text style={styles.texto}>Prosseguir</Text>
              </Pressable>
            </View>
          </View>
        </View>

        <StatusBar style="auto" />
      </View>
    </View>
  );
}
