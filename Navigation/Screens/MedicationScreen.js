import { View, Text } from "react-native";
import * as React from 'react';



export default function MedicationScreen ({navigation}){
    return(
        <View 
        style={{
            flex: 1, 
            alignItems: 'center',
            justifyContent: 'center'}}>

            <Text
            onPress={() => navigation.navigate('Journal')}
            style={{
                fontSize: 26, 
                fontWeight: 'bold',
            }}> Medication Screen </Text>
        </View>
    );
}