/***************************************************************************************
 * Authors: Stephen Alvarez
 * Date: 5/1/2024
 * Code Version: 1.0
 *
 * Description:
 *  Renders a set of buttons. Each button is associated with a day of the week.
 *
 *
 ***************************************************************************************/

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";

const WeekDaysButtons = ({ selectedDays, setSelectedDays }) => {
  const days = ["S", "M", "T", "W", "T", "F", "S"];

  const toggleDayPressed = (index) => {
    const newSelectedDays = selectedDays.includes(index)
      ? selectedDays.filter((i) => i !== index) // Remove index if already selected
      : [...selectedDays, index]; // Add index if not already selected

    setSelectedDays(newSelectedDays);
  };

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
      {days.map((day, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => toggleDayPressed(index)}
          style={[
            styles.button,
            selectedDays.includes(index) ? styles.buttonPressed : {},
            Platform.select({
              ios: styles.iosShadow,
              android: styles.androidElevation,
            }),
          ]}
        >
          <Text style={styles.buttonText}>{day}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    marginTop: 4,
  },
  buttonPressed: {
    backgroundColor: "#DDD", // Indicate the selected state with a different background
  },
  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  iosShadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  androidElevation: {
    elevation: 5,
  },
});

export default WeekDaysButtons;
