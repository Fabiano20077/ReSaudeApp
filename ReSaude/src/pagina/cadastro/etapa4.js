import { StatusBar } from 'expo-status-bar';
import { View, Text, Pressable, Image, TextInput, ActivityIndicator, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import api from '../api';
import styles from './style';

import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function etapa4({ data, onChange, onNext, onBack }) {


  const navigation=useNavigation();



  const [loading, setLoading] = useState(false);



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

    try{

      const response = await fetch(`http://10.0.2.2:8000/api/cadastra-etapa4/${user.usuario['id']}`, {
        method: 'POST',
        body: usuario
      });

      if(!response.ok) {
        const resError = await response.json();
        console.log('erro', resError )
        throw Error(JSON.stringify(resError))
      }

      const resData = await response.json();
      console.log('funfo', resData)
      await AsyncStorage.setItem('usuario', JSON.stringify(resData))
      onNext()
      
    } catch (error) {
      console.log('erro', error.message)
    } finally {
      setLoading(false)
    }
/* 
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
      }) */
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
