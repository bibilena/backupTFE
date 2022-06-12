import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  LogBox,
} from "react-native";
import { Button } from "react-native-elements";
import { RadioButton, Checkbox } from "react-native-paper";
import { StackScreenProps } from "@react-navigation/stack";

LogBox.ignoreAllLogs();

function blancGris(a: String) {
  var b;
  if (a === "blanc") {
    b = 2.5;
    return b;
  } else {
    b = 3;
    return b;
  }
}

function beurreMayo(a: String) {
  var b;
  if (a === "beurre" || a === "mayonnaise") {
    b = 0.5;
    return b;
  } else {
    b = 0;
    return b;
  }
}

function proteine(
  a: boolean,
  b: boolean,
  c: boolean,
  d: boolean,
  e: boolean,
  f: boolean,
  i: boolean,
  j: boolean,
  k: boolean,
  l: boolean,
  m: boolean
) {
  var n = 0;
  if (a == true) {
    n += 0.5;
  }
  if (b == true) {
    n += 1.5;
  }
  if (c == true) {
    n += 1;
  }
  if (d == true) {
    n += 2;
  }
  if (e == true) {
    n += 1.6;
  }
  if (f == true) {
    n += 0.6;
  }
  if (i == true) {
    n += 0.5;
  }
  if (j == true) {
    n += 0.5;
  }
  if (k == true) {
    n += 0.4;
  }
  if (l == true) {
    n += 2;
  }
  if (m == true) {
    n += 1.5;
  }
  return n;
}

function crudites(a: boolean, b: boolean, c: boolean, d: boolean, e: boolean) {
  var f = 0;
  if (a == true) {
    f += 0.1;
  }
  if (b == true) {
    f += 0.2;
  }
  if (c == true) {
    f += 0.1;
  }
  if (d == true) {
    f += 0.3;
  }
  if (e == true) {
    f += 0.2;
  }
  return f;
}
export let prixFinal = 0;

