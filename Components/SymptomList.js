import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SearchOverlay from "../Navigation/Screens/SearchOverlay";
const DATA = [
  { name: "Cough", startDate: "4/10/24", endDate: "4/13/24" },
  { name: "Headache", startDate: "4/10/24", endDate: "4/13/24" },
  { name: "Sore throat", startDate: "4/10/24", endDate: "4/13/24" },
  { name: "Back pain", startDate: "4/10/24", endDate: "4/13/24" },
  { name: "Congestion", startDate: "4/10/24", endDate: "4/13/24" },
];

const Item = ({ item }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{item.name}</Text>
    <Text>Start Date: {item.startDate}</Text>
    <Text>End Date: {item.endDate}</Text>
  </View>
);

const SymptomList = () => {
  const renderItem = ({ item }) => {
    return <Item item={item} />;
  };

  return (
    <View>
      {/* <SearchOverlay></SearchOverlay> */}
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        style={{
          backgroundColor: "white",
          borderWidth: 1,
          borderColor: "black",
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          height: "auto",
          maxHeight: 180,
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 5,
    marginLeft: 5,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default SymptomList;
