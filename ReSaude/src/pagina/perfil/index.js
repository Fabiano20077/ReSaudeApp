import { StatusBar } from 'expo-status-bar';
import { View, Text, Pressable, Image, Modal, TextInput, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api'
import { useEffect, useState } from 'react';



export default function App() {



  const navigation = useNavigation();

  const [modal, setModal] = useState(false);

  const [id, setId] = useState('');
  const [nome, setnome] = useState('');
  const [email, setEmail] = useState('');
  const [nasci, setNasci] = useState('');
  const [senha, setSenha] = useState('');
  const [imagem, setImagem] = useState();
  const [loading, setLoading] = useState(false);
  const [textoLogin, setTextLogin] = useState(false)

  useEffect(() => {

    const vemId = async () => {
      setTextLogin(true)
      const valor = await AsyncStorage.getItem('usuario')
      const array = JSON.parse(valor)
      setId(array.user['id'])
      const userId = array.user['id']
      api.get(`/chamar-usuario/${userId}`)
        .then(res => {
          console.log('funfo', res.data)
          setnome(res.data.user.nome)
          setEmail(res.data.user.email)
          setNasci(res.data.user.nascimento)
          setTextLogin(false)
        })
        .catch(erro => {
          console.log('erro', erro.response?.data || erro.message)
        })
    }

    vemId();
  }, [])

  const update = () => {

    setLoading(true)
    var usuario = new FormData();

    usuario.append('nome', nome);
    usuario.append('email', email);
    usuario.append('nascimento', nasci);
    usuario.append('senha',senha)

    api.post(`/update-dados/${id}`, usuario, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        console.log('feito', response.data);
        setModal(false);
        setLoading(false)
      })
      .catch(erro => {
        console.log('erro', erro.response?.data || erro.messagm)
        setLoading(false)
      })
  }

   const deleta = async () => {
  
        const usuario = await AsyncStorage.getItem('usuario');
  
        const array = JSON.parse(usuario);
  
        api.delete(`/deleta-usuario/${array.user['id']}`)
        .then(res =>{
          console.log('deletado', res.data)
          navigation.navigate('Login')
        })
        .catch(erro => {
  console.log('erro', erro.response?.data || erro.message)
        });
        
      }


  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color='#ccc'>
          <Text>carregando...</Text>
        </ActivityIndicator>
      </View>
    )
  }



  return (
    <View style={styles.container}>
      <View style={styles.containerPerfil}>
        <View style={styles.containerImage}>
          <Image style={styles.foto} source={require('../../../assets/perfilPng.png')}></Image>
          {
            textoLogin == false ?
              <Text>{nome}</Text>
              :
              <ActivityIndicator size='large' color='#ccc'>
                <Text>carregando...</Text>
              </ActivityIndicator>
          }

        </View>
        <View style={styles.opcoes}>
          <View>
            <Pressable onPress={() => setModal(true)}>
              <Text>editar</Text>
            </Pressable>
          </View>
          <View>
            <Pressable onPress={() => deleta()}>
              <Text>apagr</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <StatusBar style="auto" />

      <Modal transparent={true} visible={modal}>
        <View style={styles.containerModal}>
          <View>
            {
              textoLogin == false ? (
                <>
                  <Text>edite seu dados</Text>

                  <Pressable onPress={() => { }}>
                    {imagem == null ?
                      <Image style={styles.img} source={require('../../../assets/perfilPng.png')}></Image>
                      :
                      <Image style={styles.img} source={{ uri: imagem }}></Image>
                    }
                  </Pressable>
                  <Text>nome</Text>

                  <TextInput
                    style={styles.input}
                    value={nome}
                    onChangeText={setnome}

                  />
                  <Text>email</Text>
                  <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}

                  />
                  <Text>nascimento</Text>
                  <TextInput
                    style={styles.input}
                    value={nasci}
                    onChangeText={setNasci}

                  />
                  <Text>senha</Text>
                  <TextInput
                    style={styles.input}
                    value={senha}
                    onChangeText={setSenha}
                  />

                  <Pressable style={styles.botao} onPress={() => update()}>
                    <Text style={styles.letraBotao}>aperte</Text>
                  </Pressable>
                  <Pressable style={styles.botao} onPress={() => setModal(false)}>
                    <Text style={styles.letraBotao}>fecha</Text>
                  </Pressable>
                </>)
                :
                <ActivityIndicator size='large' color='blue'>
                  <Text>carregando...</Text>
                </ActivityIndicator>
            }
          </View>
        </View>
      </Modal>
    </View>


  );
}
