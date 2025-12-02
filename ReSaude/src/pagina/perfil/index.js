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
import api from "../api";

export default function App() {
  const navigation = useNavigation();

  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");
  const [imagem, setImagem] = useState();
  const [loading, setLoading] = useState(false);
  const [textoLogin, setTextLogin] = useState(false);
  const [step, setStep] = useState(1);
  const [alergias, setAlergias] = useState([{ id: 1, nome: "" }]);
  const [remedio, setRemedio] = useState([{ id: 1, nome: "" }]);
  const [doencas, setDoencas] = useState([{ id: 1, nome: "" }]);

  const [labels, setLabels] = useState({
    nome: "Nome",
    nasci: "Data de nascimento",
    email: "Email",
    cep: "CEP",
    num: "Número",
    bairro: "Bairro",
    uf: "UF",
    logradouro: "Endereço",
    peso: "Peso (kg)",
    altura: "Altura (m)",
    diabetico: "Diabético",
    fumante: "Fumante",
    alcolatra: "Alcoolatra",
    sangue: "Tipo Sanguíneo",
    alergia: "Alergia",
    senhaA: "Senha Antiga",
    senhaN: "Nova Senha",
    senhaC: "Confirmar Senha",
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
    senhaA: "",
    senhaN: "",
    senhaC: "",
  });

  const handleAlergiaChange = (id, valor) => {
    const atualizar = alergias.map((item) =>
      item.id === id ? { ...item, nome: valor } : item
    );
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
          `${api}/chamar-usuario/${userId}`
        );

        if (!res.ok) {
          throw new Error("Erro na resposta da rede");
        }

        const data = await res.json();

        const safeParse = (valor) => {
          try {
            if (typeof valor === "string") {
              return JSON.parse(valor);
            }
            if (Array.isArray(valor)) {
              return valor;
            }
            return [];
          } catch (e) {
            console.log("Erro ao parsear:", e);
            return [];
          }
        };

        const alergiasUsuario = safeParse(data.user.alergia);
        const remedeiosUsuarios = safeParse(data.user.remedios);
        const doencasUsuarios = safeParse(data.user.doencas);

        setAlergias(alergiasUsuario);
        setRemedio(remedeiosUsuarios);
        setDoencas(doencasUsuarios);
        setImagem(data.user.img);

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

  const onChange = (campo, valor) => {
    setData((prev) => ({ ...prev, [campo]: valor }));
  };

  const update = async () => {
    setLoading(true);

    if (data.senhaN && data.senhaN !== data.senhaC) {
      alert("As senhas não coincidem!");
      setLoading(false);
      return;
    }

    if (
      (data.senhaA || data.senhaN || data.senhaC) &&
      (!data.senhaA || !data.senhaN || !data.senhaC)
    ) {
      alert("Para alterar a senha, preencha todos os campos de senha!");
      setLoading(false);
      return;
    }

    try {
      const array = await AsyncStorage.getItem("usuario");
      const user = JSON.parse(array);
      
      const usuario = new FormData();
      usuario.append("nome", data.nome);
      usuario.append("email", data.email);
      usuario.append("nascimento", data.nasci);
      usuario.append("cep", data.cep);
      usuario.append("logra", data.logradouro);
      usuario.append("numero", data.num);
      usuario.append("bairro", data.bairro);
      usuario.append("uf", data.uf);
      usuario.append("peso", data.peso);
      usuario.append("altura", data.altura);
      usuario.append("sangue", data.sangue);
      usuario.append("diabetico", data.diabetico);
      usuario.append("fumante", data.fumante);
      usuario.append("alcolatra", data.alcolatra);
      usuario.append("alergia", JSON.stringify(alergias));
      usuario.append("remedios", JSON.stringify(remedio));
      usuario.append("doencas", JSON.stringify(doencas));
      
      if (data.senhaA) {
        usuario.append("senhaA", data.senhaA);
        usuario.append("senhaN", data.senhaN);
      }

      const response = await fetch(
        `${api}/updatePerfil/${user.user["id"]}`,
        {
          method: "POST",
          body: usuario,
        }
      );

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(JSON.stringify(resData));
      }

      alert("Perfil atualizado com sucesso!");
      setModal(false);
    } catch (erro) {
      console.log("erro", erro.message);
      alert("Erro ao atualizar perfil: " + erro.message);
    } finally {
      setLoading(false);
    }
  };

  const deleta = async () => {
    alert("Função de deletar conta em desenvolvimento");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.containerPerfil}>
        <View style={styles.nav}>
          <Pressable 
            style={styles.backButton}
            onPress={() => navigation.navigate("Dashboard")}
          >
            <Image
              style={styles.backIcon}
              source={require("../../../assets/seta-esquerda.png")}
            />
          </Pressable>
        </View>
        
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source={
                imagem
                  ? { uri: `http://10.0.2.2:8000${imagem}` }
                  : require("../../../assets/perfilPng.png")
              }
              onError={(e) => {
                console.log("Erro ao carregar imagem:", e.nativeEvent.error);
              }}
              resizeMode="cover"
            />
            <View style={styles.editBadge}>
              <Text style={styles.editBadgeText}>✏️</Text>
            </View>
          </View>
          
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{data.nome}</Text>
            <Text style={styles.userEmail}>{data.email}</Text>
            <View style={styles.userStats}>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{alergias.length}</Text>
                <Text style={styles.statLabel}>Alergias</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{remedio.length}</Text>
                <Text style={styles.statLabel}>Medicamentos</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{doencas.length}</Text>
                <Text style={styles.statLabel}>Condições</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.actions}>
          <Pressable 
            style={styles.primaryButton}
            onPress={() => setModal(true)}
          >
            <Text style={styles.primaryButtonText}>Editar Perfil</Text>
          </Pressable>
          <Pressable 
            style={styles.secondaryButton}
            onPress={deleta}
          >
            <Text style={styles.secondaryButtonText}>Excluir Conta</Text>
          </Pressable>
        </View>
      </View>

      {/* Modal de Edição */}
      <Modal transparent={true} visible={modal} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Editar Perfil</Text>
              <Pressable onPress={() => setModal(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </Pressable>
            </View>

            <View style={styles.stepsContainer}>
              {[1, 2, 3, 4, 5].map((stepNum) => (
                <Pressable
                  key={stepNum}
                  style={[
                    styles.step,
                    step === stepNum && styles.activeStep
                  ]}
                  onPress={() => mudar(stepNum)}
                >
                  <Text style={[
                    styles.stepText,
                    step === stepNum && styles.activeStepText
                  ]}>
                    {stepNum}
                  </Text>
                </Pressable>
              ))}
            </View>

            <ScrollView style={styles.modalContent}>
              {step === 1 && (
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>Informações Pessoais</Text>
                  
                  <View style={styles.inputRow}>
                    <InputScale
                      label={labels.nome}
                      value={data.nome}
                      onChangeText={(text) => onChange("nome", text)}
                      containerStyle={styles.inputField}
                    />
                    <InputScale
                      label={labels.nasci}
                      keyboardType="numeric"
                      value={data.nasci}
                      onChangeText={(text) => onChange("nasci", text)}
                      containerStyle={styles.inputField}
                    />
                  </View>

                  <InputScale
                    label={labels.email}
                    value={data.email}
                    onChangeText={(text) => onChange("email", text)}
                    containerStyle={styles.fullInput}
                  />

                  <View style={styles.inputRow}>
                    <InputScale
                      label={labels.cep}
                      value={data.cep}
                      onChangeText={(text) => onChange("cep", text)}
                      containerStyle={styles.inputField}
                    />
                    <InputScale
                      label={labels.num}
                      value={data.num}
                      onChangeText={(text) => onChange("num", text)}
                      containerStyle={styles.inputField}
                    />
                  </View>

                  <View style={styles.inputRow}>
                    <InputScale
                      label={labels.bairro}
                      value={data.bairro}
                      onChangeText={(text) => onChange("bairro", text)}
                      containerStyle={styles.inputField}
                    />
                    <InputScale
                      label={labels.uf}
                      value={data.uf}
                      onChangeText={(text) => onChange("uf", text)}
                      containerStyle={styles.inputField}
                    />
                  </View>

                  <InputScale
                    label={labels.logradouro}
                    value={data.logradouro}
                    onChangeText={(text) => onChange("logradouro", text)}
                    containerStyle={styles.fullInput}
                  />
                </View>
              )}

              {step === 2 && (
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>Saúde Básica</Text>
                  
                  <View style={styles.inputRow}>
                    <InputScale
                      label={labels.peso}
                      value={data.peso}
                      onChangeText={(text) => onChange("peso", text)}
                      containerStyle={styles.inputField}
                    />
                    <InputScale
                      label={labels.altura}
                      value={data.altura}
                      onChangeText={(text) => onChange("altura", text)}
                      containerStyle={styles.inputField}
                    />
                  </View>

                  <View style={styles.inputRow}>
                    <SelectScan
                      label={labels.sangue}
                      selectedValue={data.sangue}
                      onValueChange={(itemValue) => onChange("sangue", itemValue)}
                      opitions={[
                        { label: "Selecione", value: "" },
                        { label: "A+", value: "A+" },
                        { label: "A-", value: "A-" },
                        { label: "B+", value: "B+" },
                        { label: "B-", value: "B-" },
                        { label: "AB+", value: "AB+" },
                        { label: "AB-", value: "AB-" },
                        { label: "O+", value: "O+" },
                        { label: "O-", value: "O-" },
                      ]}
                      containerStyle={styles.inputField}
                    />
                    <SelectScan
                      label={labels.diabetico}
                      selectedValue={data.diabetico}
                      onValueChange={(itemValue) => onChange("diabetico", itemValue)}
                      opitions={[
                        { label: "Selecione", value: "" },
                        { label: "Sim", value: "sim" },
                        { label: "Não", value: "não" },
                      ]}
                      containerStyle={styles.inputField}
                    />
                  </View>

                  <View style={styles.inputRow}>
                    <SelectScan
                      label={labels.fumante}
                      selectedValue={data.fumante}
                      onValueChange={(itemValue) => onChange("fumante", itemValue)}
                      opitions={[
                        { label: "Selecione", value: "" },
                        { label: "Sim", value: "sim" },
                        { label: "Não", value: "não" },
                      ]}
                      containerStyle={styles.inputField}
                    />
                    <SelectScan
                      label={labels.alcolatra}
                      selectedValue={data.alcolatra}
                      onValueChange={(itemValue) => onChange("alcolatra", itemValue)}
                      opitions={[
                        { label: "Selecione", value: "" },
                        { label: "Sim", value: "sim" },
                        { label: "Não", value: "não" },
                        { label: "Socialmente", value: "bebo socialmente" },
                      ]}
                      containerStyle={styles.inputField}
                    />
                  </View>

                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Alergias</Text>
                    <ScrollView style={styles.listContainer}>
                      {alergias.map((item) => (
                        <InputScale
                          key={item.id}
                          label=""
                          value={item.nome}
                          onChangeText={(text) => handleAlergiaChange(item.id, text)}
                          containerStyle={styles.listInput}
                          placeholder="Digite uma alergia"
                        />
                      ))}
                    </ScrollView>
                    <Pressable style={styles.addButton} onPress={addAlergia}>
                      <Text style={styles.addButtonText}>+ Adicionar Alergia</Text>
                    </Pressable>
                  </View>
                </View>
              )}

              {step === 3 && (
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>Medicamentos</Text>
                  <View style={styles.section}>
                    <ScrollView style={styles.listContainer}>
                      {remedio.map((item) => (
                        <InputScale
                          key={item.id}
                          label=""
                          value={item.nome}
                          onChangeText={(text) => handleAlergiaChange2(item.id, text)}
                          containerStyle={styles.listInput}
                          placeholder="Digite um medicamento"
                        />
                      ))}
                    </ScrollView>
                    <Pressable style={styles.addButton} onPress={addRemedio}>
                      <Text style={styles.addButtonText}>+ Adicionar Medicamento</Text>
                    </Pressable>
                  </View>
                </View>
              )}

              {step === 4 && (
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>Condições de Saúde</Text>
                  <View style={styles.section}>
                    <ScrollView style={styles.listContainer}>
                      {doencas.map((item) => (
                        <InputScale
                          key={item.id}
                          label=""
                          value={item.nome}
                          onChangeText={(text) => handleAlergiaChange3(item.id, text)}
                          containerStyle={styles.listInput}
                          placeholder="Digite uma condição"
                        />
                      ))}
                    </ScrollView>
                    <Pressable style={styles.addButton} onPress={addDoencas}>
                      <Text style={styles.addButtonText}>+ Adicionar Condição</Text>
                    </Pressable>
                  </View>
                </View>
              )}

              {step === 5 && (
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>Alterar Senha</Text>
                  <View style={styles.passwordSection}>
                    <InputScale
                      label={labels.senhaA}
                      secureTextEntry
                      value={data.senhaA}
                      onChangeText={(text) => onChange("senhaA", text)}
                      containerStyle={styles.passwordInput}
                    />
                    <InputScale
                      label={labels.senhaN}
                      secureTextEntry
                      value={data.senhaN}
                      onChangeText={(text) => onChange("senhaN", text)}
                      containerStyle={styles.passwordInput}
                    />
                    <InputScale
                      label={labels.senhaC}
                      secureTextEntry
                      value={data.senhaC}
                      onChangeText={(text) => onChange("senhaC", text)}
                      containerStyle={styles.passwordInput}
                    />
                  </View>
                </View>
              )}
            </ScrollView>

            <View style={styles.modalActions}>
              <Pressable
                style={styles.cancelButton}
                onPress={() => setModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </Pressable>
              <Pressable style={styles.saveButton} onPress={update}>
                <Text style={styles.saveButtonText}>
                  {loading ? "Salvando..." : "Salvar Alterações"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal transparent={true} visible={loading}>
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF6B6B" />
            <Text style={styles.loadingText}>Salvando alterações...</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}