import { StatusBar } from 'expo-status-bar';
import { View, Text, Pressable, Image, TextInput, ActivityIndicator, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import api from '../api';
import styles from './style';

import Etapa1 from './etapa1';
import Etapa2 from './etapa2';
import Etapa3 from './etapa3';
import Etapa4 from './etapa4';
import Etapa5 from './etapa100';

export default function App() {

  const Navigation = useNavigation();

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    nasci: "",
    cpf: "",
    cep: "",
    logradouro: "",
    num: "",
    bairro: "",
    uf: "",
    cidade: "",
    foto: "",
    senha: "",
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <View style={styles.container}>


      {step == 1 && (
        <Etapa1
          data={formData}
          onChange={handleChange}
          onNext={() => setStep(2)}
        />
      )}

      {step == 2 && (
        <Etapa2
          data={formData}
          onChange={handleChange}
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}

      {step == 3 && (
        <Etapa3
          data={formData}
          onChange={handleChange}
          onBack={() => setStep(2)}
          onNext={() => setStep(4)}
        />
      )}
      {step == 4 && (
        <Etapa4
          data={formData}
          onChange={handleChange}
          onBack={() => setStep(3)}
          onNext={() => setStep(5)}
        />
      )}
      {step == 5 && (
        <Etapa5
          data={formData}
          onChange={handleChange}
          onBack={() => setStep(4)}
          onFinish={() => Navigation.navigate('Login')}
        />
      )}



      <StatusBar style="auto" />
    </View>
  );
}
