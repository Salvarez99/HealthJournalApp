import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

const data = [
  { label: "Morning", value: "1" },
  { label: "Midday", value: "2" },
  { label: "Evening", value: "3" },
  { label: "Bedtime", value: "4" },
];

const DropdownComponent = () => {
  const [value, setValue] = useState('Morning');
  const [isFocus, setIsFocus] = useState(false);


  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "black" }]}
        placeholderStyle={styles.placeholderStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? value : "..."}
        value={value}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop : 4,
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
