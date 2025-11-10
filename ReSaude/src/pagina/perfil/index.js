import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  Pressable,
  Image,
  Modal,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import SelectScan from "../cadastro/select";
import InputScale from "../cadastro/inputAnima";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function App() {
  const navigation = useNavigation();

  const [modal, setModal] = useState(false);

  const [id, setId] = useState("");
  const [nome, setnome] = useState("");
  const [email, setEmail] = useState("");
  const [nasci, setNasci] = useState("");
  const [senha, setSenha] = useState("");
  const [imagem, setImagem] = useState();
  const [loading, setLoading] = useState(false);
  const [textoLogin, setTextLogin] = useState(false);
  const [step, setStep] = useState(1);
  const [alergias, setAlergias] = useState([{ id: 1, nome: "" }]);
  const [remedio, setRemedio] = useState([{ id: 1, nome: "" }]);
  const [doencas, setDoencas] = useState([{ id: 1, nome: "" }]);

  const [labels, setLabels] = useState({
    nome: "Nome",
    nasci: "Data de nasc",
    email: "Email",
    cep: "Cep",
    num: "Numero",
    bairro: "Bairro",
    uf: "Uf",
    logradouro: "Endereço",
    peso: "Peso",
    altura: "Altura",
    diabetico: "Diabetico",
    fumante: "Fumante",
    alcolatra: "Alcolatra",
    sangue: "Sangue",
    alergia: "Alergia",
  });

  const [data, setData] = useState({
    nome: "",
    nasci: "",
    email: "",
    cep: "",
    num: "",
    bairro: "",
    uf: "",
    logradouro: "",
    peso: "",
    altura: "",
    diabetico: "",
    fumante: "",
    alcolatra: "",
    sangue: "",
    alergia: [],
  });

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

  const addAlergia = () => {
    setAlergias((prev) => [...prev, { id: Date.now(), nome: "" }]);
  };

  const addRemedio = () => {
    setRemedio((prev) => [...prev, { id: Date.now(), nome: "" }]);
  };

  const handleAlergiaChange2 = (id, valor) => {
    const atualizar = remedio.map((item) =>
      item.id === id ? { ...item, nome: valor } : item
    );

    setRemedio(atualizar);
    onChange("remedios", atualizar);
  };

  const addDoencas = () => {
    setDoencas((prev) => [...prev, { id: Date.now(), nome: "" }]);
  };

  const handleAlergiaChange3 = (id, valor) => {
    const atualizar = doencas.map((item) =>
      item.id === id ? { ...item, nome: valor } : item
    );

    setDoencas(atualizar);
    onChange("doencas", atualizar);
  };

  const mudar = (numero) => setStep(numero);

  useEffect(() => {
    const vemId = async () => {
      const valor = await AsyncStorage.getItem("usuario");
      const array = JSON.parse(valor);
      setId(array.user["id"]);
      const userId = array.user["id"];

      try {
        setLoading(true);

        const res = await fetch(
          `http://10.0.2.2:8000/api/chamar-usuario/${userId}`
        );

        console.log(res);

        if (!res.ok) {
          throw new Error("Erro na resposta da rede");
        }

        const data = await res.json();

        console.log("funfo", data);

        setData({
          nome: data.user.nome,
          nasci: data.user.nascimento,
          email: data.user.email,
          cep: data.user.cep,
          num: data.user.numero,
          bairro: data.user.bairro,
          uf: data.user.uf,
          logradouro: data.user.logra,
          peso: data.user.peso,
          altura: data.user.altura,
          diabetico: data.user.diabetico,
          fumante: data.user.fumante,
          alcolatra: data.user.alcolatra,
          sangue: data.user.sangue,
          alergia: data.user.alergia,
        });

        setTextLogin(false);
      } catch (error) {
        console.log("erro", error.message);
      } finally {
        setLoading(false);
      }
    };

    vemId();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.containerPerfil}>
        <View style={styles.nav}>
          <Pressable onPress={() => navigation.navigate("Dashboard")}>
            <Image
              style={styles.imgPerfil}
              source={require("../../../assets/seta-esquerda.png")}
            ></Image>
          </Pressable>
        </View>
        <View style={styles.containerDois}>
          <View style={styles.containerImage}>
            <Image
              style={styles.foto}
              source={require("../../../assets/perfilPng.png")}
            ></Image>
          </View>
          <View style={styles.dados}>
            <Text style={styles.textNome}>{nome}</Text>
            <Text style={styles.textEmail}>{email}</Text>
          </View>
        </View>
        <View style={styles.opcoes}>
          <View style={styles.opcao}>
            <Pressable onPress={() => setModal(true)}>
              <Text style={styles.txt}>Editar</Text>
            </Pressable>
          </View>
          <View style={styles.opcao}>
            <Pressable onPress={() => deleta()}>
              <Text style={styles.txtA}>Apagar</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <Modal transparent={true} visible={modal}>
        <View style={styles.containerModal}>
          <View style={styles.containerEdita}>
            <View style={styles.nav2}>
              <Pressable onPress={() => mudar(1)}>
                <Text style={styles.text}>etapa 1</Text>
              </Pressable>
              <Pressable onPress={() => mudar(2)}>
                <Text style={styles.text}>etapa 2</Text>
              </Pressable>
              <Pressable onPress={() => mudar(3)}>
                <Text style={styles.text}>etapa 3</Text>
              </Pressable>
              <Pressable onPress={() => mudar(4)}>
                <Text style={styles.text}>etapa 4</Text>
              </Pressable>
              <Pressable onPress={() => mudar(5)}>
                <Text style={styles.text}>etapa 5</Text>
              </Pressable>
            </View>
            <View style={styles.containerDados}>
              {step == 1 ? (
                <>
                  <View style={styles.partes}>
                    <InputScale
                      label={labels.nome}
                      labelEstilo2={
                        labels.nome.includes("invalido") ? "red" : "black"
                      }
                      value={data.nome}
                      onChangeText={(text) => onChange("nome", text)}
                    />

                    <InputScale
                      label={labels.nasci}
                      labelEstilo2={
                        labels.nasci.includes("invalido") ? "red" : "black"
                      }
                      keyboardType="numeric"
                      value={data.nasci}
                      onChangeText={(text) => formatacaoData(text)}
                    />
                  </View>

                  <View style={styles.partes}>
                    <InputScale
                      label={labels.email}
                      labelEstilo2={
                        labels.email.includes("invalido") ? "red" : "black"
                      }
                      value={data.email}
                      onChangeText={(text) => onChange("email", text)}
                      containerStyle={{ width: "92%" }}
                    />
                  </View>

                  <View style={styles.partes}>
                    <InputScale
                      label={labels.cep}
                      labelEstilo2={
                        labels.cep.includes("invalido") ? "red" : "black"
                      }
                      value={data.cep}
                      onChangeText={(text) => formataCep(text)}
                    />

                    <InputScale
                      label={labels.num}
                      labelEstilo2={
                        labels.num.includes("invalido") ? "red" : "black"
                      }
                      value={data.num}
                      onChangeText={(text) => onChange("num", text)}
                    />
                  </View>

                  <View style={styles.partes}>
                    <InputScale
                      label={labels.bairro}
                      labelEstilo2={
                        labels.bairro.includes("invalido") ? "red" : "black"
                      }
                      value={data.bairro}
                      onChangeText={(text) => onChange("bairro", text)}
                    />

                    <InputScale
                      label={labels.uf}
                      labelEstilo2={
                        labels.uf.includes("invalido") ? "red" : "black"
                      }
                      value={data.uf}
                      onChangeText={(text) => onChange("uf", text)}
                    />
                  </View>

                  <View style={styles.partes}>
                    <InputScale
                      label={labels.logradouro}
                      labelEstilo2={
                        labels.logradouro.includes("invalido") ? "red" : "black"
                      }
                      value={data.logradouro}
                      onChangeText={(text) => onChange("logradouro", text)}
                      containerStyle={{ width: "92%" }}
                    />
                  </View>
                </>
              ) : step == 2 ? (
                <>
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
                        {
                          label: "bebo socialmente",
                          value: "bebo socialmente",
                        },
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
                            containerStyle={{ width: "100%", height: 50 }}
                            inputStyle={{ height: "100%", fontSize: 22 }}
                            labelEstilo={20}
                            position={13}
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
                              <Text style={styles.textCard}>
                                Adiciona alergia
                              </Text>
                            </View>
                          </View>
                        </Pressable>
                      </View>
                    </ScrollView>
                  </View>
                </>
              ) : step == 3 ? (
                <>
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
                            onChangeText={(text) =>
                              handleAlergiaChange2(item.id, text)
                            }
                            containerStyle={{ width: "100%", height: 50 }}
                            inputStyle={{ height: "100%", fontSize: 32 }}
                            labelEstilo={20}
                            position={20}
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
                              <Text style={styles.textCard}>
                                Adiciona remedios
                              </Text>
                            </View>
                          </View>
                        </Pressable>
                      </View>
                    </ScrollView>
                  </View>
                </>
              ) : step == 4 ? (
                <>
                  <View style={styles.addContainer}>
                    <ScrollView
                      style={{ gap: 20 }}
                      showsVerticalScrollIndicator={false}
                    >
                      <View style={styles.parte2}>
                        {doencas.map((item) => (
                          <InputScale
                            key={item.id}
                            label="doenças"
                            keyboardType="numeric"
                            value={item.nome}
                            onChangeText={(text) =>
                              handleAlergiaChange(item.id, text)
                            }
                            containerStyle={{ width: "100%", height: 50 }}
                            inputStyle={{ height: "100%", fontSize: 32 }}
                            labelEstilo={20}
                            position={20}
                          />
                        ))}
                      </View>
                      <View style={styles.parte2}>
                        <Pressable onPress={addDoencas}>
                          <View style={styles.card}>
                            <View style={styles.addFoto}>
                              <Image
                                source={require("../../../assets/adicionar.png")}
                              ></Image>
                            </View>
                            <View style={styles.addText}>
                              <Text style={styles.textCard}>
                                Adiciona doenças
                              </Text>
                            </View>
                          </View>
                        </Pressable>
                      </View>
                    </ScrollView>
                  </View>
                </>
              ) : step == 5 ? (
                <></>
              ) : null}

              <View style={styles.botoes}>
                <Pressable
                  style={styles.botao2}
                  onPress={() => setModal(false)}
                >
                  <Text style={styles.letraBotao}>fecha</Text>
                </Pressable>
                <Pressable style={styles.botao} onPress={() => update()}>
                  <Text style={styles.letraBotao}>salva</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal transparent={loading} visible={loading}>
        <View style={styles.containerModal}>
          <ActivityIndicator size="large" color="blue" />
          <Text style={{ color: "white", fontSize: 20 }}>Carregando...</Text>
        </View>
      </Modal>
    </View>
  );
}
