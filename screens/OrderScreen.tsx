import { StackScreenProps } from "@react-navigation/stack";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Alert,
  RefreshControl,
  LogBox
} from "react-native";
import { getDatabase, ref, onValue, update, remove } from "firebase/database";

import { Button } from "react-native-elements";
import React from "react";

LogBox.ignoreAllLogs()

const OrdersScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const db = getDatabase();
  const reference = ref(db, "orders");

  const wait = (timeout: number | undefined) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const table: any[] = [];

  function reload() {
    remove(ref(db, "/orders/" + whatID));
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }

  var total: number = 0
  var whatID: string | null;
  function test() {
    onValue(reference, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val().allCart;
        const idData = childSnapshot.key;
        whatID = idData;

        table.push(childData);
      });
    });
    

    return (
      <View>
        {table.map((element) => (
          <View style={styles.nomSand}>
            {element.map((element2: any) => {
              return (
                <View key={Math.random()}>
                  <Text style={styles.ecriture}>
                    {element2.nomSand}: {element2.prixSand}€
                    <Text style={styles.invisible}>l{total = total + element2.prixSand}</Text>
                  </Text>
                </View>
              );
            })}
            
            <Text style={styles.ecriture}>{"\n"}Total de la commande: {total}€</Text>
            <Text style={styles.invisible}> {total = 0}</Text>
            
          </View>
        ))}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text>{test()}</Text>
        </View>
        <View>
          <Button
            buttonStyle={styles.valider}
            title="Valider dernière commande"
            onPress={() => reload()}
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
  nomSand: {
    borderRadius: 15,
    padding: 10,
    backgroundColor: "#3a8f61",
    marginLeft: 15,
    marginTop: 5,
    paddingRight: 50,
  },
  ecriture: {
    color: "#fff",
    fontSize: 20,
  },
  valider: {
    marginHorizontal: 30,
    marginVertical: 15,
    backgroundColor: "#f47069"
  },
  invisible: {
      color: "#3a8f61"
  },
});
export default OrdersScreen;
