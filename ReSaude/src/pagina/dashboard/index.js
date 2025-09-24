import { StatusBar } from 'expo-status-bar';
import { View, Text, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api';
import styles from './style';



export default function App() {

  const navigation = useNavigation();

  
   const apagarLocal =async () => {
    try {
      await AsyncStorage.removeItem('usuario');
      console.log('apagado no local')
      navigation.navigate('Login')
    }
    catch(erro){
      console.log('erro')
    }
   }

  return (
    <View style={styles.container}>
      <View style={styles.containerDashboard}>
        <View style={styles.corpo}>
          <View style={styles.card}>
            <Pressable onPress={() => navigation.navigate('Calorias')}>
              <Text>calorias</Text>
            </Pressable>
          </View>
          <View style={styles.card}>
            <Pressable onPress={() => navigation.navigate('Mmc')}>
              <Text> imc</Text>
            </Pressable>
          </View>
          <View style={styles.card}>
            <Pressable onPress={() => navigation.navigate('agua')}>
              <Text>agua</Text>
            </Pressable>
          </View>
          <View style={styles.card}>
            <Pressable onPress={() => navigation.navigate('Sangue')}>
              <Text>sangue</Text>
            </Pressable>
          </View>
          <View style={styles.card}>
            <Pressable onPress={() => navigation.navigate('agua')}>
              <Text></Text>
            </Pressable>
          </View>
          <View style={styles.card}>
            <Pressable onPress={() => navigation.navigate('Sangue')}>
              <Text></Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.nav}>
          <Pressable onPress={() =>apagarLocal()}>
            <Text>volta</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Perfil')}>
            <Image style={styles.img} source={require('../../../assets/perfilPng.png')}></Image>
          </Pressable>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
