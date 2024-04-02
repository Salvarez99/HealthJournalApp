import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Platform,
  TextInput,
  ScrollView,
} from "react-native";

import DatePicker from "../Components/DatePicker";
import TimePicker from "../Components/TimePicker";

const AddAppointmentForm = ({ isVisible, onClose }) => {
  const [eventName, setEventName] = new useState("");
  const [eventDate, setEventDate] = new useState(null);
  const [eventStartTime, setEventStartTime] = new useState(null);
  const [eventEndTime, setEventEndTime] = new useState(null);
  // const [event, setEvent] = new useState();

  const handleDateChange = (selectedDate) => {
    const formattedDate = selectedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    setEventDate(formattedDate);
    console.log(formattedDate);
  };

  const handleStartTimeChange = (startTime) => {
    setEventStartTime(startTime);
    console.log("StartTime: " + startTime);
  };

  const handleEndTimeChange = (endTime) => {
    setEventEndTime(endTime);
    console.log("EndTime: " + endTime);
  };

  //FIX: Add function to clear fields when modal is closed
  const clearFields = () => {
    setEventName("");
    setEventDate(null);
    setEventStartTime(null);
    setEventEndTime(null);
    onClose();
  };

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
            <Text style={styles.modalHeaderText}> Add Appointment</Text>
          </View>

          <View style={styles.modalFormContent}>
            <View style={styles.inputEventName}>
              <Text style={styles.buttonHeaderText}>Event Name: </Text>
              <TextInput
                style={{
                  padding: 2,
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: "black",
                }}
                value={eventName}
                onChangeText={setEventName}
              />
              {console.log(eventName)}
            </View>

            <DatePicker name={"Date"} onDateChange={handleDateChange} />

            <TimePicker
              name={"Start time"}
              onTimeChange={handleStartTimeChange}
            />
            <TimePicker name={"End time"} onTimeChange={handleEndTimeChange} />

            <View style={styles.saveButtonContainer}>
              <TouchableOpacity onPress={clearFields} style={styles.saveButton}>
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
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    padding: 18,
    paddingTop: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },

  saveButtonContainer: {
    left: "70%",
    top: "35%",
  },
  saveButton: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "lightblue",
    width: "30%",
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

export default AddAppointmentForm;
