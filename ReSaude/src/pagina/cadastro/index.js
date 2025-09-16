import { StatusBar } from 'expo-status-bar';
import { View, Text, Pressable, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import api from '../api';
import styles from './style';
import * as ImagePicker from 'expo-image-picker';

export default function App() {

  const Navigation = useNavigation();

  useEffect(() => {
    api.get("/teste")
      .then(res => console.log(res.data))
      .catch(err => console.log("Erro:", err.message));
  }, []);



  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [imagem, setImagem] = useState('');
  const [nasci, setNasci] = useState('');
  const [senha, setSenha] = useState('');

  const solicitarPermissao = async () => {
    const camera = await ImagePicker.requestCameraPermissionsAsync();
    const galeria = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (camera.status != 'granted' && galeria.status != 'granted') {
      alert('permissão negeda', 'é necessario pedir permissao para acessa a camera ou a galeria');
      return false;
    }

    return true;
  }

  const tirarFoto = async () => {
    const permissao = await solicitarPermissao();
    if (!permissao) return;

    const resultado = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1
    })

    if (!resultado.canceled) {
      setImagem(resultado.assets[0].uri)
    }
  }

  const escolherGaleria = async () => {
    const permissao = await solicitarPermissao();

    if (!permissao) return;

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1
    })

    if (!resultado.canceled) {
      setImagem(resultado.assets[0].uri)
    }
  }


  const enviarImagem = () => {
    escolherGaleria();
  }


  const insert = () => {

    var usuario = new FormData();

    usuario.append('foto', {
      uri: imagem,
      type: 'image/jpeg',
      name: 'image.jpg'
    });
    usuario.append('nomeInput', nome);
    usuario.append('emailInput', email);
    usuario.append('nascimentoInput', nasci);
    usuario.append('senhaInput', senha);

    api.post('/cadastra', usuario, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        console.log('cadastrado', response.data)
        Navigation.navigate('Login');
      })
      .catch(erro => {
        console.log('erro cadastra', erro.response?.data || erro.message);
      })

  }

  return (
    <View style={styles.container}>
      <View style={styles.containerCadastra}>
        <View style={styles.imagem}>
          <Pressable onPress={() => enviarImagem()}>
            {imagem == '' ?
              <Image style={styles.img} source={require('../../../assets/perfilPng.png')}></Image>
              :
              <Image style={styles.img} source={{ uri: imagem }}></Image>
            }
          </Pressable>
        </View>
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
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
