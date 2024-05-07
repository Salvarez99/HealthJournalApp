/***************************************************************************************
 * Authors: Stephen Alvarez
 * Date: 5/1/2024
 * Code Version: 1.0
 * 
 * Description:
 *  Renders a flatlist
 * 
 * 
 * 
 ***************************************************************************************/
import React from "react";
import { View, FlatList, Text } from "react-native";

/**
 * 
 * @param {List} data list being displayed in flatlist, can be any list of data as long as it has a toString()
 * @returns renders flatlist with items in data list
 */
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
