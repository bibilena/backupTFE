import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MenuScreen from "../screens/MenuScreen";
import PersonnaliserScreen from "../screens/PersonnaliserScreen";
import PanierScreen from "../screens/PanierScreen";
import AddSandScreen from "../screens/AddSandScreen"
import OrdersScreen from "../screens/OrderScreen";

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Personnaliser" component={PersonnaliserScreen} />
        <Stack.Screen name="Panier" component={PanierScreen} />
        <Stack.Screen name="Changement" component={AddSandScreen} />
        <Stack.Screen name="Commandes en cours" component={OrdersScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
