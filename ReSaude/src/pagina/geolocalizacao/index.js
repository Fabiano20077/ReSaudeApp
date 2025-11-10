import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  Pressable,
  Image,
  ActivityIndicator,
  Modal,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import style from "./style";

export default function App() {
  const navigation = useNavigation();

  const [filtroBusca, setFiltroBusca] = useState("");
  const [select, setSelect] = useState([]);

  const [location, setLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permissão para acessar a localização foi negada");
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc.coords);

        const query = `
          [out:json];
          (
            node["amenity"="hospital"](around:50000,${loc.coords.latitude},${loc.coords.longitude});
            node["amenity"="clinic"](around:50000,${loc.coords.latitude},${loc.coords.longitude});
            node["amenity"="doctors"](around:50000,${loc.coords.latitude},${loc.coords.longitude});
            node["healthcare"="hospital"](around:50000,${loc.coords.latitude},${loc.coords.longitude});
            node["healthcare"="clinic"](around:50000,${loc.coords.latitude},${loc.coords.longitude});
            node["healthcare"="doctor"](around:50000,${loc.coords.latitude},${loc.coords.longitude});
          );
          out;
        `;

        const response = await fetch(
          "https://overpass-api.de/api/interpreter",
          {
            method: "POST",
            body: query,
          }
        );

        const data = await response.json();

        if (data.elements) {
          setPlaces(data.elements);
          console.log(`Encontrados ${data.elements.length} estabelecimentos`);
        } else {
          alert("erro ");
        }
      } catch (erro) {
        console.log(erro);
        alert("erro busca locais");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <View style={style.container}>
      <StatusBar style="auto" />
      <View style={style.containerGeo}>
        {location && (
          <MapView
            style={style.mapa}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
            mapType="standard" // standard, satellite, hybrid, terrain
            showsUserLocation={true}
            showsMyLocationButton={true}
            showsCompass={true}
            showsScale={true}
            zoomEnabled={true}
            scrollEnabled={true}
            rotateEnabled={true}
          >
            {/* marcador do usuário */}
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="Você está aqui"
              pinColor="blue"
            />

            {/* marcadores dos locais */}
            {places.map((p, i) => (
              <Marker
                key={i}
                coordinate={{
                  latitude: p.lat,
                  longitude: p.lon,
                }}
                title={p.tags?.name || "Local de saúde"}
                description={p.tags?.amenity || ""}
                pinColor="red"
              />
            ))}
          </MapView>
        )}

        <Pressable
          style={style.flu}
          onPress={() => navigation.navigate("Dashboard")}
        >
          <Image
            style={style.imgPerfil}
            source={require("../../../assets/seta-esquerda.png")}
          ></Image>
        </Pressable>
      </View>

      <Modal transparent={loading} visible={loading}>
        <View style={style.containerModal}>
          <ActivityIndicator size="large" color="blue" />
          <Text style={{ color: "white", fontSize: 20 }}>Carregando...</Text>
        </View>
      </Modal>
    </View>
  );
}
