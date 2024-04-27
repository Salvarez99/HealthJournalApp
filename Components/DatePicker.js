import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const DatePicker = ({ name, onDateChange }) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    onDateChange(formatDate(currentDate));
  };

  const showDatePicker = () => {
    setShow(true);
  };

  return (
    <View style={styles.container}>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      )}
      <Text style={styles.dateText}>{name}: </Text>
      <TouchableOpacity style={styles.dateInput} onPress={showDatePicker}>
        <Text>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
  },
  dateText: {
    fontWeight: "bold",
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "black",
    width: 150,
    padding: 4,
    borderRadius: 5,
  },
});

export default DatePicker;
