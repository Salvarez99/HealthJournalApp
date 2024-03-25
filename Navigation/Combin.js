import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainContainer from './MainContainer'; // Import MainContainer component

export default function Combin() {
  return (
    <NavigationContainer>
      {/* Use the MainContainer component */}
      <MainContainer />
    </NavigationContainer>
  );
}
