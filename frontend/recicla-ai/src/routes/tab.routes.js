import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, FontAwesome } from "react-native-vector-icons";

import RecyclingPoints from "../pages/user/RecyclingPoints";
import Home from "../pages/user/Home";
import Profile from "../pages/user/Profile";

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name="Pontos"
                component={RecyclingPoints}
                options={{
                    tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />,
                    tabBarLabel: "Pontos de coleta",
                }}
            />
            <Tab.Screen
                name="Meus pontos"
                component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => <FontAwesome name="recycle" color={color} size={size} />,
                    tabBarLabel: "Meus pontos",
                }}
            />
            <Tab.Screen
                name="Perfil"
                component={Profile}
                options={{
                    tabBarIcon: ({ color, size }) => <Feather name="user" color={color} size={size} />,
                    tabBarLabel: "Perfil",
                }}
            />
        </Tab.Navigator>
    );
}
