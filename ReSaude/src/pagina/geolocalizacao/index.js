import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  Modal,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import MapView, { Marker, Callout } from "react-native-maps";
import { useEffect, useState } from "react";
import style from "./style";

// Coordenadas padrão de fallback (São Paulo, por exemplo)
const DEFAULT_COORDINATES = {
  latitude: -23.5505,
  longitude: -46.6333,
};

export default function App() {
  const navigation = useNavigation();

  const [filtroBusca, setFiltroBusca] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showList, setShowList] = useState(false);

  const [location, setLocation] = useState(DEFAULT_COORDINATES);
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [usingFallbackLocation, setUsingFallbackLocation] = useState(false);

  useEffect(() => {
    getHealthcarePlaces();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg(
          "Permissão de localização negada. Usando localização padrão."
        );
        setUsingFallbackLocation(true);
        return false;
      }

      // Verificar se os serviços de localização estão habilitados
      const servicesEnabled = await Location.hasServicesEnabledAsync();
      if (!servicesEnabled) {
        setErrorMsg(
          "Serviços de localização desativados. Usando localização padrão."
        );
        setUsingFallbackLocation(true);
        return false;
      }

      return true;
    } catch (error) {
      console.log("Erro ao verificar permissão:", error);
      setErrorMsg(
        "Erro nos serviços de localização. Usando localização padrão."
      );
      setUsingFallbackLocation(true);
      return false;
    }
  };

  const getCurrentLocation = async () => {
    try {
      const hasPermission = await requestLocationPermission();

      if (!hasPermission) {
        return DEFAULT_COORDINATES;
      }

      // Tentar obter localização atual com timeout
      const location = await Promise.race([
        Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
          timeout: 10000, // 10 segundos
        }),
        new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error("Timeout ao obter localização")),
            10000
          )
        ),
      ]);

      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    } catch (error) {
      console.log("Erro ao obter localização:", error);
      setErrorMsg(
        `Não foi possível obter sua localização: ${error.message}. Usando localização padrão.`
      );
      setUsingFallbackLocation(true);
      return DEFAULT_COORDINATES;
    }
  };

  const getHealthcarePlaces = async () => {
    try {
      setLoading(true);
      setSearchAttempted(true);
      setErrorMsg(null);

      console.log("Obtendo localização...");
      const userLocation = await getCurrentLocation();
      setLocation(userLocation);

      console.log("Buscando locais próximos...", userLocation);

      // Query Overpass QL otimizada
      const query = `
        [out:json][timeout:30];
        (
          node["amenity"="hospital"](around:5000,${userLocation.latitude},${userLocation.longitude});
          node["amenity"="clinic"](around:5000,${userLocation.latitude},${userLocation.longitude});
          node["amenity"="doctors"](around:5000,${userLocation.latitude},${userLocation.longitude});
          node["healthcare"="hospital"](around:5000,${userLocation.latitude},${userLocation.longitude});
          node["healthcare"="clinic"](around:5000,${userLocation.latitude},${userLocation.longitude});
          node["healthcare"="doctor"](around:5000,${userLocation.latitude},${userLocation.longitude});
        );
        out body;
      `;

      console.log("Enviando requisição para Overpass API...");

      const response = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: `data=${encodeURIComponent(query)}`,
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log("Resposta da API:", data);

      if (data.elements && data.elements.length > 0) {
        const healthcarePlaces = data.elements
          .filter((place) => {
            const hasName = place.tags?.name;
            const isHealthcare =
              place.tags?.amenity === "hospital" ||
              place.tags?.amenity === "clinic" ||
              place.tags?.amenity === "doctors" ||
              place.tags?.healthcare === "hospital" ||
              place.tags?.healthcare === "clinic" ||
              place.tags?.healthcare === "doctor";
            return hasName && isHealthcare;
          })
          .map((place) => ({
            ...place,
            displayLat: place.lat,
            displayLon: place.lon,
          }));

        console.log(
          `Encontrados ${healthcarePlaces.length} estabelecimentos de saúde`
        );

        setPlaces(healthcarePlaces);
        setFilteredPlaces(healthcarePlaces);

        if (healthcarePlaces.length === 0) {
          setErrorMsg(
            "Nenhum estabelecimento de saúde encontrado na sua região."
          );
        }
      } else {
        console.log("Nenhum resultado encontrado na API");
        // Usar dados de fallback
        const fallbackPlaces = getFallbackPlaces(userLocation);
        setPlaces(fallbackPlaces);
        setFilteredPlaces(fallbackPlaces);
        setErrorMsg(
          "Nenhum estabelecimento encontrado. Mostrando locais de exemplo."
        );
      }
    } catch (erro) {
      console.log("Erro na busca:", erro);
      // Usar dados de fallback em caso de erro
      const userLocation = location || DEFAULT_COORDINATES;
      const fallbackPlaces = getFallbackPlaces(userLocation);
      setPlaces(fallbackPlaces);
      setFilteredPlaces(fallbackPlaces);
      setErrorMsg(
        `Erro na busca. Mostrando locais de exemplo. (${erro.message})`
      );
    } finally {
      setLoading(false);
    }
  };

  // Função de fallback com dados mock mais realistas
  const getFallbackPlaces = (userCoords) => {
    return [
      {
        id: 1,
        type: "node",
        tags: {
          name: "Hospital Municipal",
          amenity: "hospital",
          phone: "(11) 2222-3333",
          emergency: "yes",
        },
        displayLat: userCoords.latitude + 0.005,
        displayLon: userCoords.longitude + 0.005,
      },
      {
        id: 2,
        type: "node",
        tags: {
          name: "Clínica Médica Central",
          amenity: "clinic",
          phone: "(11) 4444-5555",
        },
        displayLat: userCoords.latitude - 0.003,
        displayLon: userCoords.longitude + 0.003,
      },
      {
        id: 3,
        type: "node",
        tags: {
          name: "Pronto Socorro 24h",
          healthcare: "hospital",
          phone: "(11) 6666-7777",
          emergency: "yes",
        },
        displayLat: userCoords.latitude + 0.002,
        displayLon: userCoords.longitude - 0.004,
      },
      {
        id: 4,
        type: "node",
        tags: {
          name: "Posto de Saúde",
          amenity: "clinic",
          phone: "(11) 8888-9999",
        },
        displayLat: userCoords.latitude - 0.006,
        displayLon: userCoords.longitude - 0.002,
      },
      {
        id: 5,
        type: "node",
        tags: {
          name: "Hospital Regional",
          healthcare: "hospital",
          phone: "(11) 1111-2222",
        },
        displayLat: userCoords.latitude + 0.008,
        displayLon: userCoords.longitude + 0.001,
      },
    ];
  };

  const handleSearch = (text) => {
    setFiltroBusca(text);
    if (text) {
      const filtered = places.filter((place) =>
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
    if (
      place.tags?.amenity === "hospital" ||
      place.tags?.healthcare === "hospital"
    ) {
      return place.tags?.emergency === "yes"
        ? "🏥 Hospital (Emergência)"
        : "🏥 Hospital";
    }
    if (place.tags?.amenity === "clinic" || place.tags?.healthcare === "clinic")
      return "🩺 Clínica";
    if (
      place.tags?.amenity === "doctors" ||
      place.tags?.healthcare === "doctor"
    )
      return "👨‍⚕️ Consultório";
    return "🏥 Local de Saúde";
  };

  const getPlaceTypeIcon = (place) => {
    if (
      place.tags?.amenity === "hospital" ||
      place.tags?.healthcare === "hospital"
    ) {
      return place.tags?.emergency === "yes" ? "🚑" : "🏥";
    }
    if (place.tags?.amenity === "clinic" || place.tags?.healthcare === "clinic")
      return "🩺";
    if (
      place.tags?.amenity === "doctors" ||
      place.tags?.healthcare === "doctor"
    )
      return "👨‍⚕️";
    return "🏥";
  };

  const retrySearch = async () => {
    setUsingFallbackLocation(false);
    setErrorMsg(null);
    await getHealthcarePlaces();
  };

  const openLocationSettings = async () => {
    try {
      await Location.enableNetworkProviderAsync();
      // Tentar novamente após habilitar serviços
      setTimeout(retrySearch, 2000);
    } catch (error) {
      Alert.alert(
        "Configurações de Localização",
        "Por favor, habilite os serviços de localização nas configurações do seu dispositivo.",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Abrir Configurações",
            onPress: () => Location.getProviderStatusAsync(),
          },
        ]
      );
    }
  };

  return (
    <View style={style.container}>
      <StatusBar style="auto" />
      <View style={style.containerGeo}>
        <MapView
          style={style.mapa}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          region={
            selectedPlace
              ? {
                  latitude: selectedPlace.displayLat,
                  longitude: selectedPlace.displayLon,
                  latitudeDelta: 0.02,
                  longitudeDelta: 0.02,
                }
              : undefined
          }
          mapType="standard"
          showsUserLocation={!usingFallbackLocation}
          showsMyLocationButton={true}
          showsCompass={true}
          showsScale={true}
          zoomEnabled={true}
          scrollEnabled={true}
          rotateEnabled={true}
        >
          {/* Marcador do usuário - sempre mostrar */}
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={
              usingFallbackLocation ? "Localização Padrão" : "Sua Localização"
            }
            description={
              usingFallbackLocation
                ? "Localização aproximada"
                : "Você está aqui"
            }
          >
            <View style={style.userMarker}>
              <View style={style.userPulse} />
              <View
                style={[
                  style.userMarkerIcon,
                  usingFallbackLocation && style.fallbackMarker,
                ]}
              >
                <Text style={style.userMarkerText}>
                  {usingFallbackLocation ? "📍" : "📍"}
                </Text>
              </View>
            </View>
          </Marker>

          {/* Marcadores dos locais de saúde */}
          {filteredPlaces.map((place, index) => (
            <Marker
              key={place.id || index}
              coordinate={{
                latitude: place.displayLat,
                longitude: place.displayLon,
              }}
              onPress={() => setSelectedPlace(place)}
            >
              <View
                style={[
                  style.placeMarker,
                  selectedPlace?.id === place.id && style.selectedMarker,
                ]}
              >
                <Text style={style.markerIcon}>{getPlaceTypeIcon(place)}</Text>
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
                    <Text style={style.calloutPhone}>
                      📞 {place.tags.phone}
                    </Text>
                  )}
                  {usingFallbackLocation && (
                    <Text style={style.fallbackNote}>📍 Local de exemplo</Text>
                  )}
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>

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
                {filteredPlaces.length} locais{" "}
                {usingFallbackLocation ? "de exemplo" : "encontrados"}
              </Text>
              <Pressable onPress={() => setShowList(false)}>
                <Text style={style.closeList}>✕</Text>
              </Pressable>
            </View>
            <ScrollView style={style.scrollView}>
              {filteredPlaces.length > 0 ? (
                filteredPlaces.map((place, index) => (
                  <Pressable
                    key={place.id || index}
                    style={[
                      style.placeItem,
                      selectedPlace?.id === place.id && style.selectedPlaceItem,
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
                      <Text style={style.placeType}>{getPlaceType(place)}</Text>
                      {place.tags?.phone && (
                        <Text style={style.placePhone}>
                          📞 {place.tags.phone}
                        </Text>
                      )}
                      {usingFallbackLocation && (
                        <Text style={style.fallbackBadge}>Exemplo</Text>
                      )}
                    </View>
                    <View style={style.distanceBadge}>
                      <Text style={style.distanceText}>→</Text>
                    </View>
                  </Pressable>
                ))
              ) : (
                <View style={style.noResults}>
                  <Text style={style.noResultsText}>
                    Nenhum local encontrado
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        )}

        {/* Botão de centralizar */}
        <Pressable style={style.centerButton} onPress={retrySearch}>
          <View style={style.centerIcon}>
            <Text style={style.centerIconText}>🎯</Text>
          </View>
        </Pressable>

        {/* Banner de informação */}
        {(errorMsg || usingFallbackLocation) && (
          <View
            style={[
              style.infoBanner,
              usingFallbackLocation ? style.fallbackBanner : style.errorBanner,
            ]}
          >
            <Text style={style.infoText}>
              {usingFallbackLocation
                ? "📍 Usando localização padrão. Ative a localização para ver hospitais próximos."
                : errorMsg}
            </Text>
            <View style={style.bannerButtons}>
              <Pressable style={style.retryButton} onPress={retrySearch}>
                <Text style={style.retryButtonText}>Tentar Novamente</Text>
              </Pressable>
              {usingFallbackLocation && (
                <Pressable
                  style={style.settingsButton}
                  onPress={openLocationSettings}
                >
                  <Text style={style.settingsButtonText}>Ativar GPS</Text>
                </Pressable>
              )}
            </View>
          </View>
        )}
      </View>

      <Modal transparent={true} visible={loading}>
        <View style={style.containerModal}>
          <View style={style.loadingContent}>
            <ActivityIndicator size="large" color="#FF6B6B" />
            <Text style={style.loadingText}>Buscando locais de saúde...</Text>
            <Text style={style.loadingSubtext}>
              {usingFallbackLocation
                ? "Usando localização padrão"
                : "Procurando hospitais e clínicas próximos"}
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}
