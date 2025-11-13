import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./src/pagina/login";
import Cadastro from "./src/pagina/cadastro";
import Dashboard from "./src/pagina/dashboard";
import Perfil from "./src/pagina/perfil";
import Calorias from "./src/pagina/funcoes/calorias";
import Mmc from "./src/pagina/funcoes/Imc";
import agua from "./src/pagina/funcoes/Água";
import Vacinas from "./src/pagina/funcoes/Vacinas";
import Sangue from "./src/pagina/funcoes/sangue";
import Relogio from "./src/pagina/funcoes/relogio";
import Musica from "./src/pagina/funcoes/musica";

import geolocalizacao from "./src/pagina/geolocalizacao/index";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="geolocalizacao"
          component={geolocalizacao}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Água"
          component={agua}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Sangue"
          component={Sangue}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Imc"
          component={Mmc}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Calorias"
          component={Calorias}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Vacinas" component={Vacinas} />
        <Stack.Screen
          name="Perfil"
          component={Perfil}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Relogio"
          component={Relogio}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Musica"
          component={Musica}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
