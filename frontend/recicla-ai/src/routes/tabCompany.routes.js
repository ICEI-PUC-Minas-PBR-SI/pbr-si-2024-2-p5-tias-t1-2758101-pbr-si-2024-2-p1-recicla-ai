import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "react-native-vector-icons";

import Points from "../pages/company/MyPoints";
import Settings from "../pages/company/Settings";
import RegisterPointsUser from "../pages/company/RegisterPoints";
import RegisterRecyclePoints from "../pages/company/RegisterRecyclePoints";

const Tab = createBottomTabNavigator();

export default function TabRoutesCompany() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Meus Pontos de Coleta"
        component={Points}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />,
          tabBarLabel: "Pontos de Coleta"
        }}
      />
      <Tab.Screen
        name="RegisterRecyclePoint"
        component={RegisterRecyclePoints}
        headerShown={true}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="plus" color={color} size={size} />,
          tabBarLabel: "Novo Ponto"
        }}
      />
      <Tab.Screen
        name="RegisterPoints"
        component={RegisterPointsUser}
        headerShown={true}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="user-plus" color={color} size={size} />,
          tabBarLabel: "Pontos"
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Settings}
        headerShown={true}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="settings" color={color} size={size} />,
          tabBarLabel: "Perfil"
        }}
      />

    </Tab.Navigator>
  );
}
