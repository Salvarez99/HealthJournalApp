/**
 * Citation to learn agenda and calendar package from expo library.
 * https://blog.logrocket.com/create-customizable-shareable-calendars-react-native/
 */

import React, { useState } from "react";
import QuickAddButton from "../../Components/QuickAddButton";
import AddJournalEntryForm from "../../InputForms/AddJournalEntryForm";
import AddAppointmentForm from "../../InputForms/AddAppointmentForm";
import AddMedicationForm from "../../InputForms/AddMedicationForm";

//TODO: Sort out unused imports
import {
  View,
  Text,
  Button,
  TextInput,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  Calendar,
  Agenda,
  LocaleConfig,
  CalendarList,
} from "react-native-calendars";
import moment from "moment";

//for navigation
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import { StatusBar } from "expo-status-bar";
import {
  InnerContainer,
  StyledContainer,
  TopContainer,
  WelcomePageContainer,
} from "../../AppStyles/styles.js";

// import { SafeAreaViewContainer } from '../../AppStyles/calenderStyles.js';
import styled from "styled-components/native";
import { setIn } from "formik";
import {
  InputContainer,
  SafeAreaViewContainer,
  TextInputContainer,
  ItemContainer,
} from "../../AppStyles/calenderStyles.js";

export default function CalendarScreen({ navigation }) {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [selectedModal, setSelectedModal] = React.useState(null);
  const [Items, setItems] = React.useState({});
  const [inputvalue, setInputValue] = React.useState("");

  const handleAddItem = () => {
    if (inputvalue == null) {
      return;
    }

    const newItems = { ...Items };  // copy value
    const selectedDate = "2024-03-25"; // default date

    //check selectedDate - also can use array from https://react.dev/learn/updating-arrays-in-state
    if (newItems[selectedDate]) {
      newItems[selectedDate] = [
        ...newItems[selectedDate],
        { name: inputvalue },
      ]; // copy newitem and name value into newItems[selectedDate]
    } else {
      newItems[selectedDate] = [{ name: inputvalue }];
    }

    setItems(newItems);
    setInputValue("");
  };

  const openModal1 = () => {
    setSelectedModal("AddAppointmentForm");
    setIsModalVisible(true);
  };

  const openModal2 = () => {
    setSelectedModal("AddMedicationForm");
    setIsModalVisible(true);
  };

  const openModal3 = () => {
    setSelectedModal("AddJournalEntryForm");
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  // Define modal components with their names
  const modalComponents = [
    { name: "Add Appointment", openModal: openModal1 },
    { name: "Add Medication", openModal: openModal2 },
    { name: "Add Journal Entry", openModal: openModal3 },
    // Add more modal components as needed
  ];

  const renderSelectedModal = () => {
    switch (selectedModal) {
      case "AddAppointmentForm":
        return (
          <AddAppointmentForm isVisible={isModalVisible} onClose={closeModal} />
        );
      case "AddMedicationForm":
        return (
          <AddMedicationForm isVisible={isModalVisible} onClose={closeModal} />
        );
      case "AddJournalEntryForm":
        return (
          <AddJournalEntryForm
            isVisible={isModalVisible}
            onClose={closeModal}
          />
        );
      default:
        return null;
    }
  };

  // for agenda renderItem=() used https://medium.com/vectoscalar/setup-calendar-in-a-react-native-project-e0316341ec29
  return (
    <SafeAreaViewContainer>
      {/* Put your content in this view */} 
      <InputContainer>
        <TextInputContainer />
        <Button
          title="Add Item "
          style={{ color: "#D3B683",}}
          onPress={handleAddItem}
        />
      </InputContainer>

      <Agenda
        items={Items}
        renderItem={(item, isFirst) => (
          <ItemContainer>
            <Text>{item.name} </Text>
          </ItemContainer>
        )}
      />
      {/* Your content ends here */}


      {/*Below is the quick add button */}
      <View style={styles.quickAddButtonContainer}>
        <QuickAddButton modalComponents={modalComponents} />
      </View>

      {renderSelectedModal()}
    </SafeAreaViewContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  quickAddButtonContainer: {
    position: "absolute",
    bottom: "2%",
    left: "4%",
  },
});