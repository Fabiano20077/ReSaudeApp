import { StatusBar } from 'expo-status-bar';
import { View, Text, Pressable, Image, TextInput, ActivityIndicator, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import api from '../api';
import styles from './style';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function etapa4({ data, onChange, onNext, onBack }) {


  const navigation=useNavigation();

  const [imagem, setImagem] = useState('');

  const [loading, setLoading] = useState(false);

  const solicitarPermissao = async () => {
    const camera = await ImagePicker.requestCameraPermissionsAsync();
    const galeria = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (camera.status != 'granted' && galeria.status != 'granted') {
      alert('permissão negeda', 'é necessario pedir permissao para acessa a camera ou a galeria');
      return false;
    }

    return true;
  }

  const tirarFoto = async () => {
    const permissao = await solicitarPermissao();
    if (!permissao) return;

    const resultado = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1
    })

    if (!resultado.canceled) {
      setImagem(resultado.assets[0].uri)
    }
  }

  const escolherGaleria = async () => {
    const permissao = await solicitarPermissao();

    if (!permissao) return;

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8
    })

    console.log("Resultado da imagem:", resultado.assets[0].uri);

    if (!resultado.canceled) {
      setImagem(resultado.assets[0].uri)
      onChange('foto', resultado.assets[0].uri)
    }
  }


  const insert = async () => {

    setLoading(true)

    var usuario = new FormData();

    if (imagem) {
      usuario.append('foto', {
        uri: imagem,
        name: 'image.png',
        type: 'image/png'
      });
    }

    var array = await AsyncStorage.getItem('usuario')

    var user = JSON.parse(array)

    api.post(`/cadastra-etapa4/${user.usuario['id']}`, usuario, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        console.log('cadastrado', response.data)
        onNext()
      })
      .catch(erro => {
        console.log('erro cadastra', erro.response?.data || erro.message);
        setLoading(false)
      })
  }

  if (loading) {
    return (
      <View>
        <ActivityIndicator size='large' color='blue'></ActivityIndicator>
        <Text>carregando</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.containeretapa}>
        <View style={styles.imagem}>
          {imagem == '' ?
            <Image style={styles.img} source={require('../../../assets/perfilPng.png')}></Image>
            :
            <Image style={styles.img} source={{ uri: imagem }}></Image>
          }
        </View>
        <View style={styles.escolher}>
          <Pressable style={styles.botao} onPress={() => escolherGaleria()}>
            <Text style={styles.texto}>galeria</Text>
          </Pressable>
          <Pressable style={styles.botao} onPress={() => tirarFoto()}>
            <Text style={styles.texto}>tirar foto</Text>
          </Pressable>
        </View>


        <View style={styles.escolha2}>

<View style={styles.botoes2}>

         <Pressable style={styles.botao2}   onPress={() => onBack()}  >
           <Text style={styles.texto}>Voltar</Text>
          </Pressable>
          <Pressable style={styles.bbotao} onPress={() => insert()}>
            <Text style={styles.texto}>Prosseguir</Text>
          </Pressable>
</View>
        </View>

      </View>
    </View>
  );
}
