import { StatusBar } from 'expo-status-bar';
import { View, Text, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api';
import styles from './style';
import style from './style';



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
              <Text style={styles.txt}>Calorias</Text>
            </Pressable>
          </View>
          <View style={styles.card}>
          
            <Pressable onPress={() => navigation.navigate('Imc')}>
              <Text style={styles.txt}>IMC</Text>
            </Pressable>
          </View>
          <View style={styles.card}>
            
            <Pressable onPress={() => navigation.navigate('Água')}>
              <Text style={styles.txt}>Água</Text>
            </Pressable>
          </View>
          <View style={styles.card}>
            
            <Pressable onPress={() => navigation.navigate('Sangue')}>
              <Text style={styles.txt}>Sangue</Text>
            </Pressable>
          </View>
          <View style={styles.card}>
            <Pressable onPress={() => navigation.navigate('agua')}>
              <Text></Text>
            </Pressable>
          </View>
          <View style={styles.card}>
            <Pressable onPress={() => navigation.navigate('sangue')}>
              <Text></Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.nav}>
          <Pressable onPress={() =>apagarLocal()}>
            <Text>volta</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Perfil')}>
            <Image style={styles.imgPerfil} source={require('../../../assets/perfilPng.png')}></Image>
          </Pressable>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
