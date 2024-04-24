// styling for calender.js
import styled from "styled-components/native"; // Make sure to import from 'styled-components/native' for React Native
import { StatusBar, YellowBox } from "react-native";
import Constants from "expo-constants";

// StyledContainer
export const SafeAreaViewContainer = styled.SafeAreaView({
  flex: 1,
  justifyContent: "center",
  //height: '60%',
});

export const InputContainer = styled.View({
  flexDirection: "row", //sperade row wise
  marginBottom: "10px",
  padding: 10,
});

export const TextInputContainer = styled.TextInput({
  flex: 1,
  marginRight: 10,
  borderWidth: 1,
  borderColor: "#D3B683",
  padding: 10,
});

export const ItemContainer = styled.View({
  backgroundColor: "#fff",
  padding: 10,
  marginBottom: 10,
  borderWidth: 1,
  borderColor: "#D3B683",
  borderRadius: 5,
});
