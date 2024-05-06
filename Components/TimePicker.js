/***************************************************************************************
 * Authors: Stephen Alvarez
 * Date: 5/1/2024
 * Code Version: 1.0
 * 
 * Description:
 *  Renders a Time picker. Passes gathered data up to parent component.
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
 * @param {String} name displayed on top of touchableOpacity
 * @param {function} onTimeChange passthrough parent function, used to update parents variables with time gathered
 * @returns 
 */
const TimePicker = ({ name, onTimeChange }) => {
  const [time, setTime] = useState("");
  const [show, setShow] = useState(false);

  /**
   * Updates time and passes new time to parent function
   */
  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShow(false);
    setTime(currentTime);
    onTimeChange(formatTime(currentTime));
  };

  const showTimePicker = () => {
    setShow(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}> {name}:</Text>
      <TouchableOpacity style={styles.timeInput} onPress={showTimePicker}>
        <Text>{time ? formatTime(time) : ""}</Text>
      </TouchableOpacity>
      {/**show the picker if show is true; Otherwise picker is hidden*/}
      {show && (
        <DateTimePicker
          testID="timePicker"
          value={time ? new Date(time) : new Date()}
          mode="time"
          is24Hour={false}
          display="clock"
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
};

const formatTime = (time) => {
  return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
  },
  timeText: {
    fontWeight: "bold",
  },
  timeInput: {
    borderWidth: 1,
    borderColor: "black",
    width: "50%",
    padding: 4,
    borderRadius: 5,
  },
});

export default TimePicker;
