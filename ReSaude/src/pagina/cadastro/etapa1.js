import { StatusBar } from 'expo-status-bar';
import { View, Text, Pressable, Image, TextInput, ActivityIndicator, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import api from '../api';
import styles from './style';


export default function etapa1({ data, onChange, onNext }) {


    /*  const [nome, setNome] = useState('');
     const [email, setEmail] = useState('');
     const [nasci, setNasci] = useState(''); */
    const [loading, setLoading] = useState(false);

    const insert = () => {
        setLoading(true)

        var usuario = new FormData();

        usuario.append('inputNome', data.nome)
        usuario.append('inputEmail', data.email)
        usuario.append('inputNasci', data.nasci)



        api.post('/cadastra-etapa1', usuario)
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
                        ETAPA 1
                    </Text>
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

                    <Pressable style={styles.botao} onPress={() => insert()}>
                        <Text style={styles.texto}>Aperte</Text>
                    </Pressable>
                </View>
            </View>

            <StatusBar style="auto" />
        </View>
    );
}
