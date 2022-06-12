import { StackScreenProps } from "@react-navigation/stack";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
  LogBox,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getCart } from "../redux/store";
import { Button } from "react-native-elements";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import rootReducer from "../redux/rootReducer";
import { deleteAllFromCart } from "../redux/cartReducer";
import { initCount } from "../redux/CountPanierReducer";
import Toast from "react-native-root-toast";
import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  getDocs,
  collection,
  updateDoc,
  FieldValue,
  increment,
} from "firebase/firestore";
import fireDB from "../config/firebase";
import { useEffect, useState } from "react";

LogBox.ignoreAllLogs();

const Panier: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const dispatch = useDispatch();
  const allCart = useSelector(getCart);
  const auth = getAuth();
  var hours = new Date().getHours();
  var minutes = new Date().getMinutes();
  var sec = new Date().getSeconds();
  var mili = new Date().getMilliseconds();
  const testEmpty = JSON.stringify(allCart[0]);
  const [fid, setFid]: any = useState([]);

  const utilisateur = auth.currentUser;
  var utiConnect: string;

  if (utilisateur) {
    utiConnect = utilisateur.uid;
    const docRef = doc(fireDB, "Utilisateurs", utiConnect);

    useEffect(() => {
      const getFid = async () => {
        const snap = await getDoc(docRef);
        setFid({ utiConnect, ...snap.data() });
      };
      getFid();
    }, []);
  }

  async function reiniFid() {
    if (fid.Compteur == 10) {
      if (utilisateur) {
        utiConnect = utilisateur.uid;

        const docRef = doc(fireDB, "Utilisateurs", utiConnect);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          await updateDoc(docRef, {
            Compteur: 0,
          });
        }
      }
    }
  }

  function reduc() {
    if (fid.Compteur == 10) {
      return (
        <>
          <Text style={styles.prixTotal}> réduction de 1€ appliquée</Text>
          <Text style={styles.prixTotal}>
            Prix Total: {(total = total - 1)}€
          </Text>
        </>
      );
    }
  }

  var hoursMinutes =
    ((2 + hours) * 10000000 + minutes * 100000 + sec * 1000 + mili) * -1;

  var total: number = 0;
  var cancelFid: number;

  function retourner() {
    if (testEmpty === "[]" || testEmpty === undefined) {
      cancelFid = 1;
      allCart.splice(0, 1);
      return <Text style={styles.vide}>Le panier est vide</Text>;
    } else if (allCart != []) {
      return (
        <>
          {allCart.map((element: any) => (
            <View key={Math.random()}>
              <Text style={styles.nomSand}>
                {element.nomSand} {element.prixSand}€
                <Text style={styles.invisible}>
                  {(total = total + parseFloat(element.prixSand))}
                </Text>
              </Text>
              <Text>{"\n"}</Text>
            </View>
          ))}
        </>
      );
    } else {
      return <Text style={styles.vide}>Le panier est vide</Text>;
    }
  }
  function back() {
    carteFid();
    reiniFid();
    navigation.navigate("Menu");
  }

  async function carteFid() {
    if (utilisateur) {
      utiConnect = utilisateur.uid;

      const docRef = doc(fireDB, "Utilisateurs", utiConnect);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await updateDoc(docRef, {
          Compteur: increment(0.5),
        });
      } else {
        await setDoc(docRef, {
          Compteur: 1,
        });
      }
    }
  }
  async function carteFid2() {
    if (utilisateur) {
      utiConnect = utilisateur.uid;

      const docRef = doc(fireDB, "Utilisateurs", utiConnect);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await updateDoc(docRef, {
          Compteur: increment(1),
        });
      } else {
        await setDoc(docRef, {
          Compteur: 1,
        });
      }
    }
  }
  function compteurExiste() {
    if (fid.Compteur == null || fid.Compteur == undefined) {
      fid.Compteur = 0;
      return fid.Compteur;
    } else return fid.Compteur;
  }

  function sendOrder() {
    if (cancelFid != 1) {
      carteFid();
      dispatch(deleteAllFromCart());
      const user = auth.currentUser;
      if (user) {
        if (allCart != []) {
          const db = getDatabase();
          {
            allCart.map((element: any) =>
              set(ref(db, "orders/" + hoursMinutes), {
                allCart,
              })
            );
          }
          dispatch(initCount());
          let toastAdd = Toast.show("Commande passée", {
            duration: Toast.durations.SHORT,
          });
          back();
        }
      }
    } else {
      Alert.alert("Il n'y a rien dans votre panier");
    }
  }

  function payementOnline() {
    carteFid2();
    if (cancelFid != 1) {
      const user = auth.currentUser;
      if (user) {
        if (allCart != []) {
          const db = getDatabase();
          {
            allCart.map((element: any) =>
              set(ref(db, "orders/" + hoursMinutes), {
                allCart,
              })
            );
          }
        }
      }
      navigation.navigate("Checkout", { paramKey: total, hoursMinutes });
    } else {
      Alert.alert("Il n'y a rien dans votre panier");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.containertitre}>
          <Text style={styles.titre}>Panier</Text>
        </View>
        <View>{retourner()}</View>
        <View style={styles.container4}>
          <Text style={styles.prixTotal}>Prix Total: {total}€</Text>
          <Text style={styles.prixTotal}>
            {" "}
            vous avez {compteurExiste()} point(s) de fidelité
          </Text>
          {reduc()}
          <Button
            title="  Commander  "
            buttonStyle={styles.buttonPers}
            onPress={() => sendOrder()}
          />
          <Button
            title="  Payer en ligne  "
            buttonStyle={styles.buttonPers}
            onPress={() => payementOnline()}
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
  container2: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
  },
  container3: {
    backgroundColor: "#fff",
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
    color: "#f47069",
    alignItems: "center",
  },
  containertitre: {
    alignItems: "center",
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
  invisible: {
    color: "#3a8f61",
  },
  prixTotal: {
    color: "#f47069",
    fontSize: 25,
    width: "125%",
    alignSelf: "center",
    paddingTop: 15,
  },
  vide: {
    color: "#f47069",
    fontSize: 30,
    alignSelf: "center",
  },
});

export default Panier;
