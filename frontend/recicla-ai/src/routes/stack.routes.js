import { createBottomTabNavigator, createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feather } from "react-native-vector-icons";

import LoginScreen from "../pages/Login";
import CompanyRegisterScreen from "../pages/RegisterCompany";
import UserRegisterScreen from "../pages/RegisterUser";

import TabRoutes from "./tab.routes";
import TabRoutesCompany from "./tabCompany.routes";


const Stack = createNativeStackNavigator();

export default function StackRoutes() {
    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{ animation: "slide_from_right"}}>
            <Stack.Screen
                name="Login"
                component={LoginScreen}
            />
            <Stack.Screen
                name="CompanyRegister"
                component={CompanyRegisterScreen}
                options={{ title: "Cadastro de Usuário" }}
            />
            <Stack.Screen
                name="UserRegister"
                component={UserRegisterScreen}
                options={{ title: "Cadastro de Empresa" }}
            />
            <Stack.Screen name="HomeUser" component={TabRoutes} options={{ headerShown: false }}/>

            <Stack.Screen name="HomeCompany" component={TabRoutesCompany} options={{ headerShown: false }}/>
        </Stack.Navigator>
    )
}