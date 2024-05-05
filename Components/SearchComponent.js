import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Symptom from "../Classes/Symptom";
import Illness from "../Classes/Illness";
import TestAndLabwork from "../Classes/TestAndLabwork";
import DisplayItems from "./DisplayItems";
import DatePicker from "./DatePicker";

const SearchComponent = ({ searchData, typeDataInputted, updateList }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [items, setItems] = useState([]);
  const [showList, setShowList] = useState(true);

  const onStartDateChange = (newDate) => {
    setStartDate(newDate);
  };
  
  const onEndDateChange = (newDate) => {
    setEndDate(newDate);
  };

  const addItem = (item) => {
    // Extract the necessary information from the item object
    const newItem = { name: item.name, startDate: startDate, endDate: endDate };
    setItems((prevItems) => [...prevItems, newItem]);
  };

  useEffect(() => {
    updateList(items);
  }, [items]); // Only call updateList when items changes

  useEffect(() => {
    // Update the visibility based on the search query
    if (searchQuery.trim().length > 0 && !showList) {
      const exactMatch = filteredList.some(
        (item) => item.name.toLowerCase() === searchQuery.toLowerCase()
      );
      if (exactMatch) {
        setShowList(false);
      } else {
        setShowList(true);
      }
    } else if (searchQuery.trim().length === 0) {
      setShowList(false);
    }
  }, [searchQuery]);

  const filteredList = searchQuery
    ? searchData.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const onChange = () => {
    const selectedItem = filteredList.find(
      (item) => item.name.toLowerCase() === searchQuery.toLowerCase()
    );
    if (selectedItem) {
      addItem(selectedItem);
      setSearchQuery("");
      setShowList(false);
    }
  };

  const onItemPress = (item) => {
    addItem(item);
    setSearchQuery("");
    setShowList(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => onItemPress(item)}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.datePickerContainer}>
        <TextInput
          placeholder="Search..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          maxLength={20}
          style={{
            borderWidth: 1,
            paddingLeft: 5,
            width: 280,
            borderRadius: 5,
          }}
        />
        <TouchableOpacity style={styles.addButton} onPress={onChange}>
          <Ionicons name="add" size={20} />
        </TouchableOpacity>
      </View>

      {typeDataInputted === "symptoms" || typeDataInputted === "illnesses" ? (
        <View style={styles.datePickerContainer}>
          <DatePicker name={"Start Date"} onDateChange={onStartDateChange} />
          <DatePicker name={"End Date"} onDateChange={onEndDateChange} />
        </View>
      ) : (
        <View style={styles.datePickerContainer}>
          <DatePicker name={"Date Occurred"} onDateChange={onStartDateChange} />
        </View>
      )}

      {showList && (
        <View style={styles.listContainer}>
          <FlatList
            data={filteredList}
            renderItem={renderItem}
            contentContainerStyle={styles.listStyle}
            keyExtractor={(item) => item.key.toString()}
          />
        </View>
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
    borderBottomWidth: 1,
    zIndex: 2,
  },
  datePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listStyle: {
    flex: 1,
    zIndex: 2,
    backgroundColor: "white",
    padding: 5,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  addButton: {
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
    borderRadius: 5,
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
});

export default SearchComponent;