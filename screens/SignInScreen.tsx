import React from "react";
import { StyleSheet, Text, View, Image, LogBox } from "react-native";
import { Button } from "react-native-elements";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { TextInput } from "react-native-gesture-handler";

LogBox.ignoreAllLogs()

const auth = getAuth();

const SignInScreen = () => {
  const [value, setValue] = React.useState({
    email: "",
    password: "",
    error: "",
  });

  async function signIn() {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
    } catch (error) {
      setValue({
        ...value,
        error: "Account does not exist",
      });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Se connecter</Text>

      {!!value.error && (
        <View style={styles.error}>
          <Text>{value.error}</Text>
        </View>
      )}

      <View style={styles.controls}>
        <View style={styles.images}>
          <Image source={require("../assets/mail.png")} style={styles.image} />
          <TextInput
            placeholder="Email"
            style={styles.control}
            value={value.email}
            onChangeText={(text) => setValue({ ...value, email: text })}
          />
        </View>
        <View style={styles.images}>
          <Image source={require("../assets/lock.png")} style={styles.image} />
          <TextInput
            placeholder="Mot de passe"
            style={styles.control}
            value={value.password}
            onChangeText={(text) => setValue({ ...value, password: text })}
            secureTextEntry={true}
          />
        </View>

        <Button title="Se connecter" buttonStyle={styles.button} onPress={signIn} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  titre: {
    fontWeight: "bold",
    fontSize: 40,
    marginBottom: 50,
    color: "#f47069",
  },

  controls: {
    flex: 1,
    alignItems: "center",
  },

  control: {
    width: 250,
    borderBottomWidth: 1,
    height: 50,
    marginBottom: 25,
    color: "#000",
  },

  images: {
    flexDirection: "row",
  },

  image: {
    marginTop: 15,
    marginRight: 5,
  },

  button: {
    width: 200,
    borderRadius: 25,
    height: 50,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "#3a8f61",
    paddingHorizontal: 25,
  },

  error: {
    marginTop: 10,
    padding: 10,
    color: "#fff",
    backgroundColor: "#D54826FF",
  },
});

export default SignInScreen;
