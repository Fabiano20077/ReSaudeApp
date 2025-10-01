import { StatusBar } from 'expo-status-bar';
import { View, Text, Pressable, Image, TextInput, ActivityIndicator, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import api from '../api';
import styles from './style';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function etapa2({ data, onChange, onNext, onBack }) {


  const [loading, setLoading] = useState(false);


  const buscaCep = async (cep) => {

    setLoading(true)

    try {
      const response = await axios.get(`'https://viacep.com.br/ws/${cep}/json/'`);
      
      if (response.data.erro) {
        console.log('CEP não encontrado');
        return;
      }

      onChange('bairro', response.data.bairro || "");
      onChange('logradouro', response.data.logradouro || "");
      onChange('cidade', response.data.localidade || "");
      onChange('uf', response.data.uf || "");
      console.log('CEP encontrado:', response.data);

    } catch (err) {
      console.log('Erro ao buscar CEP:', err.response?.data || err.message);
      // Aqui você pode adicionar um alerta ou mensagem para o usuário
    } finally {
      setLoading(false)
    }

  }

  const insert = async () => {
    setLoading(true)

    var usuario = new FormData();

    usuario.append('inputCep', data.cep);
    usuario.append('inputLogra', data.logradouro);
    usuario.append('inputNum', data.num);

    var array = await AsyncStorage.getItem('usuario')

    var user = JSON.parse(array)

    api.post(`/cadastra-etapa2/${user.usuario['id']}`, usuario)
      .then(res => {
        console.log('etapa2 feita', res.data)
        onNext();
        setLoading(false)
      })
      .catch(err => {
        console.log('erro na etapa2', err.response?.data || err.message)
      })

  }



  if (loading) {
    return (
      <View>
        <ActivityIndicator size='large' color='blue'></ActivityIndicator>
        <Text>carregando...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.containeretapa}>
        <View style={styles.titulo} >
          <Text style={styles.textoTitulo}>
            ETAPA 2
          </Text>
        </View>

        <View style={styles.campoInputs}>

          <TextInput
            style={styles.input}
            placeholder='digite seu cep'
            value={data.cep}
            onChangeText={(text) => onChange('cep', text)}
            onBlur={() => buscaCep(data.cep)}
          />


          <TextInput
            style={styles.input}
            placeholder='digite seu logra'
            value={data.logradouro}
            onChangeText={(text) => onChange('logradouro', text)}
          />
          <TextInput
            style={styles.input}
            placeholder='digite sua data de numero'
            value={data.num}
            onChangeText={(text) => onChange('num', text)}
          />

          <View style={styles.botoes}>

            <Pressable style={styles.botaoRed} onPress={() => onBack()}>
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
