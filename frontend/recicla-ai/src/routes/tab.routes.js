import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "react-native-vector-icons";

import Points from "../pages/Points"
import Profile from "../pages/Profile"


const Tab = createBottomTabNavigator();

export default function TabRoutes() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name="Pontos"
                component={Points}
                options={{
                    tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />,
                    tabBarLabel: "Inicio"
                }}
            />
            <Tab.Screen
                name="Perfil"
                component={Profile}
                options={{
                    tabBarIcon: ({ color, size }) => <Feather name="user" color={color} size={size} />,
                    tabBarLabel: "Perfil"
                }}
            />
        </Tab.Navigator>
    )
}