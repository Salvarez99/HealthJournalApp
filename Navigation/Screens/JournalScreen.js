import { View, Text } from "react-native";
import * as React from 'react';



export default function JournalScreen ({navigation}){
    return(
        <View 
        style={{
            flex: 1, 
            alignItems: 'center',
            justifyContent: 'center'}}>

            <Text
            onPress={() => alert('Journal Screen')}
            style={{
                fontSize: 26, 
                fontWeight: 'bold',
            }}> JournalScreen </Text>
        </View>
    );
}