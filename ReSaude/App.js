import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Login from './src/pagina/login';
import Cadastro from './src/pagina/cadastro';
import Dashboard from './src/pagina/dashboard';
import Perfil from './src/pagina/perfil';
import Calorias from './src/pagina/funcoes/calorias';
import Mmc from './src/pagina/funcoes/mmc';
import agua from './src/pagina/funcoes/agua';
import Sangue from './src/pagina/funcoes/sangue';



export default function App() {

    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator>

                <Stack.Screen name='Login' component={Login}
                    options={{ headerShown: false }} />
                <Stack.Screen name='agua' component={agua} />
                <Stack.Screen name='Mmc' component={Mmc} />
                <Stack.Screen name='Calorias' component={Calorias} />
                <Stack.Screen name='Perfil' component={Perfil}
                    options={{ headerShown: true }} />
                <Stack.Screen name='Cadastro' component={Cadastro}
                options={{ headerShown: false }}  />
                <Stack.Screen name='Dashboard' component={Dashboard}
                    options={{ headerShown: false }} />
                <Stack.Screen name='Sangue' component={Sangue} />

            </Stack.Navigator>

        </NavigationContainer>

    );
}
