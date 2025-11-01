import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  Pressable,
  TextInput,
  ActivityIndicator,
  Image,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import api from "../api";
import styles from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InputScale from "./inputAnima";
import * as ImagePicker from "expo-image-picker";

export default function etapa1({ data, onChange, onNext }) {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const [imagem, setImagem] = useState("");
  const [modal, setModal] = useState(false);

  const solicitarPermissao = async () => {
    const camera = await ImagePicker.requestCameraPermissionsAsync();
    const galeria = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (camera.status != "granted" && galeria.status != "granted") {
      alert(
        "permissão negeda",
        "é necessario pedir permissao para acessa a camera ou a galeria"
      );
      return false;
    }

    return true;
  };

  const tirarFoto = async () => {
    const permissao = await solicitarPermissao();
    if (!permissao) return;

    const resultado = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!resultado.canceled) {
      setImagem(resultado.assets[0].uri);
    }
  };

  const escolherGaleria = async () => {
    const permissao = await solicitarPermissao();

    if (!permissao) return;

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    console.log("Resultado da imagem:", resultado.assets[0].uri);

    if (!resultado.canceled) {
      setImagem(resultado.assets[0].uri);
      onChange("foto", resultado.assets[0].uri);
    }
  };

  const formatacaoData = (text) => {
    let cleaded = text.replace(/\D/g, "");

    if (cleaded.length > 8) cleaded = cleaded.slice(0, 8);

    if (cleaded.length > 4) {
      cleaded = cleaded.replace(/(\d{2})(\d{2})(\d{1,4})/, "$1/$2/$3");
    } else if (cleaded.length > 4) {
      cleaded = cleaded.replace(/(\d{2})(\d{1,2})/, "$1/$2");
    }

    onChange("nasci", cleaded);
  };

  const formataCep = (text) => {
    let cleaded = text.replace(/\D/g, "");

    if (cleaded.length > 8) cleaded = cleaded.slice(0, 8);

    if (cleaded.length > 5) {
      cleaded = cleaded.replace(/(\d{5})(\d{1,3})/, "$1-$2");
    }

    onChange("cep", cleaded);
  };

  const buscaCep = async (cep) => {
    

    const cepV = cep.replace(/\-/g, "");

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepV}/json/`);

      const dataCep = await response.json();

      if (dataCep.erro) {
        console.log("CEP não encontrado");
        return;
      }

      onChange("bairro", dataCep.bairro || "");
      onChange("logradouro", dataCep.logradouro || "");
      onChange("uf", dataCep.uf || "");
      console.log("CEP encontrado:", dataCep);
    } catch (err) {
      console.log("Erro ao buscar CEP:", err.response?.data || err.message);
    }
  };

  const insert = async () => {
    setLoading(true);

    if (data.nome == "") {
      alert("nome invalido");
      return false;
    }

    const [dia, mes, ano] = data.nasci.split("/");

    const nascimento = `${ano}-${mes}-${dia}`;

    const cep = data.cep.replace(/\-/g, "");

    const usuario = new FormData();

    if (imagem) {
      usuario.append("foto", {
        uri: imagem,
        name: "image.png",
        type: "image/png",
      });
    }

    usuario.append("inputNome", data.nome);
    usuario.append("inputEmail", data.email);
    usuario.append("inputNasci", nascimento);
    usuario.append("inputCep", cep);
    usuario.append("inputLogra", data.logradouro);
    usuario.append("inputNumero", data.num);
    usuario.append("inputBairro", data.bairro);
    usuario.append("inputUf", data.uf);


    try {
   

      const response = await fetch("http://10.0.2.2:8000/api/cadastra-etapa1", {
        method: "POST",
        body: usuario,
      });



      const resData = await response.json();
      if (!response.ok) {
        throw new Error(JSON.stringify(errorData));
      }

      console.log("etapa1 feita", resData);
      await AsyncStorage.setItem("usuario", JSON.stringify(resData));
      onNext();
    } catch (error) {
      console.log("erro na etapa1", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="blue" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.containeretapa}>
        <View style={styles.titulo}>
          <Pressable
            style={styles.X}
            onPress={() => navigation.navigate("Login")}
          ></Pressable>
        </View>
        <View style={styles.campoInputs}>
          <View style={styles.imagem}>
            <Pressable style={styles.imagem2} onPress={() => setModal(true)}>
              {imagem == "" ? (
                <Image
                  style={styles.img}
                  source={require("../../../assets/perfilPng.png")}
                ></Image>
              ) : (
                <Image style={styles.img} source={{ uri: imagem }}></Image>
              )}
            </Pressable>
          </View>
          <View style={styles.conjunto}>
            <View style={styles.partes}>
              <InputScale
                label=" nome"
                value={data.nome}
                onChangeText={(text) => onChange("nome", text)}
              />
              <InputScale
                label="data de nasc."
                keyboardType="numeric"
                value={data.nasci}
                onChangeText={(text) => formatacaoData(text)}
              />
            </View>

            <View style={styles.partes}>
              <InputScale
                label="email"
                value={data.email}
                onChangeText={(text) => onChange("email", text)}
                containerStyle={{ width: "92%" }}
              />
            </View>

            <View style={styles.partes}>
              <InputScale
                label="cep"
                value={data.cep}
                onChangeText={(text) => formataCep(text)}
                onBlur={() => buscaCep(data.cep)}
              />

              <InputScale
                label="numero"
                value={data.num}
                onChangeText={(text) => onChange("num", text)}
              />
            </View>

            <View style={styles.partes}>
              <InputScale
                label="bairro"
                value={data.bairro}
                onChangeText={(text) => onChange("bairro", text)}
              />

              <InputScale
                label="uf"
                value={data.uf}
                onChangeText={(text) => onChange("uf", text)}
              />
            </View>

            <View style={styles.partes}>
              <InputScale
                label="endereço"
                value={data.logradouro}
                onChangeText={(text) => onChange("logradouro", text)}
                containerStyle={{ width: "92%" }}
              />
            </View>
          </View>

          <View style={styles.botoes}>
            <Pressable
              style={styles.botao2}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.texto}>Voltar</Text>
            </Pressable>
            <Pressable style={styles.bbotao} onPress={() => insert()}>
              <Text style={styles.texto}>Prosseguir</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <StatusBar style="auto" />

      <Modal transparent={true} visible={modal}>
        <View style={styles.containerModal}>
          <Pressable style={styles.x} onPress={() => setModal(false)}>
            <Image source={require("../../../assets/marca-x.png")}></Image>
          </Pressable>
          <View style={styles.escolherFoto}>
            <View style={styles.dividir}>
              <Pressable onPress={() => tirarFoto()}>
                <Image source={require("../../../assets/camera.png")}></Image>
              </Pressable>
            </View>

            <View style={styles.dividir}>
              <Pressable onPress={() => escolherGaleria()}>
                <Image source={require("../../../assets/galeria.png")}></Image>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
