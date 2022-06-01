import React, { useEffect, useState } from "react"
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    SafeAreaView,
    Alert
  } from 'react-native';
  import { Button } from 'react-native-elements';
  import { getAuth, signOut } from 'firebase/auth';
import { count } from "../utils/hooks/counter";
import { StackScreenProps } from '@react-navigation/stack';

import { collection, addDoc, getDocs, DocumentData, SnapshotOptions, SnapshotMetadata } from "firebase/firestore"; 
import fireDB from "../config/firebase";

async function addData(){
  try{
    await addDoc(collection(fireDB, "Sandwichs"), {Nom: "Raclette", Prix: 3.5, Description: "Jambon serrano, formage à raclette, pommes de terre "})
  }
  catch(error){
    Alert.alert("erreur", "une erreur a été rencontrée")
  }
}








const Menu: React.FC<StackScreenProps<any>> = ({ navigation }) =>  {
    const [shouldShow, setShouldShow] = useState(true);
    const [shouldShow2, setShouldShow2] = useState(true);
    const [shouldShow3, setShouldShow3] = useState(true);
    const [shouldShow4, setShouldShow4] = useState(true);


    const auth = getAuth(); 
    const [sand, setSand]: any = useState([])

    useEffect(() => {
      getData()
    }, [])

    async function getData() {
      try {
        const sandwich = await getDocs(collection(fireDB, "Sandwichs"));
        const sandwichsArray: any[]= [];
        sandwich.forEach((doc) => {
          const obj = {
            id: doc.id,
            ...doc.data(),
          };
    
          sandwichsArray.push(obj);
        });
        
        
    
        setSand(sandwichsArray)
        console.log(sand);
      } catch (error) {
        Alert.alert;
      }
    }
    

    const nomDuSand: any[] = sand.map((bonjour: any) => {
      return <Text style={styles.nomSand}>{bonjour.Nom}</Text>
    })
    const prixDuSand: any[] = sand.map((bonjour: any) => {
      return  <Text style={styles.TextIngredients}>{bonjour.Prix}</Text>
    })
    
    const descDuSand: any[] = sand.map((bonjour: any) => {
      return <Text style={styles.TextIngredients}>{bonjour.Description}</Text>
      
    })


  return (
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.container}>
          <View style={styles.containertitre}>
            <Text style={styles.titre}>Menu</Text>
          </View>
          <View style={styles.container2}>
            <Text style={styles.nomSand} onPress={() => setShouldShow(!shouldShow)}>
              
              {nomDuSand[0]} 
              <Button title="Add"></Button>            
            </Text>

            {shouldShow ? (
            <Text style={styles.TextIngredients}>
                  Description: {descDuSand[0]}{"\n"}{"\n"} Prix: {prixDuSand[0]}€  
            </Text>
            ) : null}
            <Text style={styles.nomSand} onPress={() => setShouldShow2(!shouldShow2)}>
            {nomDuSand[1]} 

            </Text>
            {shouldShow2 ? (
            <Text style={styles.TextIngredients}>
              Description: {descDuSand[1]}{"\n"}{"\n"} Prix: {prixDuSand[1]}€
            </Text>
            ) : null}
            <Text style={styles.nomSand} onPress={() => setShouldShow3(!shouldShow3)}>
              
              {nomDuSand[2]} 
              
            </Text>


            {shouldShow3 ? (
            <Text style={styles.TextIngredients}>
                  Description: {descDuSand[2]}{"\n"}{"\n"} Prix: {prixDuSand[2]}€  
            </Text>
            ) : null}
            <Text style={styles.nomSand} onPress={() => setShouldShow4(!shouldShow4)}>
              
              {nomDuSand[3]} 
              
            </Text>


            {shouldShow4 ? (
            <Text style={styles.TextIngredients}>
                  Description: {descDuSand[3]}{"\n"}{"\n"} Prix: {prixDuSand[3]}€  
            </Text>
            ) : null}
            
        
          </View>
          <View style={styles.container4}>
            <Button title="Personnaliser" buttonStyle={styles.buttonPers} onPress={() => navigation.navigate('Personnaliser')} />
            <Button title="test" type="outline" buttonStyle={styles.button} onPress={() => addData()}  />

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
        paddingLeft: 10,
        color: "#fff",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius:15,
        paddingBottom: 10,
        
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
        width: "92%",
        paddingRight: 50
    },


});

export default Menu;