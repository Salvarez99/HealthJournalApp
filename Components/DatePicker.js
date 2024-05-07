/***************************************************************************************
 * Authors: Stephen Alvarez
 * Date: 5/1/2024
 * Code Version: 1.0
 * 
 * Description:
 *  Renders a Date picker. Passes gathered data up to parent component.
 * 
 * Source: 
 *  https://github.com/react-native-datetimepicker/datetimepicker
 * 
 ***************************************************************************************/
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

/**
 * 
 * @param {String} name name displayed on top of touchableOpacity
 * @param {function} onDateChange passthrough parent function, used to update parents variables with date gathered
 * @returns 
 */
const DatePicker = ({ name, onDateChange }) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false); //state to control if datePicker is shown

  /**
   * Updates date and passes new date to parent function
   */
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    onDateChange(currentDate);
  };

  const showDatePicker = () => {
    setShow(true);
  };

  return (
    <View style={styles.container}>
      {/**show the picker if show === true; Otherwise picker is hidden*/}
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
      {/**TouchableOpacity when clicked sets showPicker to true */}
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
