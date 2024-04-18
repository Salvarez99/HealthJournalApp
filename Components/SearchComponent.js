import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useState, useCallback, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [dateSelectionStep, setDateSelectionStep] = useState(null); // 'start', 'end', or null
  const [dateSet, setDateSet] = useState(false);

  let data = [
    { name: "Cough", startDate: "4/10/24", endDate: "4/13/24" },
    { name: "Headache", startDate: "4/10/24", endDate: "4/13/24" },
    { name: "Sore throat", startDate: "4/10/24", endDate: "4/13/24" },
    { name: "Back pain", startDate: "4/10/24", endDate: "4/13/24" },
    { name: "Congestion", startDate: "4/10/24", endDate: "4/13/24" },
  ];

  const filteredList = searchQuery ? data.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())) : [];

  useEffect(() => {
    console.log("Start date updated: " + startDate.toLocaleDateString());
  }, [startDate]);
  
  useEffect(() => {
    console.log("End date updated: " + endDate.toLocaleDateString());
  }, [endDate]);

  const debounce = (func, delay) => {
    let timer;
    return function(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };
  
  const handleDateChange = useCallback(debounce((event, selectedDate) => {
    console.log('Handling date change for step: ' + dateSelectionStep);
    if (!selectedDate || dateSet){
      console.log('No date selected, returning.');
      return;
    } 

    if (dateSet) {
      console.log('Date already set, returning.');
      return;
    }

    if (dateSelectionStep === 'start') {
      setStartDate(selectedDate);
      setDateSet(true);
      setDateSelectionStep('end');
    } else if (dateSelectionStep === 'end') {
      setEndDate(selectedDate);
      setDateSet(true);
      setDateSelectionStep(null);
      setShowPicker(false);
    }
  }, 300), [dateSelectionStep, dateSet]);

  const onItemPress = (item) => {
    console.log('Item pressed: ' + item.name);
    setSearchQuery(item.name); 
    if (!dateSelectionStep) {
      console.log('No current date selection step, initializing start date selection.');
      setDateSelectionStep('start');
      setShowPicker(true);
      setDateSet(false);
    }else{
      console.log('Current date selection step:', dateSelectionStep);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => onItemPress(item)}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
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

      {showPicker && dateSelectionStep === 'start' && (
        <DateTimePicker
          testID="startDateTimePicker"
          value={startDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      )}

      {showPicker && dateSelectionStep === 'end' && (
        <DateTimePicker
          testID="endDateTimePicker"
          value={endDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

export default SearchComponent;
