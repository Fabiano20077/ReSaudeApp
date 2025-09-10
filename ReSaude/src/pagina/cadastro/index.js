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
    <View style={styles.inputs}>
      <Text style={styles.espaco}>Nome:</Text>
      <TextInput style={styles.inputEmail}
        value={nome}
        placeholder='Preencha seu Nome'
        onChangeText={setNome}
      />
      <Text style={styles.espaco}>Email:</Text>
      <TextInput style={styles.inputEmail}
        value={email}
        placeholder='Preencha seu Email'
        onChangeText={setEmail}
      />
      <Text style={styles.espaco}>Data de Nascimento:</Text>
      <TextInput style={styles.inputEmail}
        value={nasci}
        placeholder='Preencha sua Data de Nascimento'
        onChangeText={setNasci}
      />
      <Text style={styles.espaco}>Senha:</Text>
      <TextInput style={styles.inputEmail}
        value={senha}
        placeholder='Preencha a Senha'
        onChangeText={setSenha}
      />
      <Pressable style={styles.botao} onPress={() => { insert() }}>
        aperte
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}
