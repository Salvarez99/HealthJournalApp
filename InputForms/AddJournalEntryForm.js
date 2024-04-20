import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Platform,
  TextInput,
} from "react-native";

import DatePicker from "../Components/DatePicker";
import TimePicker from "../Components/TimePicker";
import SearchComponent from "../Components/SearchComponent";
import DisplayItems from "../Components/DisplayItems";

const AddJournalEntryForm = ({ isVisible, onClose }) => {
  let data = [
    "Cough",
    "Headache",
    "Sore throat",
    "Back pain",
    "Congestion",
    "Light Headedness",
  ]; //Dummy db list, to be replaced with call to db

  //TODO: Implement save functionality
  const onSave = () => {};
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalForm}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}> Add Journal Entry</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name={"close"} size={28} color={"black"} />
            </TouchableOpacity>
          </View>

          <View style={styles.modalFormContent}>
            <View style={{ backgroundColor : 'white',}}>
              <Text style={{ fontWeight: "bold" }}> Symptoms: </Text>

            </View>
            <View style={{flex : 1}}>
              <SearchComponent
                searchData={data}
                typeDataInputted={"symptoms"}
              />
            </View>
            <View style={{ backgroundColor : 'white',}}>
              <Text style={{ fontWeight: "bold" }}> Illnesses: </Text>

            </View>
            <View style={{flex : 1}}>
              <SearchComponent
                searchData={data}
                typeDataInputted={"symptoms"}
              />
            </View>
            <View style={{ backgroundColor : 'white',}}>
              <Text style={{ fontWeight: "bold" }}> Test & Labworks: </Text>

            </View>
            <View style={{flex : 1}}>
              <SearchComponent
                searchData={data}
                typeDataInputted={"symptoms"}
              />
            </View>

            <View style={styles.saveButtonContainer}>
              <TouchableOpacity onPress={onClose} style={styles.saveButton}>
                <Text>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalForm: {
    backgroundColor: "white",
    width: "90%",
    height: "60%",
    borderRadius: 10,
    alignItems: "center",
    bottom: "12%",
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  modalHeader: {
    height : 50,
    backgroundColor: "#d7dbe0",
    padding: 12,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalFormContent: {
    flex: 16,
    backgroundColor: "white",
    width: "100%",
    padding: 18,
    paddingTop: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },

  saveButtonContainer: {
    position: "absolute",
    right: 15,
    bottom: 15,
  },
  closeButton: {
    position: "absolute",
    right: 20,
    top: 12,
  },
  saveButton: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "lightblue",
    width: 70,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  buttonHeaderText: {
    fontWeight: "bold",
    paddingTop: 4,
  },
});

export default AddJournalEntryForm;
