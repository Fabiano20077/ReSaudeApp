import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import styles from './style';
import api from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {

  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState();
  const [usuario,setUsuario] = useState('');

  const login = () => {

    api.post('/login', {
      loginEmail: email,
      LoginSenha: senha
    })
      .then(res => {
          console.log('logado', res.data) 
          AsyncStorage.setItem('usuario',JSON.stringify(res.data));
          navigation.navigate('Dashboard')
      })
      .catch(error => {
        console.log('nao foi possivel fzee login', error.response?.data || error.data);
      })
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerLogin}>
        <View style={styles.logo}>
          {/*  <Image source={require("../../../img/Logo_ReSaude-removebg-preview.png")} style={styles.img}/> */}
        </View>
        <View style={styles.login}>
          <View style={styles.containerTitulo}>
            <Text style={styles.titulo}>Faça o login</Text>
          </View>
          <View style={styles.inputs}>

            <Text style={styles.texto}>Email</Text>
            <TextInput
              style={styles.inputEmail}
              placeholder='Digite seu email'
              onChangeText={setEmail}
            />
            <Text style={styles.texto}>Senha</Text>
            <TextInput
              style={styles.inputEmail}
              placeholder='Digite sua senha'
              onChangeText={setSenha}
            />

            <Pressable style={styles.botao} onPress={() => login()}>
              <Text style={styles.letraBotao}>Aperte</Text>
            </Pressable>

            <Text style={styles.texto}> não tem conta?
              <Pressable style={styles.link} onPress={() => { navigation.navigate('Cadastro') }}>
                <Text>clique aqui</Text>
              </Pressable>
            </Text>

          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}