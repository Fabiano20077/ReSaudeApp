import { StatusBar } from 'expo-status-bar';
import { View, Text, Pressable, Image, TextInput, ActivityIndicator, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import api from '../api';
import styles from './style';
import axios from 'axios';


export default function etapa2({ data, onChange, onNext, onBack }) {


  const [loading, setLoading] = useState(false);

  const buscaCep = (cep) => {

    setLoading(true)

    axios.get(`https://viacep.com.br/ws/${cep}/json/`, {
      headers: {'Accept': "aplication/json"}
    })
      .then(res => {
        onChange('bairro', res.data.bairro || "");
        onChange('logradouro', res.data.logradouro || "");
        onChange('cidade', res.data.localidade || "");
        onChange('uf', res.data.uf || "");
        console.log('feito cep', res.data);

      })
      .catch(err => {
        console.log('nao busquei', err.response?.data || err.message)
      })
      .finally(() => {
        setLoading(false)
      })

  }

  const insert = () => {
    setLoading(true)

    var usuario = new FormData();

    usuario.append('inputCep', data.cep);
    usuario.append('inputLogra', data.logra);
    usuario.append('inputNum', data.num);

    api.post('/cadastra-etapa2', usuario)
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
