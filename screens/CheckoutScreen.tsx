import { StackScreenProps } from "@react-navigation/stack";
import { useStripe } from "@stripe/stripe-react-native";
import React, { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { deleteAllFromCart } from "../redux/cartReducer";
import { initCount } from "../redux/CountPanierReducer";
import { useDispatch } from "react-redux";
import { getDatabase, ref, remove, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import { doc, getDoc, increment, updateDoc } from "firebase/firestore";
import fireDB from "../config/firebase";

const CheckoutScreen: React.FC<StackScreenProps<any>> = ({
  route,
  navigation,
}) => {
  const [name, setName] = useState("");
  const stripe = useStripe();
  const dispatch = useDispatch();
  const auth = getAuth();
  const utilisateur = auth.currentUser;
  var utiConnect: string;

  if (route.params) {
    var test: any = route.params.paramKey;
  }
  var test2 = Math.floor(test);

  if (route.params) {
    var idCom = route.params.hoursMinutes;
  }

  const Payment = async () => {
    try {
      const response = await fetch("http://192.168.0.48:5000/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: test, name }),
      });

      const data = await response.json();
      if (!response.ok) {
        return Alert.alert(data.message);
      }
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: data.clientSecret,
        merchantDisplayName: "Lénaïc & ses sandwichs fantastique",
      });
      if (initSheet.error) {
        delCommande();

        console.error(initSheet.error);
        return Alert.alert(initSheet.error.message);
      }
      const presentSheet = await stripe.presentPaymentSheet();
      if (presentSheet.error) {
        delCommande();

        console.error(presentSheet.error);
        return Alert.alert(presentSheet.error.message);
      }
      Alert.alert("Payement réussi! Merci pour votre commande.");
    } catch (err) {
      delCommande();
      console.error(err);
      Alert.alert("Payement échoué");
    }
  };

  async function delCommande() {
    const db = getDatabase();
    remove(ref(db, "orders/" + idCom));
    if (utilisateur) {
      utiConnect = utilisateur.uid;

      const docRef = doc(fireDB, "Utilisateurs", utiConnect);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await updateDoc(docRef, {
          Compteur: increment(-1),
        });
      }
    }
  }
  function back() {
    dispatch(deleteAllFromCart());
    dispatch(initCount());
    navigation.navigate("Menu");
  }

  async function combine() {
    Payment();
    back();
  }
  return (
    <View>
      <Text style={styles.littleTexte}>
        Le prix à regler est de {test}€. Pour l'ouverture de notre boutique,
        nous arrondisons nos prix à l'unité inférieur, cela vous fera donc{" "}
        {test2}€{" "}
      </Text>
      <TextInput
        placeholder="Nom"
        style={styles.name}
        value={name}
        onChangeText={(e) => setName(e)}
      />

      <Button buttonStyle={styles.payButton} title="Payer" onPress={combine} />
    </View>
  );
};

const styles = StyleSheet.create({
  littleTexte: {
    fontSize: 25,
    marginTop: 15,
    marginBottom: 50,
    color: "#f47069",
    alignItems: "center",
    marginLeft: 15,
  },
  name: {
    padding: 10,
    borderColor: "black",
    borderWidth: 1,
    margin: 15,
  },
  payButton: {
    padding: 10,
    borderColor: "black",
    borderWidth: 1,
    margin: 15,
    borderRadius: 25,
    backgroundColor: "#3a8f61",
  },
});

export default CheckoutScreen;
function decrement(arg0: number): any {
  throw new Error("Function not implemented.");
}
