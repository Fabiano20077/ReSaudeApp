import { StatusBar } from 'expo-status-bar';
import { View, Text, Pressable, Image, TextInput, ActivityIndicator, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import api from '../api';
import styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function etapa5({ data, onChange, onFinish, onBack }) {

  const [loading, setLoading] = useState(false);

  const insert = async () => {

    setLoading(true)

    var usuario = new FormData();

   usuario.append('inputSenha',  data.senha)

   var array = await AsyncStorage.getItem('usuario')

    var user = JSON.parse(array)

    api.post(`/cadastra-etapa5/${user.usuario['id']}`, usuario, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        console.log('cadastrado', response.data)
        onFinish();
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
        <View style={styles.titulo} >
          <Text style={styles.textoTitulo}>
            ETAPA 5
          </Text>
        </View>
        <View style={styles.campoInputs}>

          <TextInput
            style={styles.input}
            placeholder='digite seu senha'
            value={data.senha}
            onChangeText={(text) => onChange('senha', text)}
          />

          <View style={styles.botoes}>
            <Pressable style={styles.botao} onPress={() => onBack()}>
              <Text style={styles.texto}>volta</Text>
            </Pressable>
            <Pressable style={styles.botao} onPress={() => insert()}>
              <Text style={styles.texto}>aperte</Text>
            </Pressable>
          </View>

        </View>
        <StatusBar style="auto" />
      </View>
    </View>
  );
}
