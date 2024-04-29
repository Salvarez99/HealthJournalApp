import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";

const DisplayItems = ({ data }) => {
  const renderItem = ({ item }) => (
    <Text style={{ borderBottomWidth: 1, backgroundColor: "#d7dbe0" }}>
      {item.toString()}
    </Text>
  );

  return (
    <View
      style={{ flex: 3, marginTop : 10, backgroundColor: "#d7dbe0", borderWidth: 1, zIndex: 1 }}
    >
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ padding: 10 }}
        scrollEnabled={true}
      />
    </View>
  );
};

export default DisplayItems;
