import { StatusBar } from 'expo-status-bar';
import { View, Text, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import MapView,{Maker} from 'react-native-maps';
import { useEffect, useState } from 'react';
import style from './style';


export default function App() {
  const navigation = useNavigation();

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão para acessar a localização foi negada');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

    
      await AsyncStorage.setItem('userLocation', JSON.stringify(currentLocation));
    })();
  }, []);

  return (
    <View style={style.container}>
      <StatusBar style="auto" />

      <Text style={style.title}>Bem-vindo!</Text>

      {errorMsg ? (
        <Text style={style.error}>{errorMsg}</Text>
      ) : location ? (
        <View style={style.locationBox}>
          <Text style={style.locationText}>Latitude: {location.coords.latitude}</Text>
          <Text style={style.locationText}>Longitude: {location.coords.longitude}</Text>
        </View>
      ) : (
        <Text style={style.loading}>Obtendo localização...</Text>
      )}
       {location && (
  <MapView
    style={{ width: '100%', height: 300 }}
    initialRegion={{
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }}
  />
)}
      
    </View>
  );
}