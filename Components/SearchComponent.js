/***************************************************************************************
 * Authors: Stephen Alvarez
 * Date: 5/1/2024
 * Code Version: 1.0
 * 
 * Description:
 *  Renders a search component. Consist of a searchbar and handles functionality of when 
 * the user inputs data and saves the item. Items will be displayed from the DisplayItems
 * component
 * 
 * 
 ***************************************************************************************/
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
import { Ionicons } from "@expo/vector-icons"; //Vector Icons are used for button icons
import Symptom from "../Classes/Symptom";
import Illness from "../Classes/Illness";
import TestAndLabwork from "../Classes/TestAndLabwork";
import DisplayItems from "./DisplayItems";
import DatePicker from "./DatePicker";

/**
 * 
 * @param {List[String]} searchData list of strings that are to be displayed when user searches for an item
 * @param {String} typeDataInputted indicates the type of data that is being inputted and should be passed back to parent component
 * @param {function} updateList passthrough function from parent component that updates the parent's list
 */
const SearchComponent = ({ searchData, typeDataInputted, updateList }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [items, setItems] = useState([]); //List of data stored from user input
  const [showList, setShowList] = useState(true);

  const onStartDateChange = (newDate) => {
    setStartDate(newDate);
    // console.log("New Start Date: ", newDate);
  };
  
  const onEndDateChange = (newDate) => {
    // console.log("New End Date: ", newDate);
    setEndDate(newDate);
  };
  
  /**
   * 
   * @param {String} name 
   * @param {Date} startDate 
   * @param {Date} endDate 
   * Creates an instances of either Symptom, Illness or TestAndLabwork then
   * stores the item into {items}
   */
  const addItem = (name, startDate, endDate) => {
    let item;

    if (startDate instanceof Date) {
      startDate = startDate.toLocaleDateString();
    }
    if (endDate instanceof Date) {
      endDate = endDate.toLocaleDateString();
    }

    switch (typeDataInputted) {
      case "symptoms":
        item = new Symptom(name, startDate, endDate);
        break;
      case "illnesses":
        item = new Illness(name, startDate, endDate);
        break;
      case "tests":
        item = new TestAndLabwork(name, startDate);
        break;
      default:
        console.error("Unknown Type: " + typeDataInputted);
        return;
    }
    setItems((prevItems) => [...prevItems, item]); //update local list of items
  };

  //Updates parents list when items is used
  useEffect(() => {
    updateList(items);
  }, [items]);

  useEffect(() => {
    // Update the visibility based on the search query
    if (searchQuery.trim().length > 0 && !showList) {
      const exactMatch = filteredList.some(
        (item) => item.toLowerCase() === searchQuery.toLowerCase()
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

  //Filter the list based on current searchQuery
  const filteredList = searchQuery
  ? searchData.filter((item) => {
      if (typeof item !== 'string') {
        console.error('Error in filteredList, Invalid item type:', item);
        console.log('Expects item type of {list[String]}')
        return false;
      }
      return item.toLowerCase().includes(searchQuery.toLowerCase());
    })
  : [];

  const onChange = () => {
    //Checks if searchQuery is not just whitespace
    if(!/^\s*$/.test(searchQuery)){
      addItem(searchQuery, startDate, endDate);
    }else{
      alert('Required fields missing.\nRequired fields contains \'*\'.')
      return
    }
  };

  const onItemPress = (item) => {
    setSearchQuery(item);
    setShowList(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => onItemPress(item)}>
      <Text>{item}</Text>
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
        {/**TouchableOpacity when pressed adds item to list */}
        <TouchableOpacity style={styles.addButton} onPress={onChange}>
          <Ionicons name="add" size={20} />
        </TouchableOpacity>
      </View>
      
      {/**If type of data is either symptoms or illness; render 2 datePickers. Otherwise render one datePicker */}
      {typeDataInputted === "symptoms" || typeDataInputted === "illnesses" ? (
        <View style={styles.datePickerContainer}>
          <DatePicker name={"Start Date"} onDateChange={onStartDateChange} />
          <DatePicker name={"End Date"} onDateChange={onEndDateChange} />
        </View>
      ) : (
        <View style={styles.datePickerContainer}>
          <DatePicker name={"Date Occured"} onDateChange={onStartDateChange} />
        </View>
      )}

      {/**Shows list of items when user is typing into textInput */}
      {showList && (
        <View style={styles.listContainer}>
          <FlatList
            data={filteredList}
            renderItem={renderItem}
            contentContainerStyle={styles.listStyle}
            keyExtractor={(item) => item.toString()}
          />
        </View>
      )}
      {/** Shows data collected from user input. i.e. Symptoms data*/}
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