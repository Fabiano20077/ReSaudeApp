import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './style';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>ola mundo</Text>
      <StatusBar style="auto" />
    </View>
  );
}
