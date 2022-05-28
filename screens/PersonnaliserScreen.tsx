import React, { useContext, useEffect, useState } from "react"
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    SafeAreaView,
    Pressable,
  } from 'react-native';
import { Button } from "react-native-elements";
import { RadioButton, Checkbox} from 'react-native-paper'
import { StackScreenProps } from '@react-navigation/stack';


function blancGris(a : String){
  var b
  if(a === "blanc"){
    b = 2.5
    return b
  }
  else{
    b = 3
    return b
  }
}

function beurreMayo(a : String){
  var b
  if(a === "beurre" || a === "mayonnaise"){
    b = 0.5
    return b
  }
  else{
    b = 0
    return b
  }
}

function proteine(a : boolean, b : boolean, c : boolean){
  var d = 0
  if(a == true){
    d += 0.5
  }
  if(b == true){
    d += 1.5
  }
  if(c == true){
    d += 1
  }
  return d
}

const PersonnaliserScreen: React.FC<StackScreenProps<any>> = ({ navigation }) =>  {

  const [pain, setPain] = React.useState('blanc');
  const [beurre, setBeurre] = React.useState('beurre');
  const [prot, setProt] = React.useState(false);
  const [prot2, setProt2] = React.useState(false);
  const [prot3, setProt3] = React.useState(false);



return(
    <SafeAreaView style={styles.container}> 
        <ScrollView style={styles.container}>
          <View style={styles.containertitre}>
            <Text style={styles.titre}>Sandwich personnalisé</Text>
          </View>
          <View style={styles.containerCheckDiff}>
            <View style={styles.containerCheck}>
              <RadioButton uncheckedColor="white" value="blanc" status={ pain ==="blanc" ?'checked' : 'unchecked'} onPress={() => setPain('blanc')}>
              </RadioButton>
              <Text style={styles.containerText}>Pain blanc (2.5€)</Text>
            </View>
            <View style={styles.containerCheck}>
              <RadioButton uncheckedColor="white" value="gris" status={ pain ==="gris" ?'checked' : 'unchecked'} onPress={() => setPain('gris')}></RadioButton>
              <Text style={styles.containerText}>Pain gris (3€)</Text>
            </View>
          </View>

          <View style={styles.containerCheckDiff}>
            <View style={styles.containerCheck}>
              <RadioButton uncheckedColor="white" value="beurre" status={ beurre ==="beurre" ?'checked' : 'unchecked'} onPress={() => setBeurre('beurre')}>
              </RadioButton>
              <Text style={styles.containerText}>Beurre (0.5€)</Text>
            </View>
            <View style={styles.containerCheck}>
              <RadioButton uncheckedColor="white" value="mayonnaise" status={ beurre ==="mayonnaise" ?'checked' : 'unchecked'} onPress={() => setBeurre('mayonnaise')}></RadioButton>
              <Text style={styles.containerText}>Mayonnaise (0.5€)</Text>
            </View>
            <View style={styles.containerCheck}>
              <RadioButton uncheckedColor="white" value="sans" status={ beurre ==="sans" ?'checked' : 'unchecked'} onPress={() => setBeurre('sans')}></RadioButton>
              <Text style={styles.containerText}>Sans</Text>
            </View>
          </View>

          <View style={styles.containerCheckDiff}>
            <View style={styles.containerCheck}>
              <Checkbox uncheckedColor="white" status={ prot ?'checked' : 'unchecked'} onPress={() => {setProt(!prot)}}></Checkbox>
              <Text style={styles.containerText}>Jambon (0.5€)</Text>
            </View>
            <View style={styles.containerCheck}>
              <Checkbox uncheckedColor="white" status={ prot2 ?'checked' : 'unchecked'} onPress={() => {setProt2(!prot2)}}></Checkbox>
              <Text style={styles.containerText}>Poulet grillé (1.5€)</Text>
            </View>
            <View style={styles.containerCheck}>
              <Checkbox uncheckedColor="white" status={ prot3 ?'checked' : 'unchecked'} onPress={() => {setProt3(!prot3)}}></Checkbox>
              <Text style={styles.containerText}>Américain (1€)</Text>
            </View>
          </View>

          <View style={styles.containerPrix}>
            <Text style={styles.textPrix}>Le prix du sandwich est de {blancGris(pain) + beurreMayo(beurre) + proteine(prot, prot2, prot3) } euros</Text>
          </View>

          <View style={styles.containerButton}>
          <Button title="valider" buttonStyle={styles.buttonPers} onPress={() => navigation.navigate('Menu')} />

          </View>

          
        </ScrollView>
    </SafeAreaView>
)
}
export default PersonnaliserScreen



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#444956",
        width: "100%"

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
      

      containerCheck: {
        flexDirection: "row",
        alignItems: "center",
        
      },

      containerCheckDiff:{
        backgroundColor: "#2E2B2B",
        marginLeft: 15,
        padding: 10,
        color: "#fff",
        borderRadius: 15,
        marginBottom: 20,
        width: "92%"
      },

      containerText: {
        alignItems: "center",
        color: "#fff",
      },

      containerPrix: {
        alignItems: "center",
      },

      textPrix: {
        color: "#fff",
        fontSize: 20
      },

      buttonPers: {
        width: "50%",
      borderRadius: 25,
      height: 50,
      marginTop: 20,
      marginBottom: 10,
      backgroundColor: "#2E2B2B",
      paddingRight: 50,
      alignItems: "center"
      },

      containerButton: {
        alignItems: 'center'
      }
})