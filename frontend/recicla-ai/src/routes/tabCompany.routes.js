import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "react-native-vector-icons";

import Points from "../pages/company/MyPoints"
import Profile from "../pages/user/Profile"
import RegisterPoints from "../pages/company/RegisterPoints";


const Tab = createBottomTabNavigator();

export default function TabRoutesCompany() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name="Meus Pontos de coleta"
                component={Points}
                options={{
                    tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />,
                    tabBarLabel: "Pontos de Coleta"
                }}
            />
            <Tab.Screen
                name="RegisterPoints"
                component={RegisterPoints}
                headerShown={true}
                options={{
                    tabBarIcon: ({ color, size }) => <Feather name="plus" color={color} size={size} />,
                    tabBarLabel: "Cadastro de Pontos"
                }}
            />
            <Tab.Screen
                name="Perfil"
                component={Profile}
                headerShown={true}
                options={{
                    tabBarIcon: ({ color, size }) => <Feather name="user" color={color} size={size} />,
                    tabBarLabel: "Perfil"
                }}
            />
        </Tab.Navigator>
    )
}