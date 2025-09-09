import { StatusBar } from 'expo-status-bar';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../api';
import styles from './style';
import { useState, useEffect } from 'react';
import { TextInput } from 'react-native-web';

export default function App() {


  useEffect(() => {
    api.get("/teste")
      .then(res => console.log(res.data))
      .catch(err => console.log("Erro:", err.message));
  }, []);

  

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [nasci, setNasci] = useState('');
  const [senha, setSenha] = useState();

  const insert = () => {

    console.log('bo')

    api.post('/cadastra', {
      nomeInput: nome,
      emailInput: email,
      nascimentoInput: nasci,
      senhaInput: senha
    })
      .then(response => {
        console.log('cadastrado', response.data)
      })
      .catch(erro => {
        console.log('erro cadastra', erro.response?.data || erro.message);
      })


  }

  return (
    <View style={styles.container}>
      <TextInput
        value={nome}
        placeholder='prenchar o campo'
        onChangeText={setNome}
      />
      <TextInput
        value={email}
        placeholder='prenchar o campo'
        onChangeText={setEmail}
      />
      <TextInput
        value={nasci}
        placeholder='prenchar o campo'
        onChangeText={setNasci}
      />
      <TextInput
        value={senha}
        placeholder='prenchar o campo'
        onChangeText={setSenha}
      />

      <Pressable onPress={() => { insert() }}>
        aperte
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}
