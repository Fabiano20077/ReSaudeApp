import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, Pressable, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import styles from './style';
import api from '../api';


export default function App() {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      
      <StatusBar style="auto" />
    </View>
  );
}