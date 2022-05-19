import React, { useContext, useEffect, useState } from "react"
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    SafeAreaView,
    Pressable
  } from 'react-native';
  import { Button } from 'react-native-elements';
  import { getAuth, signOut } from 'firebase/auth';
  import { getDatabase, ref, onValue, set, get } from 'firebase/database';
  import axios from "axios";

  //import { useAuthentication } from '../utils/hooks/useAuthentication';
import { doc, documentId } from "firebase/firestore";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";

/*function User({sand}){
  useEffect(() => {
    const subscriber = firestore().collection('Sandiwch').doc(sand).get().then(documentSnapshot => {
      console.log('Sandwich existing: ', documentSnapshot.exists);
      if (documentSnapshot.exists) {
        console.log('User data: ', documentSnapshot.data());
    }
  })
}*/



export default function Menu() {
    const [shouldShow, setShouldShow] = useState(true);
    const [shouldShow2, setShouldShow2] = useState(true);
    //const { user } = useAuthentication();
    const auth = getAuth(); 



    const database = getDatabase();
    const reference = ref(database, "Sandwichs")
    onValue(reference, (snapshot) => {
      const a = snapshot.exists();
      const name = snapshot.child("Americain");
      console.log(name);

      const baseUrl = "https://reqres.in";


      /*axios({
        method: "get",
        url: '${baseUrl}/api/users/1',
      }).then((response) => {
        console.log(response.data);
      });*/
 
    
      
      

      });


  return (
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.container}>
          <View style={styles.containertitre}>
            <Text style={styles.titre}>Menu</Text>
          </View>
          <View style={styles.container2}>
            <Text style={styles.nomSand} onPress={() => setShouldShow(!shouldShow)}>
              
              Dagobert
              
            </Text>

            {shouldShow ? (
            <Text style={styles.TextIngredients}>
                subscriber
            </Text>
            ) : null}
            <Text style={styles.nomSand} onPress={() => setShouldShow2(!shouldShow2)}>
                Americain
            </Text>
            {shouldShow2 ? (
            <Text style={styles.TextIngredients}>
                Ingredients : 1/2 baguette blanche, fromage, jambon, mayonnaise, salade, tomate, maïs.
            </Text>
            ) : null}
            
            
          </View>
          <View style={styles.container4}>
            <Button title="Sign Out" buttonStyle={styles.button} onPress={() => signOut(auth)}  />
          </View>
        </ScrollView>
        <View style={styles.container3}>
            <Button style={styles.footer} title="Panier" />
          </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#444956",
        width: "100%"

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
      justifyContent: "center"
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
      alignItems: 'center'
    },
    containertitre: {
      alignItems: 'center',
    },

    button: {
      width: "80%",
    borderRadius: 25,
    height: 50,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "#2E2B2B",
    paddingHorizontal: 25
    },

    TextIngredients: {
        backgroundColor: "#2E2B2B",
        marginLeft: 15,
        padding: 10,
        color: "#fff",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius:15,
        marginBottom: 20,
        width: "92%"
      },
    nomSand:{
        color:"#fff",
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        fontSize: 20,
        padding: 10,
        backgroundColor: "#2E2B2B",
        marginLeft: 15,
        marginTop: 5,
        width: "92%"
    },
    add:{
      textAlign: "right",
      alignItems: "flex-end",
      flexDirection: "column"
    },

});