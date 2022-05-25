import React, { useState } from "react"
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    SafeAreaView,
    
  } from 'react-native';
  import { Button } from 'react-native-elements';
  import { getAuth, signOut } from 'firebase/auth';
import { count } from "../utils/hooks/counter";
import { StackScreenProps } from '@react-navigation/stack';



  



const Menu: React.FC<StackScreenProps<any>> = ({ navigation }) =>  {
    const [shouldShow, setShouldShow] = useState(true);
    const [shouldShow2, setShouldShow2] = useState(true);
    //const { user } = useAuthentication();
    const auth = getAuth(); 
    const name = ["Dagobert", "Americain"]

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.container}>
          <View style={styles.containertitre}>
            <Text style={styles.titre}>Menu</Text>
          </View>
          <View style={styles.container2}>
            <Text style={styles.nomSand} onPress={() => setShouldShow(!shouldShow)}>
              
              {name[0]} 
              
            </Text>

            {count}

            {shouldShow ? (
            <Text style={styles.TextIngredients}>
                subscriberd
            </Text>
            ) : null}
            <Text style={styles.nomSand} onPress={() => setShouldShow2(!shouldShow2)}>
                {name[1]}

            </Text>
            {shouldShow2 ? (
            <Text style={styles.TextIngredients}>
                Ingredients : 1/2 baguette blanche, fromage, jambon, mayonnaise, salade, tomate, maïs.
            </Text>
            ) : null}
            
            
          </View>
          <View style={styles.container4}>
            <Button title="Personnaliser" buttonStyle={styles.buttonPers} onPress={() => navigation.navigate('Personnaliser')} />
            <Button title="Logout" type="outline" buttonStyle={styles.button} onPress={() => signOut(auth)}  />
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
    paddingHorizontal: 32
    },

    buttonPers: {
      width: "125%",
    borderRadius: 25,
    height: 50,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "#2E2B2B",
    paddingHorizontal: 40
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

export default Menu;