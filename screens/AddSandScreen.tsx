import { StackScreenProps } from "@react-navigation/stack";
import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet, TextInput, Alert } from "react-native";
import { Button } from "react-native-elements";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";
import fireDB from "../config/firebase";

const AddSandScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const auth = getAuth();
  const [sand, setSand] = React.useState({
    nom: "",
    prix: "",
    description: "",
    error: ""
  });

  const [sand2, setSand2]: any = useState([]);


 async function backToMenu(){
    addData(sand.nom, sand.prix, sand.description)
    const docRef = doc(fireDB, "Sandwichs", sand.nom)
    const docSnap = await getDoc(docRef)
    if(sand.nom === "" || sand.prix === "" || sand.description === ""){
      return
    }
    else if(docSnap.exists()){
      return
    }
    else{    navigation.navigate("Menu")
    console.log("retour");
    
    
  }
  }

  async function addData(nom: string, prix: string, description: string) {
    if (sand.nom === "" || sand.prix === "" || sand.description === "") {
      setSand({
        ...sand,
        error: "Vous n'avez pas remplis tous les champs",
      });
            
      return;
    }
    const docRef = doc(fireDB, "Sandwichs", sand.nom)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()){
      setSand({
        ...sand,
        error: "Ce Sandwich existe déjà",
      });
      
      return;
    }
    try {
      const prix2=parseFloat(prix)
      await setDoc(doc(fireDB, "Sandwichs", nom), {
        Nom: nom,
        Prix: prix2,
        Description: description,
      });
    } catch (error) {
      Alert.alert("erreur", "une erreur a été rencontrée");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.containertitre}>
          <Text style={styles.titre}>Ajout de Sandwichs</Text>
        </View>
        {!!sand.error && (
          <View style={styles.error2}>
        <View style={styles.error}>
          <Text>{sand.error}</Text>
        </View>
        </View>
      )}
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
            onPress={() => backToMenu()}
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
      paddingHorizontal: 120,
      alignItems: "center",
      justifyContent: "center",
    },
    titre: {
      fontWeight: "bold",
      fontSize: 40,
      marginTop: 15,
      marginBottom: 50,
      color: "#f47069",
      alignItems: "center",
    },
    containertitre: {
      alignItems: "center",
    },
    buttonPers: {
      width: "125%",
      borderRadius: 25,
      height: 50,
      marginTop: 20,
      marginBottom: 10,
      backgroundColor: "#3a8f61",
      paddingHorizontal: 40,
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
      marginVertical: 50
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
      alignContent: "center"
    },
    error2:{
      alignItems: "center"
    }
  
  });

export default AddSandScreen;
