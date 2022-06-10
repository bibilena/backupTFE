import { StackScreenProps } from "@react-navigation/stack";
import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import { Button } from "react-native-elements";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import fireDB from "../config/firebase";
import Toast from "react-native-root-toast";

const AddSandScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [sand, setSand] = React.useState({
    nom: "",
    prix: "",
    description: "",
  });

  async function addData(nom: string, prix: string, description: string) {
    if (sand.nom === "" || sand.prix === "" || sand.description === "") {
      Alert.alert("Tous les champs ne sont pas remplis");

      return;
    }
    const docRef = doc(fireDB, "Sandwichs", sand.nom);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      Alert.alert("Ce sandwich existe déja");

      return;
    }
    try {
      const prix2 = parseFloat(prix);
      await setDoc(doc(fireDB, "Sandwichs", nom), {
        Nom: nom,
        Prix: prix2,
        Description: description,
      });
      let toastAdd = Toast.show("Sandwich ajouté", {
        duration: Toast.durations.SHORT,
      });
    } catch (error) {
      Alert.alert("erreur", "une erreur a été rencontrée");
    }
  }

  async function modData(nom: string, prix: string, description: string) {
    if (sand.nom === "" || sand.prix === "" || sand.description === "") {
      Alert.alert("Tous les champs ne sont pas remplis");

      return;
    }
    const docRef = doc(fireDB, "Sandwichs", sand.nom);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      Alert.alert("Ce sandwich n'existe pas");

      return;
    }
    try {
      const prix2 = parseFloat(prix);
      await setDoc(doc(fireDB, "Sandwichs", nom), {
        Nom: nom,
        Prix: prix2,
        Description: description,
      });
      let toastMod = Toast.show("Sandwich modifié", {
        duration: Toast.durations.SHORT,
      });
    } catch (error) {
      Alert.alert("erreur", "une erreur a été rencontrée");
    }
  }

  async function suppData(nom: string) {
    if (sand.nom === "") {
      Alert.alert("Veuillez entrer le nom du sandwich a supprimer");

      return;
    }
    const docRef = doc(fireDB, "Sandwichs", sand.nom);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      Alert.alert("Ce sandwich n'existe pas");

      return;
    }
    try {
      await deleteDoc(doc(fireDB, "Sandwichs", nom));
      let toastSupp = Toast.show("Sandwich supprimé", {
        duration: Toast.durations.SHORT,
      });
    } catch (error) {
      Alert.alert("erreur", "une erreur a été rencontrée");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.containertitre}>
          <Text style={styles.titre}>Changement du menu</Text>
        </View>
        <View style={styles.nomSand}>
          <TextInput
            placeholderTextColor={"#bbb"}
            placeholder="Nom du sandwich"
            style={styles.nomSand}
            value={sand.nom}
            onChangeText={(text) => setSand({ ...sand, nom: text })}
          />
          <TextInput
            placeholderTextColor={"#bbb"}
            keyboardType="numeric"
            placeholder="Prix du sandwich"
            style={styles.nomSand}
            value={sand.prix}
            onChangeText={(text) => setSand({ ...sand, prix: text })}
          />
          <TextInput
            placeholderTextColor={"#bbb"}
            placeholder="Description du sandwich"
            style={styles.nomSand}
            value={sand.description}
            onChangeText={(text) => setSand({ ...sand, description: text })}
          />
        </View>

        <View style={styles.container4}>
          <Button
            title="Ajouter"
            buttonStyle={styles.buttonPers}
            onPress={() => addData(sand.nom, sand.prix, sand.description)}
          />
          <Button
            title="Modifier"
            buttonStyle={styles.buttonPers}
            onPress={() => modData(sand.nom, sand.prix, sand.description)}
          />
          <Button
            title="Supprimer"
            buttonStyle={styles.buttonPers}
            onPress={() => suppData(sand.nom)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
  },
  container4: {
    flex: 3,
    paddingVertical: "10%",
    justifyContent: "center",
  },
  titre: {
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 15,
    marginBottom: 50,
    color: "#f47069",
    alignItems: "center",
    alignContent: "center",
  },
  containertitre: {
    alignItems: "center",
  },
  buttonPers: {
    width: "40%",
    marginHorizontal: "30%",
    borderRadius: 25,
    backgroundColor: "#3a8f61",
    marginBottom: "5%",
  },
  nomSand: {
    color: "#fff",
    borderRadius: 15,
    fontSize: 20,
    padding: 10,
    backgroundColor: "#3a8f61",
    marginLeft: 15,
    marginTop: 5,
    width: "92%",
    paddingRight: 50,
    borderBottomWidth: 1,
    marginVertical: 50,
  },
  controls: {
    flex: 1,
    alignItems: "center",
  },
  error: {
    marginTop: 10,
    padding: 10,
    color: "#fff",
    backgroundColor: "#D54826FF",
    width: "50%",
    alignContent: "center",
  },
  error2: {
    alignItems: "center",
  },
});

export default AddSandScreen;
