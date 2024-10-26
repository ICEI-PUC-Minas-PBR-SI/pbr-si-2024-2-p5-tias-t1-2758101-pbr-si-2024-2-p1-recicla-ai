import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, TransitionPresets } from "@react-navigation/native-stack";
import LoginScreen from "./src/pages/Login";
import CompanyRegisterScreen from "./src/pages/RegisterCompany";
import UserRegisterScreen from "./src/pages/RegisterUser";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{
          animation: "slide_from_right",
        }}>
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: "Login" }}
        />
        <Stack.Screen 
          name="CompanyRegister" 
          component={CompanyRegisterScreen} 
          options={{ title: "Cadastro da Empresa" }}
        />
        <Stack.Screen 
          name="UserRegister" 
          component={UserRegisterScreen} 
          options={{ title: "Cadastro de Usuário" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}