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
      <Text style={styles.espaco}>Nome:</Text>
      <TextInput style={styles.inputEmail}
        value={nome}
        placeholder='Ex:Fabiano'
        onChangeText={setNome}
      />
      <Text style={styles.espaco}>Email:</Text>
      <TextInput style={styles.inputEmail}
        value={email}
        placeholder='Ex:fabiano@gmail.com'
        onChangeText={setEmail}
      />
      <Text style={styles.espaco}>Data de Nascimento:</Text>
      <TextInput style={styles.inputEmail}
        value={nasci}
        placeholder='Ex:aaaa/mm/dd'
        onChangeText={setNasci}
      />
      <Text style={styles.espaco}>Senha:</Text>
      <TextInput style={styles.inputEmail}
        value={senha}
        placeholder='Mínimo 3 carácteres'
        onChangeText={setSenha}
      />
      <Pressable style={styles.botao} onPress={() => { insert() }}>
        <Text style={styles.letraBotao}>aperte</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}
