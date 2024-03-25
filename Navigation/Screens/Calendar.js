// calendar listing page
/**
 * Citation to learn agenda and calendar package from expo library. 
 * https://blog.logrocket.com/create-customizable-shareable-calendars-react-native/
 */


import React, { useState } from 'react';
import { View, Text , Button, TextInput ,SafeAreaView, StyleSheet, ScrollView, TouchableOpacity,} from 'react-native';
import { Calendar, Agenda, LocaleConfig , CalendarList} from 'react-native-calendars';
import moment from 'moment';


//for navigation
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { StatusBar } from 'expo-status-bar';
import {
  InnerContainer,
  StyledContainer,
  TopContainer,
  WelcomePageContainer,


}from '../../Components/styles.js';

// import { SafeAreaViewContainer } from './../components/calenderStyles.js';
import styled from 'styled-components/native';
import { setIn } from 'formik';
import { InputContainer, SafeAreaViewContainer, TextInputContainer, ItemContainer } from '../../Components/calenderStyles.js';


// named as CalendarScreen since we import Calendar from 'react-native-calendars'
const CalendarScreen = () => {
  const [Items, setItems] = useState({}); 
  const [inputvalue, setInputValue] = useState(''); 

  const handleAddItem = () => {
    if(inputvalue == null){
      return; 
    }

    const newItems = {...Items} // copy value
    const selectedDate = '2024-03-25'; // default date

    //check selectedDate - also can use array from https://react.dev/learn/updating-arrays-in-state
    if(newItems[selectedDate]){
      newItems[selectedDate] = [...newItems[selectedDate], {name : inputvalue}];  // copy newitem and name value into newItems[selectedDate]
    }else{
      newItems[selectedDate] = [{name : inputvalue}]; 
    }

    setItems(newItems); 
    setInputValue('');
  };
  
// for agenda renderItem=() used https://medium.com/vectoscalar/setup-calendar-in-a-react-native-project-e0316341ec29
  return (
      <SafeAreaViewContainer>
          <InputContainer>
              <TextInputContainer />
                <Button title="Add Item "  style={{color: '#D3B683' }} onPress={handleAddItem} />

          </InputContainer>

          <Agenda
            items={Items}
            renderItem={(item, isFirst) => (
              <ItemContainer>
                  <Text>{item.name} </Text>
              </ItemContainer>
            )}
          />

      </SafeAreaViewContainer>
  );
};


export default CalendarScreen;