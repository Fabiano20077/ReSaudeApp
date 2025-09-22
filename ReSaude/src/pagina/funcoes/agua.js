import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, Pressable, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import styles from './styleAgua';
import axios from 'axios';


export default function App() {

  const navigation = useNavigation();

  const [peso, setPeso] = useState('');
  const [agua, setAgua] = useState('');

  const calcularAgua = () => {

    if (!peso) {
      alert('ditige o peso')
      return false
    };

    const aguaPreparar = peso * 35;

    setPeso('')
    setAgua(aguaPreparar.toFixed(0))
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerAgua}>
        <View style={styles.containerCalcular}>
          <Text>qual seu peso</Text>
          <TextInput
            style={styles.input}
            value={peso}
            onChangeText={setPeso}
          />
          <Pressable onPress={() => calcularAgua()}>
            <Text>calcular</Text>
          </Pressable>
        </View>
        <View style={styles.containerMostra}>
          <Text> {agua} litros</Text>
          
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}