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
import DisplayItems from "./DisplayItems";

const SearchComponent = ({ searchData, typeDataInputted, updateList }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dateOccured, setDateOccured] = useState(new Date());
  const [picker, setPicker] = useState("start");
  const [items, setItems] = useState([]); //List of data stored from user input

  const addItem = (name, startDate, endDate) => {
    let item;

    switch (typeDataInputted) {
      case "symptoms":
        item = new Symptom(
          name,
          startDate.toLocaleDateString(),
          endDate.toLocaleDateString()
        );
        break;
      case "illnesses":
        item = new Illness(
          name,
          startDate.toLocaleDateString(),
          endDate.toLocaleDateString()
        );
        break;
      case "tests":
        item = new TestAndLabwork(name, startDate.toLocaleDateString());
        break;
      default:
        console.error("Unknown Type: " + typeDataInputted);
        return;
    }
    setItems((prevItems) => [...prevItems, item]);
  };

  useEffect(() => {
    updateList(items);
  }, [items]); // Only call updateList when items changes

  const filteredList = searchQuery
    ? searchData.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // useEffect(() => {
  //   console.log("Current picker: " + picker);
  // }, [picker]);

  const onChange = (event, selectedDate) => {
    // console.log("onChange");
    const newDate = selectedDate || (picker === "start" ? startDate : endDate);

    if (event.type === "set") {
      if (typeDataInputted === "tests") {
        setDateOccured(newDate);
        setShowPicker(false);
        addItem(searchQuery, newDate, newDate); // Assuming the use of one date for simplicity
        setSearchQuery("");
      } else {
        if (picker === "start") {
          // Delay before changing states
          setTimeout(() => {
            // console.log(picker + " " + showPicker);
            setStartDate(newDate);
            // console.log("Start date " + newDate.toLocaleDateString());
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
            // console.log(picker + " " + showPicker);
            setEndDate(newDate);
            // console.log("End date: " + newDate.toLocaleDateString());
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
          addItem(searchQuery, startDate, newDate);
          setSearchQuery("");
        }
      }
    } else {
      setTimeout(() => {
        setPicker("start");
        setShowPicker(false);
      }, 325);
    }
  };

  const onItemPress = (item) => {
    // console.log("item: " + item);
    setSearchQuery(item);
    if (typeDataInputted !== "tests" || !showPicker) {
      setShowPicker(true); // Only set to show if not already showing for 'tests'
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => onItemPress(item)}>
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  const listStyle =
    filteredList.length > 0
      ? {
          flex: 1,
          zIndex: 2,
          backgroundColor: "white",
          padding: 5,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderBottomWidth: 1,
        }
      : {
          flex: 1,
          zIndex: 2,
          backgroundColor: "#d7dbe0",
          borderLeftWidth: 1,
          borderRightWidth: 1,
        };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <TextInput
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        maxLength={20}
        style={{ borderWidth: 1, paddingLeft: 5 }}
      />
      <View style={styles.listContainer}>
        <FlatList
          data={filteredList}
          renderItem={renderItem}
          contentContainerStyle={listStyle}
          keyExtractor={(item) => item.toString()}
        />
      </View>
      {showPicker && typeDataInputted === "tests" && (
        <DateTimePicker
          testID="dateTimePickerTest"
          value={dateOccured}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      {showPicker && typeDataInputted !== "tests" && (
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
      <DisplayItems data={items} />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    position: "absolute",
    top: 32,
    left: 0,
    right: 0,
    backgroundColor: "white",
    zIndex: 2,
    borderBottomWidth: 1,
  },
});

export default SearchComponent;
