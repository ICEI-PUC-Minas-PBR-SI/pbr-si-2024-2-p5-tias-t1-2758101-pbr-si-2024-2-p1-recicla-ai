import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, FontAwesome } from "react-native-vector-icons";

import RecyclingPoints from "../pages/user/RecyclingPoints";
import Shopping from "../pages/user/Shopping";
import History from "../pages/user/History"
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
          tabBarLabel: "Pontos de Coleta",
        }}
      />
      <Tab.Screen
        name="Meus pontos"
        component={Shopping}
        options={{
          tabBarIcon: ({ color, size }) => <FontAwesome name="recycle" color={color} size={size} />,
          tabBarLabel: "Meus Pontos",
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="file-text" color={color} size={size} />,
          tabBarLabel: "Histórico",
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
