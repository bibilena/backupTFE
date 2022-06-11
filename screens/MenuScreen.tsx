import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Alert,
  RefreshControl,
  Platform,
  LogBox
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
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import fireDB from "../config/firebase";

import store, { getCountPanier } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  addCart,
  deleteFromCart,
  deleteAllFromCart,
} from "../redux/cartReducer";
import { countPlus, countMoins } from "../redux/CountPanierReducer";
import Toast from "react-native-root-toast";

//LogBox.ignoreAllLogs()

const Menu: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [panier, setPanier] = useState(0);
  const auth = getAuth();
  const [sand, setSand]: any = useState([]);
  const dispatch = useDispatch();
  const countPanier = useSelector(getCountPanier);

  const wait = (timeout: number | undefined) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };


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
    dispatch(countMoins());
  }

  useEffect(() => {
    getData();
  }, []);

  const userConnected = auth.currentUser;

  function adminButton(user: any) {
    if (
      user.uid === "Geq4ULiVB7cwdteWJXquaPpLAog1" ||
      user.uid === "I6EADh845jeaMV2Ufmke3T2LtiP2"
    ) {
      return (
        <>
          <Button
            title="Modifier menu"
            buttonStyle={styles.addSand}
            onPress={() => navigation.navigate("Changement")}
          />
          <Button
            title={"Commande en cours "}
            buttonStyle={styles.orders}
            onPress={() => navigation.navigate("Commandes en cours")}
          />
        </>
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

  function dispo(test: any) {
    if (test.available == true) {
      return (
        <><Text>   </Text>
          <Button
            title="Ajouter"
            onPress={() => addPanier(test.Nom, test.Prix)}
            buttonStyle={styles.addSupp}
          />
          <Text> </Text>
          <Button
            buttonStyle={styles.addSupp}
            title="Supprimer"
            onPress={() => removePanier(test.Nom)}
          />
        </>
      );
    } else {
      return (
        <>
          <Text style={styles.addSupp}>Epuisement du stock</Text>
        </>
      );
    }
  }

  async function toastPlusAvail(test: any, nom: any) {
    if (test.available == true) {
      await updateDoc(doc(fireDB, "Sandwichs", nom), {
        available: false,
      });
      let toastAdd = Toast.show("Sandwich maintenant indisponible", {
        duration: Toast.durations.SHORT,
      });
    } else if (test.available == false) {
      await updateDoc(doc(fireDB, "Sandwichs", nom), {
        available: true,
      });
      let toastAdd = Toast.show("Sandwich maintenant disponible", {
        duration: Toast.durations.SHORT,
      });
    }
    
    console.log(test.available);
    
     
  }

  function butAdmin(user: any, text: any) {
    if (
      user.uid === "Geq4ULiVB7cwdteWJXquaPpLAog1" ||
      user.uid === "I6EADh845jeaMV2Ufmke3T2LtiP2"
    ) {
      return (
        <Text
          style={styles.nomSand}
          onPress={() => toastPlusAvail(text, text.Nom)}
        >
          {text.Nom}
          <Text> </Text>
          {dispo(text)}
        </Text>
      );
    } else {
      return (
        <Text style={styles.nomSand}>
          {text.Nom}
          <Text> </Text>
          {dispo(text)}
        </Text>
      );
    }
  }

  function chaleur(chaudfroid: any){
    if (chaudfroid.chal === "f"){
      return(
        <View style={styles.container2}>
            {butAdmin(userConnected, chaudfroid)}
            <Text style={styles.TextIngredients}>
              Description : {chaudfroid.Description}
              {"\n"}
              {"\n"} Prix : {chaudfroid.Prix} €
            </Text>
            <Text>{"\n"}</Text>
          </View>
      )
    }
  }

  function froid(chaudfroid: any){
    if (chaudfroid.chal === "c"){
      return(
        <View style={styles.container2}>
            {butAdmin(userConnected, chaudfroid)}
            <Text style={styles.TextIngredients}>
              Description : {chaudfroid.Description}
              {"\n"}
              {"\n"} Prix : {chaudfroid.Prix} €
            </Text>
            <Text>{"\n"}</Text>
          </View>
      )
    }
  }

  function addingSandwich() {
    return (
      <>
      <Text style={styles.sandFroidChaud}>Sandwichs froids</Text>
      <View key={Math.random()}>
        {sand.map((element: any) => (
          chaleur(element)
        ))}
      </View>
      <Text style={styles.sandFroidChaud}>Sandwichs chauds</Text>
      <View key={Math.random()}>
      {sand.map((element: any) => (
        froid(element)
      ))}
    </View></>
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
    backgroundColor: "#fff",
    width: "100%",
  },
  container2: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
  },
  container3: {
    backgroundColor: "#3a8f61",
    alignItems: "center",
    justifyContent: "center",
  },

  container4: {
    flex: 3,
    paddingVertical: "50%",
    //alignItems: "center",
    justifyContent: "center",
    //alignItems: "flex-start",
  },

  footer: {
    fontWeight: "bold",
    backgroundColor: "#3a8f61",
    fontSize: 25,
    marginVertical: 15,
    color: "#f47069",
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

  button: {
    width: "60%",
    marginHorizontal: "20%",
    borderRadius: 25,
    height: "80%",
    backgroundColor: "#f47069",
  },

  buttonPers: {
    width: "60%",
    marginHorizontal: "20%",
    borderRadius: 25,
    height: "80%",
    marginTop: "0%",
    marginBottom: "0%",
    backgroundColor: "#3a8f61",
  },

  TextIngredients: {
    backgroundColor: "#3a8f61",
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
    backgroundColor: "#3a8f61",
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
    borderRadius: 20,
    height: "80%",
    marginTop: "0%",
    marginBottom: "0%",
    backgroundColor: "#3a8f61",
    paddingHorizontal: 0,
  },
  orders: {
    width: "60%",
    marginHorizontal: "20%",
    borderRadius: 25,
    height: "80%",
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: "#3a8f61",
    paddingHorizontal: 0,
  },
  addSupp: {
    backgroundColor: "#f47069",
  },
  sandFroidChaud: {
    fontSize: 30,
    marginTop: 15,
    marginBottom: 50,
    color: "#f47069",
    alignItems: "center",
    marginLeft: 15
  }
});

export default Menu;
