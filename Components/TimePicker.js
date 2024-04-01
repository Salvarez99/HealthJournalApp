import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const TimePicker = ({ name }) => {
  const [time, setTime] = useState('');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShow(false);
    setTime(currentTime);
  };

  const showTimePicker = () => {
    setShow(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}> {name}:</Text>
      <TouchableOpacity style={styles.timeInput} onPress={showTimePicker}>
        <Text>{time ? formatTime(time) : ''}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="timePicker"
          value={time ? new Date(time) : new Date()}
          mode='time' 
          is24Hour={false}
          display='clock'
          onChange={onChange}
        />
      )}
    </View>
  );
};

const formatTime = (time) =>{
    return time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
}

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
