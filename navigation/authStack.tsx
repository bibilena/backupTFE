import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "../screens/Welcome";
import SignInScreen from "../screens/SignInScreen";
import SignOutScreen from "../screens/SignUpScreen";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Bienvenue" component={WelcomeScreen} />
        <Stack.Screen name="Se connecter" component={SignInScreen} />
        <Stack.Screen name="Se créer un compte" component={SignOutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
