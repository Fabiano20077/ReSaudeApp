import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import { useState } from 'react';





export default function App() {

  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState();

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
              placeholder='escrevar seu emal'
              onChangeText={setEmail}
            />
            <Text style={styles.texto}>Senha</Text>
            <TextInput
              style={styles.inputEmail}
              placeholder='escrevar seu emal'
              onChangeText={setSenha}
            />

            <Pressable style={styles.botao}>
              <Text style={styles.letraBotao}>Aperte</Text>
            </Pressable>

            <Text style={styles.texto}> não tem conta?
              <Pressable style={styles.link} onPress={() => navigation.navigate('Cadastro')}>click aqui</Pressable>
            </Text>

          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}