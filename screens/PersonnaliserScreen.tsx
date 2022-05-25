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

export default function PersonnaliserScreen(){

return(
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.container}>
          <View style={styles.containertitre}>
            <Text style={styles.titre}>Menu</Text>
          </View>
        </ScrollView>
    </SafeAreaView>
)

}

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
      }
})