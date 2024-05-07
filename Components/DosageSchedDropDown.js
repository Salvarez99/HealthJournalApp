/***************************************************************************************
 * Authors: Stephen Alvarez
 * Date: 5/1/2024
 * Code Version: 1.0
 * 
 * Description:
 *  Renders a dropdown menu where user selects their dosage schedule from prepopulated list.
 * 
 * Source: 
 *  https://github.com/hoaphantn7604/react-native-element-dropdown
 * 
 ***************************************************************************************/
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

/**
 * Prepopulated list of dosage schdules
 */
const data = [
  { label: "Morning", value: "1" },
  { label: "Midday", value: "2" },
  { label: "Evening", value: "3" },
  { label: "Bedtime", value: "4" },
];

/**
 * 
 * @param {function} setDosageSchedule passthrough parent function to update parent variable 
 * @returns 
 */
const DosageSchedDropDown = ({ setDosageSchedule }) => {
  const [value, setValue] = useState("Morning");
  const [isFocus, setIsFocus] = useState(false);

  /**
   * Triggered when value is changed, updates dosageSchedule and closes focus
   */
  const onChangeValue = (item) => {
    setValue(item.value);
    setDosageSchedule(item.label);
    setIsFocus(false);
  };

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "black" }]}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? value : "..."}
        value={value}
        onChange={onChangeValue}
      />
    </View>
  );
};

export default DosageSchedDropDown;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 4,
  },
  dropdown: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
});
