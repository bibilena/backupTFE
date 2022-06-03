import { StackScreenProps } from "@react-navigation/stack";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { getCart } from "../redux/store";
import { Button } from "react-native-elements";

const Panier: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const allCart = useSelector(getCart);
  console.log("all cart ", allCart);

  function retourner() {
    return (
      <>
        {allCart.map((element: any) => (
          <>
            <Text style={styles.nomSand}>
              {element.nomSand.props.children} {element.prixSand.props.children}
            </Text>
            <Text>{"\n"}</Text>
          </>
        ))}
      </>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.containertitre}>
          <Text style={styles.titre}>Panier</Text>
        </View>
        <View>{retourner()}</View>
        <View style={styles.container4}>
          <Button
            title="  Commander  "
            buttonStyle={styles.buttonPers}
            onPress={() => navigation.navigate("Personnaliser")}
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
});

export default Panier;
