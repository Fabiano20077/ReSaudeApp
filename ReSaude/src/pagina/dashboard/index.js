import { StatusBar } from 'expo-status-bar';
import { View, Text, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './style';



export default function App() {

  const navigation = useNavigation();

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
            <Pressable>

            </Pressable>
          </View>
        </View>
        <View style={styles.nav}>
          <Pressable onPress={() => navigation.navigate('Login')}>
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
