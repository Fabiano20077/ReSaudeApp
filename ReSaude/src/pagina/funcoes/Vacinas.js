import { StatusBar } from 'expo-status-bar';
import { View, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import styles from './styleVacinas';
import api from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const vacinas = [
    {
      categoria: 'Crianças (0–9 anos)',
      lista: [
        'BCG – ao nascer (previne formas graves de tuberculose)',
        'Hepatite B – ao nascer e reforços no 2º e 6º mês',
        'Pentavalente (DTP + Hib + Hepatite B) – 2, 4 e 6 meses',
        'VIP/VOP (pólio) – 2, 4, 6 e 15 meses',
        'Rotavírus – 2 e 4 meses',
        'Pneumocócica 10-valente – 2, 4 e 12 meses',
        'Meningocócica C – 3 e 5 meses, reforço aos 12 meses',
        'Tríplice viral (sarampo, caxumba e rubéola) – 12 e 15 meses',
        'Varicela – 15 meses',
      ],
    },
    {
      categoria: 'Adolescentes (10–19 anos)',
      lista: [
        'dT (difteria e tétano) – reforço a cada 10 anos',
        'Tríplice viral (sarampo, caxumba, rubéola) – 2 doses se não vacinado',
        'HPV quadrivalente – duas doses (meninas e meninos até 14 anos)',
        'Hepatite B – completar 3 doses se necessário',
        'Meningocócica ACWY – dose aos 11–14 anos',
      ],
    },
    {
      categoria: 'Adultos (20–59 anos)',
      lista: [
        'dT (difteria e tétano) – reforço a cada 10 anos',
        'Hepatite B – 3 doses, se não vacinado',
        'Tríplice viral – 2 doses até 29 anos, 1 dose de 30 a 59 anos',
        'Febre amarela – 1 dose até 59 anos (dependendo da região)',
        'Covid-19 – conforme esquema anual vigente',
      ],
    },
    {
      categoria: 'Gestantes',
      lista: [
        'dTpa – uma dose a cada gestação (a partir da 20ª semana)',
        'Influenza (gripe) – em qualquer idade gestacional, 1 dose anual',
        'Hepatite B – completar esquema, se necessário',
        'Covid-19 – conforme recomendação atual do MS',
      ],
    },
    {
      categoria: 'Puérperas (até 45 dias após o parto)',
      lista: [
        'Influenza (gripe) – 1 dose anual, se não recebeu durante a gestação',
        'dTpa – se não vacinou durante a gestação',
        'Hepatite B – completar esquema, se necessário',
        'Covid-19 – conforme calendário anual vigente',
      ],
    },
    {
      categoria: 'Idosos (60 anos ou mais)',
      lista: [
        'Influenza (gripe) – dose anual',
        'dT ou dTpa – reforço a cada 10 anos',
        'Hepatite B – 3 doses se esquema incompleto',
        'Covid-19 – conforme calendário atualizado',
        'Pneumocócica 23-valente – recomendada para grupos de risco',
      ],
    },
  ];

  return(
    <ScrollView>
    <StatusBar style="auto" />
    <Text>Vacinas Obrigatórias por Categoria</Text>

    {vacinas.map((grupo, index) => (
      <View key={index}>
        <Text>{grupo.categoria}</Text>
        {grupo.lista.map((item, i) => (
          <Text key={i} >• {item}</Text>
        ))}
      </View>
    ))}
  </ScrollView>
  );

export default function App() {

    const navigation = useNavigation();
    const [Vacinas, setVacinas] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const vemId = async () => {
            setLoading(true);
            try {
                const valor = await AsyncStorage.getItem('usuario');
                if (!valor) {
                    console.log("Nenhum usuário salvo no AsyncStorage");
                    setLoading(false);
                    return;
                }

                const usuario = JSON.parse(valor);
                const id = usuario.user['id'];

                const res = await api.get(`/chamar-usuario/${id}`);
                console.log('foi', res.data);
                setVacinas(res.data.user.sangue);
            } catch (erro) {
                console.log('erro', erro.response?.data || erro.message);
            } finally {
                setLoading(false);
            }
        };

        vemId();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="blue" />
                <Text>Carregando...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerSangue}>
                <Text>{Vacinas}</Text>
            </View>
            <StatusBar style="auto" />
        </View>

        
    );
}