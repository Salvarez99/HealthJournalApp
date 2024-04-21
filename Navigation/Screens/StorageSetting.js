import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
// citation learned from : https://www.youtube.com/watch?v=BQ-kHwLlhrg
import styled from 'styled-components/native';
// import formik
import { Formik } from 'formik';
import {  Platform, Button, View, StyleSheet, TouchableOpacity, Image, Text, TextInput } from 'react-native';

// icon
import { Octicons, Fontisto, Ionicons } from '@expo/vector-icons'; // Ionicons : for isPassword , Fontisto : for goole icon

//for navigation
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

// import on app.js on navigation stack. 
export default function StorageSetting(){

return(
   <View>
     <Text>Storage Setting </Text>
   </View>
);
};
