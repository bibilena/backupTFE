import { StackScreenProps } from "@react-navigation/stack";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getCart } from "../redux/store";
import { Button } from "react-native-elements";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import  rootReducer from "../redux/rootReducer"
import { deleteAllFromCart } from "../redux/cartReducer";
import { initCount } from "../redux/CountPanierReducer";

const Panier: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const dispatch = useDispatch();
  const allCart = useSelector(getCart);
  const auth = getAuth();
  var hours = new Date().getHours()
  var minutes = new Date().getMinutes()
  var sec = new Date().getSeconds()
  var mili = new Date().getMilliseconds()
  const testing =  JSON.stringify(allCart[0])

  var hoursMinutes = ((2+hours)*10000000+minutes*100000+sec*1000+mili)*-1

  var total: number = 0

  function retourner() {

    if(testing === "[]" || testing === undefined){
      allCart.splice(0,1)
      return(
        <Text style={styles.vide}>Le panier est vide
      </Text>
      )
    }
      
    else if(allCart != []){
    return (
      
      <>
        {allCart.map((element: any) => (
          <>
            <Text style={styles.nomSand}>
              {element.nomSand} {element.prixSand}€
              <Text style={styles.invisible}>{total = total + parseFloat(element.prixSand)}</Text>
            </Text>
            <Text>{"\n"}</Text>
          </>
        ))}
      </>
    );
  }
    else{
      return(
        
        <Text style={styles.vide}>Le panier est vide
      </Text>
      
      )
    }
  }
  function back(){
    navigation.navigate("Menu")
  }

  function sendOrder() {
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
        dispatch(initCount())
        back()
      }
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
          <Button
            title="  Commander  "
            buttonStyle={styles.buttonPers}
            onPress={() => sendOrder()}
          />
        </View>
      </ScrollView>
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
  nomSand: {
    color: "#fff",
    borderRadius: 15,
    fontSize: 20,
    padding: 10,
    backgroundColor: "#2E2B2B",
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
    backgroundColor: "#2E2B2B",
    paddingHorizontal: 40,
  },
  invisible: {
    color: "#2E2B2B"
  },
  prixTotal: {
    color: "#fff",
    fontSize: 25,
    width: "125%",
    alignSelf: 'center',
    marginLeft: 45,
    paddingTop: 15
  },
  vide: {
    color: "#fff",
    fontSize: 30,
    alignSelf: "center"
  }
});

export default Panier;
