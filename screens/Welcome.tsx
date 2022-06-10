import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { Button } from "react-native-elements";

const WelcomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.containerSc}>
      <ScrollView style={styles.containerSc}>
        <View style={styles.container}>
          <Text style={styles.titre}>Bienvenue!</Text>
          <View><Image source={require("../assets/logo.png")} style={styles.image} /></View>
          <View style={styles.buttons}>
            <Button
              title="SE CONNECTER"
              buttonStyle={styles.button}
              onPress={() => navigation.navigate("Se connecter")}
            />
            <Button
              title="SE CRÉER UN COMPTE"
              buttonStyle={styles.button}
              onPress={() => navigation.navigate("Se créer un compte")}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    width: "100%",
  },
  containerSc:{
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
  },
  titre: {
    fontWeight: "bold",
    fontSize: 40,
    marginBottom: 50,
    color: "#f47069",
  },

  buttons: {
    marginLeft: 50,
  },

  button: {
    width: "90%",
    borderRadius: 25,
    height: 50,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "#3a8f61",
    paddingHorizontal: 25,
  },
  image: {
    marginTop: 15,
    marginRight: 5,
    width: 250,
    height: 250,

  },
});

export default WelcomeScreen;
