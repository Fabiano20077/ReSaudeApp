import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, Pressable, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import styles from './styleAgua';
import axios from 'axios';


export default function App() {

  const navigation = useNavigation();


  return (
    <View style={styles.container}>
      <Text>agua</Text>
      <StatusBar style="auto" />
    </View>
  );
}