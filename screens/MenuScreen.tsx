import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Alert,
  RefreshControl
} from "react-native";
import { Button } from "react-native-elements";
import { getAuth, signOut } from "firebase/auth";
import { StackScreenProps } from "@react-navigation/stack";

import {
  collection,
  addDoc,
  getDocs,
  DocumentData,
  SnapshotOptions,
  SnapshotMetadata,
} from "firebase/firestore";
import fireDB from "../config/firebase";

import store from "../redux/store";
import { useDispatch } from "react-redux";
import { addCart, deleteFromCart, deleteAllFromCart } from "../redux/cartReducer";

async function addData() {
  try {
    await addDoc(collection(fireDB, "Sandwichs"), {
      Nom: "Raclette",
      Prix: 3.5,
      Description: "Jambon serrano, formage à raclette, pommes de terre ",
    });
  } catch (error) {
    Alert.alert("erreur", "une erreur a été rencontrée");
  }
}

const Menu: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [panier, setPanier] = useState(0);
  const [dago, setDago] = useState(0);
  const [americain, setAmericain] = useState(0);
  const [dejeuner, setDejeuner] = useState(0);
  const [raclette, setRaclette] = useState(0);

  const auth = getAuth();
  const [sand, setSand]: any = useState([]);

  const cartItems = store.getState();
  const dispatch = useDispatch();


  /*function signOutCartEmpty(){
    dispatch(deleteAllFromCart())
    signOut(auth)
  }*/
  function addPanier(nom: string, prix: number) {
    dispatch(addCart(nom, prix));
    setPanier(panier + 1);
  }
  function removePanier(nom: string) {
    dispatch(deleteFromCart(nom));
    if (panier > 0) setPanier(panier - 1);
  }

  useEffect(() => {
    getData();
  }, []);

  const userConnected = auth.currentUser;

  function adminButton(user: any) {
    if (user.uid === "Geq4ULiVB7cwdteWJXquaPpLAog1") {
      return (
        <Button
          title="Ajouter Sandwich"
          buttonStyle={styles.addSand}
          onPress={() => navigation.navigate("Ajout")}
        />
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

  function addingSandwich() {
    return (
      <>
        {sand.map((element: any) => (
          <View style={styles.container2}>
            <Text style={styles.nomSand}>
              {element.Nom}
              <Button
                title="Add"
                onPress={() => addPanier(element.Nom, element.Prix)}
              />
              <Button
                title="Remove"
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
            onPress={() => signOut(auth)}
          />
        </View>
      </ScrollView>
      <View style={styles.container3}>
        <Text
          style={styles.textPanier}
          onPress={() => navigation.navigate("Panier")}
        >
          Panier ({panier})
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
    paddingHorizontal: 120,
    alignItems: "center",
    justifyContent: "center",
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
    width: "80%",
    borderRadius: 25,
    height: 50,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "#2E2B2B",
    paddingHorizontal: 32,
  },

  buttonPers: {
    width: "125%",
    borderRadius: 25,
    height: 50,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "#2E2B2B",
    paddingHorizontal: 40,
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
    width: "150%",
    borderRadius: 25,
    height: 50,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "#2E2B2B",
    paddingHorizontal: 50,
  },
});

export default Menu;
