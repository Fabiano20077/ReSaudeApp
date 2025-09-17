import { StatusBar } from 'expo-status-bar';
import { View, Text, Pressable, Image, Modal, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api'
import { useEffect, useState } from 'react';



export default function App() {

  const navigation = useNavigation();

  const [modal,setModal] = useState(false);

  const [nome,setnome] = useState('');

  useEffect(() => {
    const editar = async () => {
      valor = await AsyncStorage.getItem('usuario');
      setnome(valor)
    }

    editar();
  }, [])



  return (
    <View style={styles.container}>
        <View style={styles.containerPerfil}>
            <View style={styles.containerImage}>
                <Image style={styles.foto} source={require('../../../assets/perfilPng.png')}></Image>
            </View>
            <View style={styles.opcoes}>
                <View> <Pressable onPress={() => setModal(true) }><Text>editar</Text></Pressable> </View>
            </View>
        </View>
      <StatusBar style="auto" />

      <Modal transparent={true} visible={modal}>
      <View style={styles.containerModal}>
        <Text> {nome}</Text>
      </View>
    </Modal>
    </View>

   
  );
}
