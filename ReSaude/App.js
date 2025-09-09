import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Login from './src/pagina/login';
import Cadastro from './src/pagina/cadastro';
import Dashboard from './src/pagina/dashboard';


export default function App() {

    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator>

                <Stack.Screen name='Login' component={Login}
                    options={{ headerShown: false }} />
                <Stack.Screen name='Cadastro' component={Cadastro} />
                <Stack.Screen name='Dashboard' component={Dashboard} />

            </Stack.Navigator>

        </NavigationContainer>

    );
}
