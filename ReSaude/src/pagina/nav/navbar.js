import { StatusBar } from 'expo-status-bar';
import { View, Text, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';

export default function navbar() {

  const navigation = useNavigation();

  return (
        <View style={styles.nav}>
            <Pressable onPress={() => navigation.navigate('Login')}>
                <Text>volta</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Perfil')}>
                <Image style={styles.img} source={require('../../../assets/perfilPng.png')}></Image>
            </Pressable>
        </View>
  );
}
