import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, Pressable, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import styles from './style';
import api from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {

  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [usuario, setUsuario] = useState('');

  const [loading, setLoading] = useState(false);

  const login = () => {

    setLoading(true)

    api.post('/login', {
      loginEmail: email,
      LoginSenha: senha
    })
      .then(res => {
        console.log('logado', res.data)
        setLoading(false)
        AsyncStorage.setItem('usuario', JSON.stringify(res.data));
        navigation.navigate('Dashboard')
      })
      .catch(error => {
        setLoading(false)
        console.log('nao foi possivel fzee login', error.response?.data || error.data);
      })
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color='#ccc'></ActivityIndicator>
        <Text>carregando</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerLogin}>
        <View style={styles.logo}>
        </View>
        <View style={styles.login}>
          <View style={styles.containerTitulo}>
            <Text style={styles.titulo}>Faça o login</Text>
          </View>
          <View style={styles.inputs}>

            <Text style={styles.texto}>Email</Text>
            <TextInput
              style={styles.inputEmail}
              value={email}
              placeholder='Digite seu email'
              onChangeText={setEmail}
            />
            <Text style={styles.texto}>Senha</Text>
            <TextInput
              style={styles.inputEmail}
              value={senha}
              placeholder='Digite sua senha'
              onChangeText={setSenha}
            />

            <Pressable style={styles.botao} onPress={() => login()}>
              <Text style={styles.letraBotao}>Aperte</Text>
            </Pressable>

            <View style={styles.ir}>

              <Text style={styles.texto}> não tem conta?</Text>
              <Pressable style={styles.link} onPress={() => { navigation.navigate('Cadastro') }}>
                <Text style={styles.texteLink}>clique aqui</Text>
              </Pressable>
            </View>

          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}