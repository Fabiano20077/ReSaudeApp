import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, Pressable, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import styles from './styleMmc';
import axios from 'axios';


export default function App() {

  const navigation = useNavigation();

  const [imc, setImc] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [message, setMessage] = useState('');

  const calcularImc = () => {

    if (!peso) {
      alert('digt o peso')
      return false
    }

    if (!altura) {
      alert('digite o peso')
      return false
    }

    const ImcPrepa = peso / (altura * altura);

    if (ImcPrepa < 18.5) {
      setPeso('')
      setAltura('')
      setMessage('seu peso estar abaixo');
      setImc(ImcPrepa.toFixed(2))
    } else if (ImcPrepa >= 18.5 && ImcPrepa < 25) {
      setPeso('')
      setAltura('')
      setMessage('seu peso estar normal');
      setImc(ImcPrepa.toFixed(2));
    } else if (ImcPrepa >= 25 && ImcPrepa < 30) {
      setPeso('')
      setAltura('')
      setMessage('seu peso estar sobrepeso');
      setImc(ImcPrepa.toFixed(2));
    } else {
      setMessage('seu peso estar obesidsde');
      setImc(ImcPrepa.toFixed(2));
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.containerImc}>
        <View style={styles.containerCalcular}>
          <Text>qual seu peso</Text>
          <TextInput
            style={styles.input}
            value={peso}
            onChangeText={setPeso}
          />
          <Text>qua sua altura</Text>
          <TextInput
            style={styles.input}
            value={altura}
            onChangeText={setAltura}
          />

          <Pressable style={styles.botao} onPress={() => calcularImc()}>
            <Text>calcular</Text>
          </Pressable>
        </View>
        <View style={styles.containerMostrarImc}>
          <Text>{imc} {message}</Text>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}