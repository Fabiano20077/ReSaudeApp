import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import { useState, useEffect } from "react";
import styles from "./style";
import InputScale from "./inputAnima";
import SelectScan from "./select";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function etapa2({ data, onChange, onNext, onBack }) {
  const [loading, setLoading] = useState(false);

  const [labels, setLabels] = useState({
    peso: "Peso",
    altura: "Altura",
    diabetico: "Diabetico",
    fumante: "Fumante",
    alcolatra: "Alcolatra",
    sangue: "Sangue",
    alergia: "Alergia",
  });

  const resetLabel = () => {
    setLabels({
      peso: "Peso",
      altura: "Altura",
      diabetico: "Diabetico",
      fumante: "Fumante",
      alcolatra: "Alcolatra",
      sangue: "Sangue",
      alergia: "Alergia",
    });
  };

  const validacao = () => {
    setLoading(true);
    resetLabel();

    const obrigadorio = [
      "peso",
      "altura",
      "diabetico",
      "fumante",
      "alcolatra",
      "sangue",
    ];

    let erros = false;

    obrigadorio.forEach((campo) => {
      if (data[campo] === "") {
        erroLabel(campo, `${campo} invalido`);
        erros = true;
      }
    });

    if (erros == true) {
      setLoading(false);
      return false;
    }

    insert();
  };

  const erroLabel = (campo, msg) => {
    setLabels((prev) => ({
      ...prev,
      [campo]: msg,
    }));
  };

  const formataAltura = (text) => {
    let cleaded = text.replace(/\D/g, "");

    if (cleaded.length > 3) cleaded = cleaded.slice(0, 3);

    if (cleaded.length > 1) {
      cleaded = cleaded.replace(/(\d{1})(\d{1,2})/, "$1.$2");
    }

    onChange("altura", cleaded);
  };

  const [alergias, setAlergias] = useState([{ id: 1, nome: "" }]);

  const addAlergia = () => {
    setAlergias((prev) => [...prev, { id: Date.now(), nome: "" }]);
  };

  const handleAlergiaChange = (id, valor) => {
    /*  setAlergias((prev) =>
      prev.map((item) => (item.id === id ? { ...item, nome: valor } : item))
    ); */

    const atualizar = alergias.map((item) =>
      item.id === id ? { ...item, nome: valor } : item
    );

    console.log(atualizar);

    setAlergias(atualizar);
    onChange("alergia", atualizar);
  };

  const insert = async () => {
    setLoading(true);

    const alturaF = data.altura.replace(/\./g, "");
    const usuario = new FormData();

    usuario.append("peso", data.peso);
    usuario.append("altura", alturaF);
    usuario.append("sangue", data.sangue);
    usuario.append("diabetico", data.diabetico);
    usuario.append("fumante", data.fumante);
    usuario.append("alcolatra", data.alcolatra);
    usuario.append("alergia", JSON.stringify(data.alergia));

    console.log(data.alergia);

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

      console.log("etapa2 feita", resData);
      await AsyncStorage.setItem("usuario", JSON.stringify(resData));
      onNext();
    } catch (error) {
      console.log("erro etapa2", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containeretapa}>
        <View style={styles.titulo}></View>

        <View style={styles.campoInputs}>
          <View style={styles.conjunto}>
            <View style={styles.partes}>
              <InputScale
                label={labels.peso}
                labelEstilo2={
                  labels.peso.includes("invalido") ? "red" : "black"
                }
                value={data.peso}
                onChangeText={(text) => onChange("peso", text)}
              />

              <InputScale
                label={labels.altura}
                labelEstilo2={
                  labels.altura.includes("invalido") ? "red" : "black"
                }
                value={data.altura}
                onChangeText={(text) => formataAltura(text)}
              />
            </View>

            <View style={styles.partes}>
              <SelectScan
                label={labels.sangue}
                labelEstilo2={
                  labels.sangue.includes("invalido") ? "red" : "black"
                }
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
                label={labels.diabetico}
                labelEstilo2={
                  labels.diabetico.includes("invalido") ? "red" : "black"
                }
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
                label={labels.fumante}
                labelEstilo2={
                  labels.fumante.includes("invalido") ? "red" : "black"
                }
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
                label={labels.alcolatra}
                labelEstilo2={
                  labels.alcolatra.includes("invalido") ? "red" : "black"
                }
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
                      label={labels.alergia}
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

              <Pressable style={styles.bbotao} onPress={() => validacao()}>
                <Text style={styles.texto}>Prosseguir</Text>
              </Pressable>
            </View>
          </View>
        </View>

        <StatusBar style="auto" />
      </View>

      <Modal transparent={loading} visible={loading}>
        <View style={styles.containerModal}>
          <ActivityIndicator size="large" color="blue" />
          <Text style={{ color: "white", fontSize: 20 }}>Carregando...</Text>
        </View>
      </Modal>
    </View>
  );
}
