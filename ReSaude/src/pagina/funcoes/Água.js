import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, Pressable, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import styles from './styleÁgua';
import axios from 'axios';


export default function App() {

  const navigation = useNavigation();

  const [peso, setPeso] = useState('');
  const [agua, setAgua] = useState('');

  const calcularAgua = () => {

    if (!peso) {
      alert('Ditige o peso')
      return false
    };

    const aguaPreparar =peso * 35/1000;
    

    setPeso('')
    setAgua(aguaPreparar.toFixed(0))
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerAgua}>
        <View style={styles.containerCalcular}>
          <Text>Qual seu peso?</Text>
          <TextInput
            style={styles.input}
            value={peso}
            onChangeText={setPeso}
          />
          <Pressable style={styles.botao}onPress={() => calcularAgua() }>
            <Text style={styles.txt}>Calcular</Text>
          </Pressable>
        </View>
        <View style={styles.containerMostra}>
          <Text style={styles.txt}> {agua} litros</Text>
          
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}