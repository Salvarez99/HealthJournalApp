import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Symptom from "../Classes/Symptom";
import Illness from "../Classes/Illness";
import TestAndLabwork from "../Classes/TestAndLabwork";

const SearchComponent = ({ searchData, typeDataInputted }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [picker, setPicker] = useState("start");
  const [items, setItems] = useState([]); //List of data stored from user input


  const addItem = (name, startDate, endDate) => {
    let item;

    switch (typeDataInputted) {
      case "symptoms":
        item = new Symptom(name, startDate, endDate);
        break;
      case "illnesses":
        item = new Illness(name, startDate, endDate);
        break;
      case "test":
        item = new TestAndLabwork(name, startDate, endDate);
        break;
      default:
        console.error("Unknown Type: " + typeDataInputted);
        return;
    }
    setItems((prevItems) => [...prevItems, item]);
  };

  const filteredList = searchQuery
    ? searchData.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  useEffect(() => {
    // console.log("Current picker: " + picker);
  }, [picker]);

  const onChange = (event, selectedDate) => {
    console.log("onChange");
    const newDate = selectedDate || (picker === "start" ? startDate : endDate);

    if (event.type === "set") {
      if (picker === "start") {
        // Delay before changing states
        setTimeout(() => {
          console.log(picker + " " + showPicker);
          setStartDate(newDate);
          console.log("Start date " + newDate.toLocaleDateString());
          setShowPicker(false); // Close start picker

          // Delay after state has changed
          setTimeout(() => {
            setPicker("end");
            // Delay before opening the next picker
            setTimeout(() => {
              setShowPicker(true); // Open end picker
            }, 325);
          }, 325);
        }, 325);
      } else if (picker === "end") {
        // Delay before changing states
        setTimeout(() => {
          console.log(picker + " " + showPicker);
          setEndDate(newDate);
          console.log("End date: " + newDate.toLocaleDateString());
          setShowPicker(false); // Close end picker

          // Delay after state has changed
          setTimeout(() => {
            setPicker("start");
            // Delay before preparing for the next use
            setTimeout(() => {
              setShowPicker(false); // Prepare for next use
            }, 325);
          }, 325);
        }, 325);
      }
    }
  };

  const onItemPress = (item) => {
    console.log("item: " + item);
    setSearchQuery(item);
    setShowPicker(true); // Open picker when item is pressed
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => onItemPress(item)}>
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  const renderOutputListItem = ({ item }) => (
  <Text> {item.toString()} </Text>
  );

  return (
    <View>
      <TextInput
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        maxLength={20}
      />
      <FlatList
        data={filteredList}
        renderItem={renderItem}
        contentContainerStyle={{ borderWidth: 1, borderColor: "black" }}
      />
      {showPicker && (
        <DateTimePicker
          testID={
            picker === "start" ? "startDateTimePicker" : "endDateTimePicker"
          }
          value={picker === "start" ? startDate : endDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <FlatList
        data={items}
        renderItem={renderOutputListItem}
        contentContainerStyle={{
          borderWidth: 1,
          borderColor: "black",
          height: 80,
          maxHeight: 80,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
        }}
      />
    </View>
  );
};

export default SearchComponent;
