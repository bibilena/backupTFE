import React from "react";
import { StyleSheet, Text, View, Image, Alert, LogBox } from "react-native";
import { Button } from "react-native-elements";
import { StackScreenProps } from "@react-navigation/stack";
import { TextInput } from "react-native-gesture-handler";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

LogBox.ignoreAllLogs();

const SignUpScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [value, setValue] = React.useState({
    email: "",
    password: "",
    error: "",
  });
  const auth = getAuth();

  async function signUp() {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, value.email, value.password);
      navigation.navigate("Sign In");
    } catch (error) {
      if (value.email.indexOf("@") == -1) {
        setValue({
          ...value,
          error: "enter a valid email",
        });
      } else if (value.password.length < 6) {
        setValue({
          ...value,
          error: "password too short",
        });
        return;
      } else {
        setValue({
          ...value,
          error: "account already exist",
        });
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Se créer un compte!</Text>

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
            placeholder="Password"
            style={styles.control}
            value={value.password}
            onChangeText={(text) => setValue({ ...value, password: text })}
            secureTextEntry={true}
          />
        </View>

        <Button title="Sign up" buttonStyle={styles.button} onPress={signUp} />
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

export default SignUpScreen;
