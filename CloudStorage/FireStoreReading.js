import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { readUserData } from './FireStoreWriting';

const FirestoreReading = () => {
    const [userData, setUserData] = useState(null);
  
    useEffect(() => {
      // Read data from Firestore
      readUserData('users', 'Illnesses').then((data) => {
        setUserData(data);
      });
    }, []);

    return (
        <View>
          {userData ? (
            <Text>{JSON.stringify(userData, null, 2)}</Text>
          ) : (
            <Text>Loading...</Text>
          )}
        </View>
      );
    };

    export default FirestoreReading;