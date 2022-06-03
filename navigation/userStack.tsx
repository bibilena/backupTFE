import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MenuScreen from "../screens/MenuScreen";
import PersonnaliserScreen from "../screens/PersonnaliserScreen";
import PanierScreen from "../screens/PanierScreen";

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Personnaliser" component={PersonnaliserScreen} />
        <Stack.Screen name="Panier" component={PanierScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
