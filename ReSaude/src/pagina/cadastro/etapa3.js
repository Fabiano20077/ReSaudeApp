import { StatusBar } from 'expo-status-bar';
import { View, Text, Pressable, Image, TextInput, ActivityIndicator, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import api from '../api';
import styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function etapa3({ data, onChange, onNext, onBack }) {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const insert = async() => {
    setLoading(true)

    var usuario = new FormData();

    usuario.append('inputBairro', data.bairro)
    usuario.append('inputUf', data.uf)
    usuario.append('inputEstado', data.cidade)

    var array = await AsyncStorage.getItem('usuario')

    var user = JSON.parse(array)

    try{

      const response = await fetch(`http://10.0.2.2:8000/api/cadastra-etapa3/${user.usuario['id']}`, {
        method: 'POST',
        body: usuario
      });

      if(!response.ok) {
        const erroData = await response.json()
        throw new error(JSON.stringify(erroData))
      }

      const resData = await response.json()
      console.log('funfo', resData)
      await AsyncStorage.setItem('usuario', JSON.stringify(resData))
      onNext();
    } catch (error) {
       console.log('erro', error.message)
    } finally {
      setLoading(false)
    }

   /*  api.post(`/cadastra-etapa3/${user.usuario['id']}`, usuario)
      .then(res => {
        console.log('etapa1 feita', res.data)
        onNext();
        setLoading(false)
      })
      .catch(err => {
        console.log('erro na etapa1', err.response?.data || err.message)
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

        <View style={styles.titulo} >
          <Text style={styles.textoTitulo}>
            ETAPA 3
          </Text>
        </View>
        <View style={styles.campoInputs}>

          <TextInput
            style={styles.input}
            placeholder='digite seu bairo'
            value={data.bairro}
            onChangeText={(text) => onChange('bairro', text)}
          />

          <TextInput
            style={styles.input}
            placeholder='digite seu uf'
            value={data.uf}
            onChangeText={(text) => onChange('uf', text)}
          />
          <TextInput
            style={styles.input}
            placeholder='digite sua data de cidade'
            value={data.cidade}
            onChangeText={(text) => onChange('cidade', text)}
          />

          <View style={styles.botoes}>
          <Pressable style={styles.botao2}  onPress={() => onBack()}>
           <Text style={styles.texto}>Voltar</Text>
           </Pressable>
            <Pressable style={styles.bbotao} onPress={() => insert()}>
              <Text style={styles.texto}>Prosseguir</Text>
            </Pressable>
          </View>
        </View>
      </View>


      <StatusBar style="auto" />
    </View>
  );
}
