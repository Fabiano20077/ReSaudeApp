import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, Pressable, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import styles from './styleSangue';
import api from '../api';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {

    const navigation = useNavigation();

    const [sangue, setSangue] = useState('');
    const [loanding, setLoading] = useState(false);

    useEffect(() => {

        const vemId = async () => {
            setLoading(true)
            const valor = await AsyncStorage.getItem('usuario')
            const usuario = JSON.parse(valor)
            const id = usuario.user['id']

            api.get(`/chamar-usuario/${id}`)
                .then(res => {
                    console.log('foi', res.data)
                    setSangue(res.data.user.sangue)
                    setLoading(false)
                })
                .catch(erro => {
                    console.log('erro', erro.response?.data || erro.messagem)
                    setLoading(false)
                })
        }

        vemId();
    }, [])

    if (loanding) {
        return (
            <ActivityIndicator size='large' color='blue'>
                <Text>carregando...</Text>
            </ActivityIndicator>
        )
    }


    return (
        <View style={styles.container}>
            <View style={styles.containerSangue}>
                <Text>{sangue}</Text>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}