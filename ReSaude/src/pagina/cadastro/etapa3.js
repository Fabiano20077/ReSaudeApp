import { StatusBar } from 'expo-status-bar';
import { View, Text, Pressable, Image, TextInput, ActivityIndicator, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import api from '../api';
import styles from './style';


export default function etapa1({ data, onChange, onNext, onBack }) {


  /*  const [nome, setNome] = useState('');
   const [email, setEmail] = useState('');
   const [nasci, setNasci] = useState(''); */
  const [loading, setLoading] = useState(false);

  const insert = () => {
    setLoading(true)

    var usuario = new FormData();

    usuario.append('inputNome', data.bairro)
    usuario.append('inputEmail', data.uf)
    usuario.append('inputNasci', data.cidade)



    api.post('/cadastra-etapa3', usuario)
      .then(res => {
        console.log('etapa1 feita', res.data)
        onNext();
        setLoading(false)
      })
      .catch(err => {
        console.log('erro na etapa1', err.response?.data || err.message)
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
            ETAPA 3
          </Text>
        </View>
        <View style={styles.campoInputs}>

          <TextInput
            style={styles.input}
            placeholder='digite seu bairo'
            value={data.bairro}
            onChangeText={(text) => onChange('bairro', text)}
            onBlur={() => buscaCep(data.cep)}
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
            <Pressable style={styles.botao} onPress={() => onBack()}>
              <Text style={styles.texto}>volta</Text>
            </Pressable>
            <Pressable style={styles.botao} onPress={() => insert()}>
              <Text style={styles.texto}>aperte</Text>
            </Pressable>
          </View>
        </View>
      </View>


      <StatusBar style="auto" />
    </View>
  );
}
