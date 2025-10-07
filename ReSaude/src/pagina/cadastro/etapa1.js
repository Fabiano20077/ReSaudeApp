import { StatusBar } from 'expo-status-bar';
import { View, Text, Pressable, TextInput, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import api from '../api';
import styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function etapa1({ data, onChange, onNext }) {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const insert = async () => {
    setLoading(true);

    var usuario = new FormData();
    usuario.append('inputNome', data.nome);
    usuario.append('inputEmail', data.email);
    usuario.append('inputNasci', data.nasci);

    api.post('/cadastra-etapa1', usuario)
      .then(res => {
        console.log('etapa1 feita', res.data);
        AsyncStorage.setItem('usuario', JSON.stringify(res.data));
        onNext();
        setLoading(false);
      })
      .catch(err => {
        console.log('erro na etapa1', err.response?.data || err.message);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <View>
        <ActivityIndicator size='large' color='blue' />
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.containeretapa}>
        <View style={styles.titulo} >
          <Text style={styles.textoTitulo}>Etapa 1</Text>
        </View>

        <View style={styles.campoInputs}>
          <TextInput
            style={styles.input}
            placeholder='digite seu nome'
            value={data.nome}
            onChangeText={(text) => onChange('nome', text)}
          />
          <TextInput
            style={styles.input}
            placeholder='digite seu email'
            value={data.email}
            onChangeText={(text) => onChange('email', text)}
          />
          <TextInput
            style={styles.input}
            placeholder='digite sua data de nascimento'
            value={data.nasci}
            onChangeText={(text) => onChange('nasci', text)}
          />

        <View style={styles.botoes}>
          <Pressable 
            style={styles.botao2} onPress={() => navigation.navigate("Login")} >
            <Text style={styles.texto}>Voltar</Text>
          </Pressable>

          <Pressable style={styles.bbotao} onPress={insert}>
            <Text style={styles.texto}>Prosseguir</Text>
          </Pressable>
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>

  );
}