import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  Modal,
  TextInput,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import MapView, { Marker, Callout } from "react-native-maps";
import { useEffect, useState } from "react";
import style from "./style";

export default function App() {
  const navigation = useNavigation();

  const [filtroBusca, setFiltroBusca] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showList, setShowList] = useState(false);

  const [location, setLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
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
          const healthcarePlaces = data.elements.filter(place => 
            place.tags?.name && (place.tags.amenity || place.tags.healthcare)
          );
          setPlaces(healthcarePlaces);
          setFilteredPlaces(healthcarePlaces);
          console.log(`Encontrados ${healthcarePlaces.length} estabelecimentos`);
        } else {
          alert("Erro ao buscar estabelecimentos");
        }
      } catch (erro) {
        console.log(erro);
        alert("Erro na busca de locais");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSearch = (text) => {
    setFiltroBusca(text);
    if (text) {
      const filtered = places.filter(place =>
        place.tags?.name?.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredPlaces(filtered);
    } else {
      setFilteredPlaces(places);
    }
  };

  const focusOnPlace = (place) => {
    setSelectedPlace(place);
    setShowList(false);
  };

  const getPlaceType = (place) => {
    if (place.tags?.amenity === 'hospital' || place.tags?.healthcare === 'hospital') return '🏥 Hospital';
    if (place.tags?.amenity === 'clinic' || place.tags?.healthcare === 'clinic') return '🩺 Clínica';
    if (place.tags?.amenity === 'doctors' || place.tags?.healthcare === 'doctor') return '👨‍⚕️ Consultório';
    return '🏥 Local de Saúde';
  };

  const getPlaceTypeIcon = (place) => {
    if (place.tags?.amenity === 'hospital' || place.tags?.healthcare === 'hospital') return '🏥';
    if (place.tags?.amenity === 'clinic' || place.tags?.healthcare === 'clinic') return '🩺';
    if (place.tags?.amenity === 'doctors' || place.tags?.healthcare === 'doctor') return '👨‍⚕️';
    return '🏥';
  };

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
            region={selectedPlace ? {
              latitude: selectedPlace.lat,
              longitude: selectedPlace.lon,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            } : undefined}
            mapType="standard"
            showsUserLocation={true}
            showsMyLocationButton={true}
            showsCompass={true}
            showsScale={true}
            zoomEnabled={true}
            scrollEnabled={true}
            rotateEnabled={true}
          >
            {/* Marcador do usuário */}
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="Sua Localização"
              description="Você está aqui"
            >
              <View style={style.userMarker}>
                <View style={style.userPulse} />
                <View style={style.userMarkerIcon}>
                  <Text style={style.userMarkerText}>📍</Text>
                </View>
              </View>
            </Marker>

            {/* Marcadores dos locais de saúde */}
            {filteredPlaces.map((place, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: place.lat,
                  longitude: place.lon,
                }}
                onPress={() => setSelectedPlace(place)}
              >
                <View style={[
                  style.placeMarker,
                  selectedPlace?.id === place.id && style.selectedMarker
                ]}>
                  <Text style={style.markerIcon}>
                    {getPlaceTypeIcon(place)}
                  </Text>
                </View>
                <Callout tooltip onPress={() => setSelectedPlace(place)}>
                  <View style={style.callout}>
                    <Text style={style.calloutTitle}>
                      {place.tags?.name || "Local de Saúde"}
                    </Text>
                    <Text style={style.calloutSubtitle}>
                      {getPlaceType(place)}
                    </Text>
                    {place.tags?.phone && (
                      <Text style={style.calloutPhone}>📞 {place.tags.phone}</Text>
                    )}
                    {place.tags?.website && (
                      <Text style={style.calloutLink}>🌐 Site disponível</Text>
                    )}
                  </View>
                </Callout>
              </Marker>
            ))}
          </MapView>
        )}

        {/* Header com busca */}
        <View style={style.header}>
          <Pressable
            style={style.backButton}
            onPress={() => navigation.navigate("Dashboard")}
          >
            <View style={style.backIcon}>
              <Text style={style.backIconText}>←</Text>
            </View>
          </Pressable>
          
          <View style={style.searchContainer}>
            <TextInput
              style={style.searchInput}
              placeholder="Buscar hospitais, clínicas..."
              placeholderTextColor="#999"
              value={filtroBusca}
              onChangeText={handleSearch}
              onFocus={() => setShowList(true)}
            />
            <View style={style.searchIcon}>
              <Text style={style.searchIconText}>🔍</Text>
            </View>
          </View>

          <Pressable 
            style={style.listButton}
            onPress={() => setShowList(!showList)}
          >
            <View style={style.listIcon}>
              <Text style={style.listIconText}>☰</Text>
            </View>
          </Pressable>
        </View>

        {/* Lista de resultados */}
        {showList && (
          <View style={style.resultsList}>
            <View style={style.resultsHeader}>
              <Text style={style.resultsTitle}>
                {filteredPlaces.length} locais encontrados
              </Text>
              <Pressable onPress={() => setShowList(false)}>
                <Text style={style.closeList}>✕</Text>
              </Pressable>
            </View>
            <ScrollView style={style.scrollView}>
              {filteredPlaces.map((place, index) => (
                <Pressable
                  key={index}
                  style={[
                    style.placeItem,
                    selectedPlace?.id === place.id && style.selectedPlaceItem
                  ]}
                  onPress={() => focusOnPlace(place)}
                >
                  <View style={style.placeIcon}>
                    <Text style={style.placeTypeIcon}>
                      {getPlaceTypeIcon(place)}
                    </Text>
                  </View>
                  <View style={style.placeInfo}>
                    <Text style={style.placeName} numberOfLines={2}>
                      {place.tags?.name}
                    </Text>
                    <Text style={style.placeType}>
                      {getPlaceType(place)}
                    </Text>
                    {place.tags?.phone && (
                      <Text style={style.placePhone}>📞 {place.tags.phone}</Text>
                    )}
                  </View>
                  <View style={style.distanceBadge}>
                    <Text style={style.distanceText}>→</Text>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Botão de centralizar no usuário */}
        <Pressable 
          style={style.centerButton}
          onPress={() => setSelectedPlace(null)}
        >
          <View style={style.centerIcon}>
            <Text style={style.centerIconText}>🎯</Text>
          </View>
        </Pressable>
      </View>

      <Modal transparent={true} visible={loading}>
        <View style={style.containerModal}>
          <View style={style.loadingContent}>
            <ActivityIndicator size="large" color="#FF6B6B" />
            <Text style={style.loadingText}>Buscando locais de saúde...</Text>
            <Text style={style.loadingSubtext}>
              Procurando hospitais e clínicas próximos a você
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}