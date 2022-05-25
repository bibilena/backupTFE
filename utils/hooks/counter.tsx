import { useState } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";

export function count(){
    const [count, setcount] = useState(0)

    return(
        <View>
            <Button title="Add" onPress= {() => {setcount(count+1)}} />
            <Text> Vous avez {count} Sandwich de ce type dans votre panier</Text>
        </View>
    )
}