const PersonnaliserScreen: React.FC<StackScreenProps<any>> = ({
  navigation,
}) => {
  const [pain, setPain] = React.useState("blanc");
  const [beurre, setBeurre] = React.useState("beurre");
  const [prot, setProt] = React.useState(false);
  const [prot2, setProt2] = React.useState(false);
  const [prot3, setProt3] = React.useState(false);
  const [prot4, setProt4] = React.useState(false);
  const [prot5, setProt5] = React.useState(false);
  const [prot6, setProt6] = React.useState(false);
  const [prot7, setProt7] = React.useState(false);
  const [prot8, setProt8] = React.useState(false);
  const [prot9, setProt9] = React.useState(false);
  const [prot10, setProt10] = React.useState(false);
  const [prot11, setProt11] = React.useState(false);
  const [crud, setCrud] = React.useState(false);
  const [crud2, setCrud2] = React.useState(false);
  const [crud3, setCrud3] = React.useState(false);
  const [crud4, setCrud4] = React.useState(false);
  const [crud5, setCrud5] = React.useState(false);
  const [crud6, setCrud6] = React.useState(false);
  const [crud7, setCrud7] = React.useState(false);
  const [crud8, setCrud8] = React.useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.containertitre}>
          <Text style={styles.titre}>Sandwich personnalisé</Text>
        </View>
        <View style={styles.containerCheckDiff}>
          <View style={styles.containerCheck}>
            <RadioButton
              uncheckedColor="white"
              value="blanc"
              status={pain === "blanc" ? "checked" : "unchecked"}
              onPress={() => setPain("blanc")}
            ></RadioButton>
            <Text style={styles.containerText}>Pain blanc (2.5€)</Text>
          </View>
          <View style={styles.containerCheck}>
            <RadioButton
              uncheckedColor="white"
              value="gris"
              status={pain === "gris" ? "checked" : "unchecked"}
              onPress={() => setPain("gris")}
            ></RadioButton>
            <Text style={styles.containerText}>Pain gris (3€)</Text>
          </View>
        </View>

        <View style={styles.containerCheckDiff}>
          <View style={styles.containerCheck}>
            <RadioButton
              uncheckedColor="white"
              value="beurre"
              status={beurre === "beurre" ? "checked" : "unchecked"}
              onPress={() => setBeurre("beurre")}
            ></RadioButton>
            <Text style={styles.containerText}>Beurre (0.5€)</Text>
          </View>
          <View style={styles.containerCheck}>
            <RadioButton
              uncheckedColor="white"
              value="mayonnaise"
              status={beurre === "mayonnaise" ? "checked" : "unchecked"}
              onPress={() => setBeurre("mayonnaise")}
            ></RadioButton>
            <Text style={styles.containerText}>Mayonnaise (0.5€)</Text>
          </View>
          <View style={styles.containerCheck}>
            <RadioButton
              uncheckedColor="white"
              value="sans"
              status={beurre === "sans" ? "checked" : "unchecked"}
              onPress={() => setBeurre("sans")}
            ></RadioButton>
            <Text style={styles.containerText}>Sans</Text>
          </View>
        </View>

        <View style={styles.containerCheckDiff}>
          <View style={styles.containerCheck}>
            <Checkbox
              uncheckedColor="white"
              status={prot ? "checked" : "unchecked"}
              onPress={() => {
                setProt(!prot);
              }}
            ></Checkbox>
            <Text style={styles.containerText}>Jambon (0.5€)</Text>
          </View>
          <View style={styles.containerCheck}>
            <Checkbox
              uncheckedColor="white"
              status={prot2 ? "checked" : "unchecked"}
              onPress={() => {
                setProt2(!prot2);
              }}
            ></Checkbox>
            <Text style={styles.containerText}>Poulet grillé (1.5€)</Text>
          </View>
          <View style={styles.containerCheck}>
            <Checkbox
              uncheckedColor="white"
              status={prot3 ? "checked" : "unchecked"}
              onPress={() => {
                setProt3(!prot3);
              }}
            ></Checkbox>
            <Text style={styles.containerText}>Américain (1€)</Text>
          </View>
          <View style={styles.containerCheck}>
            <Checkbox
              uncheckedColor="white"
              status={prot4 ? "checked" : "unchecked"}
              onPress={() => {
                setProt4(!prot4);
              }}
            ></Checkbox>
            <Text style={styles.containerText}>Chèvre (2€)</Text>
          </View>
          <View style={styles.containerCheck}>
            <Checkbox
              uncheckedColor="white"
              status={prot5 ? "checked" : "unchecked"}
              onPress={() => {
                setProt5(!prot5);
              }}
            ></Checkbox>
            <Text style={styles.containerText}>Jambon de parme (1.6€)</Text>
          </View>
          <View style={styles.containerCheck}>
            <Checkbox
              uncheckedColor="white"
              status={prot6 ? "checked" : "unchecked"}
              onPress={() => {
                setProt6(!prot6);
              }}
            ></Checkbox>
            <Text style={styles.containerText}>Mozza (0.6€)</Text>
          </View>
          <View style={styles.containerCheck}>
            <Checkbox
              uncheckedColor="white"
              status={prot7 ? "checked" : "unchecked"}
              onPress={() => {
                setProt7(!prot7);
              }}
            ></Checkbox>
            <Text style={styles.containerText}>Thon (0.5€)</Text>
          </View>
          <View style={styles.containerCheck}>
            <Checkbox
              uncheckedColor="white"
              status={prot8 ? "checked" : "unchecked"}
              onPress={() => {
                setProt8(!prot8);
              }}
            ></Checkbox>
            <Text style={styles.containerText}>Boulette (0.5€)</Text>
          </View>
          <View style={styles.containerCheck}>
            <Checkbox
              uncheckedColor="white"
              status={prot9 ? "checked" : "unchecked"}
              onPress={() => {
                setProt9(!prot9);
              }}
            ></Checkbox>
            <Text style={styles.containerText}>Cheddar (0.4€)</Text>
          </View>
          <View style={styles.containerCheck}>
            <Checkbox
              uncheckedColor="white"
              status={prot10 ? "checked" : "unchecked"}
              onPress={() => {
                setProt10(!prot10);
              }}
            ></Checkbox>
            <Text style={styles.containerText}>Saumon (2€)</Text>
          </View>
          <View style={styles.containerCheck}>
            <Checkbox
              uncheckedColor="white"
              status={prot11 ? "checked" : "unchecked"}
              onPress={() => {
                setProt11(!prot11);
              }}
            ></Checkbox>
            <Text style={styles.containerText}>Carpacio de boeuf (1.5€)</Text>
          </View>
        </View>

        <View style={styles.containerCheckDiff}>
          <View style={styles.containerCheck}>
            <Checkbox
              uncheckedColor="white"
              status={crud ? "checked" : "unchecked"}
              onPress={() => {
                setCrud(!crud);
              }}
            ></Checkbox>
            <Text style={styles.containerText}>Roquette (0.10€)</Text>
          </View>
          <View style={styles.containerCheck}>
            <Checkbox
              uncheckedColor="white"
              status={crud2 ? "checked" : "unchecked"}
              onPress={() => {
                setCrud2(!crud2);
              }}
            ></Checkbox>
            <Text style={styles.containerText}>Tomates séchées (0.2€)</Text>
          </View>
          <View style={styles.containerCheck}>
            <Checkbox
              uncheckedColor="white"
              status={crud3 ? "checked" : "unchecked"}
              onPress={() => {
                setCrud3(!crud3);
              }}
            ></Checkbox>
            <Text style={styles.containerText}>Salade (gratuit)</Text>
          </View>
          <View style={styles.containerCheck}>
            <Checkbox
              uncheckedColor="white"
              status={crud4 ? "checked" : "unchecked"}
              onPress={() => {
                setCrud4(!crud4);
              }}
            ></Checkbox>
            <Text style={styles.containerText}>Tomates fraiches (gratuit)</Text>
          </View>
          <View style={styles.containerCheck}>
            <Checkbox
              uncheckedColor="white"
              status={crud5 ? "checked" : "unchecked"}
              onPress={() => {
                setCrud5(!crud5);
              }}
            ></Checkbox>
            <Text style={styles.containerText}>Oignons (0.10€)</Text>
          </View>
          <View style={styles.containerCheck}>
            <Checkbox
              uncheckedColor="white"
              status={crud6 ? "checked" : "unchecked"}
              onPress={() => {
                setCrud6(!crud6);
              }}
            ></Checkbox>
            <Text style={styles.containerText}>Carotte rapées (gratuit)</Text>
          </View>
          <View style={styles.containerCheck}>
            <Checkbox
              uncheckedColor="white"
              status={crud7 ? "checked" : "unchecked"}
              onPress={() => {
                setCrud7(!crud7);
              }}
            ></Checkbox>
            <Text style={styles.containerText}>Aubergines (0.3€)</Text>
          </View>
          <View style={styles.containerCheck}>
            <Checkbox
              uncheckedColor="white"
              status={crud8 ? "checked" : "unchecked"}
              onPress={() => {
                setCrud8(!crud8);
              }}
            ></Checkbox>
            <Text style={styles.containerText}>Olives (0.2€)</Text>
          </View>
        </View>

        <View style={styles.containerPrix}>
          <Text style={styles.textPrix}>
            Le prix du sandwich est de{" "}
            {
              (prixFinal =
                blancGris(pain) +
                beurreMayo(beurre) +
                proteine(
                  prot,
                  prot2,
                  prot3,
                  prot4,
                  prot5,
                  prot6,
                  prot7,
                  prot8,
                  prot9,
                  prot10,
                  prot11
                ) +
                crudites(crud, crud2, crud5, crud7, crud8))
            }{" "}
            euros
          </Text>
        </View>

        <View style={styles.containerButton}>
          <Button
            title="valider"
            buttonStyle={styles.buttonPers}
            onPress={() => navigation.navigate("Menu")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonnaliserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
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

  containerCheck: {
    flexDirection: "row",
    alignItems: "center",
  },

  containerCheckDiff: {
    backgroundColor: "#3a8f61",
    marginLeft: 15,
    padding: 10,
    color: "#fff",
    borderRadius: 15,
    marginBottom: 20,
    width: "92%",
  },

  containerText: {
    alignItems: "center",
    color: "#fff",
  },

  containerPrix: {
    alignItems: "center",
  },

  textPrix: {
    color: "#f47069",
    fontSize: 20,
  },

  buttonPers: {
    width: "50%",
    borderRadius: 25,
    height: 50,
    marginTop: 20,
    marginBottom: 50,
    backgroundColor: "#3a8f61",
    paddingHorizontal: "18%",
    alignItems: "center",
  },

  containerButton: {
    alignItems: "center",
  },
});
