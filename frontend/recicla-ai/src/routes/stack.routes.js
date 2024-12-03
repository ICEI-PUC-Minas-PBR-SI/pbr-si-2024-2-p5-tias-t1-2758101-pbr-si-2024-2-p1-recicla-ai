import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../pages/Login";
import CompanyRegisterScreen from "../pages/RegisterCompany";
import UserRegisterScreen from "../pages/RegisterUser";


const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ animation: "slide_from_right" }}>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />

      <Stack.Screen
        name="CompanyRegister"
        component={CompanyRegisterScreen}
        options={{ title: "Cadastro de Empresa" }}
      />

      <Stack.Screen
        name="UserRegister"
        component={UserRegisterScreen}
        options={{ title: "Cadastro de Usuário" }}
      />

    </Stack.Navigator>
  );
}
