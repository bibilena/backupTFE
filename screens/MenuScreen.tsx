import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import { Button } from "react-native-elements";
import { getAuth, signOut } from "firebase/auth";
import { StackScreenProps } from "@react-navigation/stack";

import { getAnalytics, logEvent } from "firebase/analytics";
import firebase from "firebase/app"
import * as Analytics from "expo-firebase-analytics"

import AsyncStorage from "@react-native-async-storage/async-storage"


import {
  collection,
  getDocs,

} from "firebase/firestore";
import fireDB from "../config/firebase";

import { getCountPanier } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  addCart,
  deleteFromCart,
  deleteAllFromCart,
} from "../redux/cartReducer";
import { countPlus, countMoins, initCount} from "../redux/CountPanierReducer"

const Menu: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const auth = getAuth();
  const [sand, setSand]: any = useState([]);
  const dispatch = useDispatch();
  const countPanier = useSelector(getCountPanier);


  function signOutCartEmpty() {
    dispatch(deleteAllFromCart());
    signOut(auth);
  }
  function addPanier(nom: string, prix: number) {
    dispatch(addCart(nom, prix));
    dispatch(countPlus());
  }
  function removePanier(nom: string) {
    dispatch(deleteFromCart(nom));
    dispatch(countMoins())
  }

  useEffect(() => {
    getData();
  }, []);

  const userConnected = auth.currentUser;

  function adminButton(user: any) {
    if (user.uid === "Geq4ULiVB7cwdteWJXquaPpLAog1") {
      return (
        <View>
          <Button
            title="Ajouter Sandwich"
            buttonStyle={styles.addSand}
            onPress={() => navigation.navigate("Ajout")}
          />
          <Button
            title={"Commande en cours "}
            buttonStyle={styles.orders}
            onPress={() => navigation.navigate("Orders")}
          />
        </View>
      );
    }
  }

  async function getData() {
    try {
      const sandwich = await getDocs(collection(fireDB, "Sandwichs"));
      const sandwichsArray: any[] = [];
      sandwich.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };

        sandwichsArray.push(obj);
      });

      setSand(sandwichsArray);
      console.log(sand);
    } catch (error) {
      Alert.alert;
    }
  }

 async function testing(){
   await Analytics.logEvent("connect", {
      connet: true
    })
  }

  function addingSandwich() {
    let counct = 0
    return (
      <>
        {sand.map((element: any) => (
          <View style={styles.container2} key={counct}>
            <Text style={styles.nomSand}>
              {element.Nom}<Text style={styles.invisible}>{counct = counct + 1}</Text>


              <Button
                title="Ajouter"
                onPress={() => addPanier(element.Nom, element.Prix)}
              />
              <Text>   </Text>
              <Button
                title="Supprimer"
                onPress={() => removePanier(element.Nom)}
              />
            </Text>
            <Text style={styles.TextIngredients}>
              Description: {element.Description}
              {"\n"}
              {"\n"} Prix: {element.Prix} €
            </Text>
            <Text>{"\n"}</Text>
          </View>
        ))}
      </>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.containertitre}>
          <Text style={styles.titre}>Menu</Text>
        </View>
        {addingSandwich()}

        <View style={styles.container4}>
          <Button
            title="Personnaliser"
            buttonStyle={styles.buttonPers}
            onPress={() => navigation.navigate("Personnaliser")}
          />
          {adminButton(userConnected)}
          <Button
            title="Logout"
            type="outline"
            buttonStyle={styles.button}
            onPress={() => signOutCartEmpty()}
          />
           
        </View>
      </ScrollView>
      <View style={styles.container3}>
        <Text
          style={styles.textPanier}
          onPress={() => navigation.navigate("Panier")}
        >
          Panier ({countPanier})
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#444956",
    width: "100%",
  },
  container2: {
    flex: 1,
    backgroundColor: "#444956",
    alignItems: "flex-start",
  },
  container3: {
    backgroundColor: "#2E2B2B",
    alignItems: "center",
    justifyContent: "center",
  },

  container4: {
    flex:3,
    paddingVertical: "50%",
    //alignItems: "center",
    justifyContent: "center",
    //alignItems: "flex-start",
  },

  footer: {
    fontWeight: "bold",
    backgroundColor: "#2E2B2B",
    fontSize: 25,
    marginVertical: 15,
    color: "#fff",
  },

  titre: {
    fontWeight: "bold",
    fontSize: 40,
    marginTop: 15,
    marginBottom: 50,
    color: "#fff",
    alignItems: "center",
  },
  containertitre: {
    alignItems: "center",
  },

  button: {
    width: "60%",
    marginHorizontal: "20%",
    borderRadius: 25,
    height: "55%",
    backgroundColor: "#2E2B2B",
  },

  buttonPers: {
    width: "60%",
    marginHorizontal: "20%",
    borderRadius: 25,
    height: "55%",

    backgroundColor: "#2E2B2B",
  },

  TextIngredients: {
    backgroundColor: "#2E2B2B",
    marginLeft: 15,
    paddingLeft: 10,
    color: "#fff",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingBottom: 10,

    width: "92%",
  },
  nomSand: {
    color: "#fff",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    fontSize: 20,
    padding: 10,
    backgroundColor: "#2E2B2B",
    marginLeft: 15,
    marginTop: 5,
    width: "92%",
    paddingRight: 50,
  },
  textPanier: {
    color: "#fff",
    fontSize: 20,
    padding: 10,
    backgroundColor: "#444444",
    width: "100%",
  },
  addPrix: {
    color: "#2E2B2B",
  },
  addSand: {
    width: "60%",
    marginHorizontal: "20%",
    borderRadius: 25,
    height: "55%",

    backgroundColor: "#2E2B2B",
  },
  orders: {
    width: "60%",
    marginHorizontal: "20%",
    borderRadius: 25,
    height: "55%",
    backgroundColor: "#2E2B2B",
  },
  invisible: {
  color: "#2E2B2B",
  backgroundColor: "#2E2B2B",

}
});

export default Menu;

/*invisible: {
  color: "#2E2B2B",
  backgroundColor: "#2E2B2B",

}*/