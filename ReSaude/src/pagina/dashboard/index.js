import { StatusBar } from "expo-status-bar";
import { View, Text, Pressable, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api";
import styles from "./style";

export default function App() {
  const navigation = useNavigation();

  const apagarLocal = async () => {
    try {
      await AsyncStorage.removeItem("usuario");
      console.log("apagado no local");
      navigation.navigate("Login");
    } catch (erro) {
      console.log("erro");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerDashboard}>
        <View style={styles.nav}>
          {/*   <Pressable onPress={() => apagarLocal()}>
            <Text style={styles.txt}>volta</Text>
          </Pressable> */}

          <Pressable onPress={() => navigation.navigate("Perfil")}>
            <Image
              style={styles.imgPerfil}
              source={require("../../../assets/barras.png")}
            ></Image>
          </Pressable>
        </View>

        <View style={styles.corpo}>
          
            <Pressable
              style={styles.card}
              onPress={() => navigation.navigate("Calorias")}
            >
              <Image source={require('../../../assets/calorias.png')} ></Image>
            </Pressable>

            <Pressable
              style={styles.card}
              onPress={() => navigation.navigate("Imc")}
            >
              <Image source={require('../../../assets/imc.png')} ></Image>
            </Pressable>

            <Pressable
              style={styles.card}
              onPress={() => navigation.navigate("Água")}
            >
               <Image source={require('../../../assets/agua.png')} ></Image>
            </Pressable>

            <Pressable
              style={styles.card}
              onPress={() => navigation.navigate("Sangue")}
            >
              <Text style={styles.txt}>Sangue</Text>
            </Pressable>

            <Pressable
              style={styles.card}
              onPress={() => navigation.navigate("Vacinas")}
            >
              <Text style={styles.txt}>Vacinas</Text>
            </Pressable>

            <Pressable
              style={styles.card}
              onPress={() => navigation.navigate("geolocalizacao")}
            >
              <Text>mapa</Text>
            </Pressable>
         
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
