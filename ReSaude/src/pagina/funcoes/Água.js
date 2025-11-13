import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  Image,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import React, { useRef } from "react";
import styles from "./styleÁgua";

export default function App() {
  const navigation = useNavigation();
  const [peso, setPeso] = useState("");
  const [agua, setAgua] = useState(null);
  const [loading, setLoading] = useState(false);
  const [capacidadeMaxima, setCapacidadeMaxima] = useState();
  const [aguaConsumida, setAguaConsumida] = useState(0); // em ml

  const nivelAgua = useRef(new Animated.Value(0)).current;
  //  const capacidadeMaxima = 2000; // 2000ml = 2 litros (capacidade do copo)

  const adicionarAgua = (quantidadeMl) => {
    const novaQuantidade = aguaConsumida + quantidadeMl;

    // Não deixa ultrapassar a capacidade máxima
    if (novaQuantidade > capacidadeMaxima) {
      alert("O copo está cheio!");
      return;
    }

    setAguaConsumida(novaQuantidade);

    // Calcula a proporção para a animação (ex: 500/2000 = 0.25)
    const proporcao = novaQuantidade / capacidadeMaxima;

    Animated.timing(nivelAgua, {
      toValue: proporcao,
      duration: 800,
      useNativeDriver: false,
    }).start();
  };

  const resetarCopo = () => {
    setAguaConsumida(0);
    Animated.timing(nivelAgua, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  // Interpolação de 0% até 100% da altura
  const alturaInterpolada = nivelAgua.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  const calcularAgua = () => {
    if (!peso) {
      alert("Digite o peso");
      return;
    }

    const pesoNumero = parseFloat(peso.replace(",", "."));

    if (isNaN(pesoNumero) || pesoNumero <= 0) {
      alert("Digite um peso válido");
      return;
    }

    setLoading(true);

    // Cálculo: 35ml por kg de peso
    const aguaMl = pesoNumero * 35;
    const aguaLitros = Number((aguaMl / 1000).toFixed(1));

    setCapacidadeMaxima(aguaMl);
    setAgua(aguaLitros);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerAgua}>
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

        <View style={styles.containerCalcular}>
          <View style={styles.botoes}>
            <Text style={styles.label}>Qual seu peso? (kg)</Text>
            <TextInput
              style={styles.input}
              value={peso}
              onChangeText={setPeso}
              placeholder="Ex: 70"
              keyboardType="numeric"
              placeholderTextColor="#999"
            />

            <Pressable
              style={[styles.botao, (!peso || loading) && styles.botaoDisabled]}
              onPress={calcularAgua}
              disabled={!peso || loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.txt}>Calcular</Text>
              )}
            </Pressable>

            {agua !== null && (
              <View style={styles.resultadoContainer}>
                <Text style={styles.resultadoTexto}>
                  Meta diária:{" "}
                  <Text style={styles.resultadoDestaque}>{agua}L</Text>
                </Text>
                <Text style={styles.consumoTexto}>
                  Consumido:{" "}
                  <Text style={styles.consumoDestaque}>{aguaConsumida}ml</Text>
                </Text>
              </View>
            )}
          </View>

          <View style={styles.containerMostra}>
            <View style={styles.card}>
              <Text style={styles.copoLabel}>Controle de Consumo</Text>

              <View style={styles.copoContainer}>
                <View style={styles.copo}>
                  <Animated.View
                    style={[styles.agua, { height: alturaInterpolada }]}
                  />
                  <View style={styles.nivelMarcacao}>
                    <Text style={styles.marcacaoTexto}>2L</Text>
                    <Text style={styles.marcacaoTexto}>1.5L</Text>
                    <Text style={styles.marcacaoTexto}>1L</Text>
                    <Text style={styles.marcacaoTexto}>0.5L</Text>
                  </View>
                </View>
              </View>

              <View style={styles.botoesControle}>
                <Pressable
                  style={styles.botaoMl}
                  onPress={() => adicionarAgua(100)}
                >
                  <Text style={styles.texto}>+100ml</Text>
                </Pressable>

                <Pressable
                  style={styles.botaoMl}
                  onPress={() => adicionarAgua(200)}
                >
                  <Text style={styles.texto}>+200ml</Text>
                </Pressable>

                <Pressable
                  style={styles.botaoMl}
                  onPress={() => adicionarAgua(500)}
                >
                  <Text style={styles.texto}>+500ml</Text>
                </Pressable>
              </View>

              <View style={styles.botoesAcao}>
                <Pressable style={styles.botaoSecundario} onPress={resetarCopo}>
                  <Text style={styles.textoSecundario}>Esvaziar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
