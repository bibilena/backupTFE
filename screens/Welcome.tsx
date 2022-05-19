import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Button } from 'react-native-elements';

const WelcomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Welcome!</Text>

      <View style={styles.buttons}>
        <Button title="Sign in" buttonStyle={styles.button} onPress={() => navigation.navigate('Sign In')} />
        <Button title="Sign up" type="outline" buttonStyle={styles.button} onPress={() => navigation.navigate('Sign Up')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#444956",
    alignItems: "center",
  },
  
  titre: {
    fontWeight: "bold",
    fontSize: 40,
    marginBottom: 50,
    color: "#fff",
  },

  buttons: {
    marginLeft: 50
  },

  button: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "#2E2B2B",
    paddingHorizontal: 25
  }
});

export default WelcomeScreen;