import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Keyboard,
  FlatList,
} from "react-native";

const dataList = [
  "Apple",
  "Banana",
  "Cherry",
  "Date",
  "Elderberry",
  "Fig",
  "Grape",
  "Honeydew",
];

const SearchOverlay = () => {
  const [query, setQuery] = useState("");
  const [isActive, setIsActive] = useState(false);

  // Filter dataList based on query
  const filteredList = query
    ? dataList.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <View
      style={{
        padding: 5,
        paddingBottom: 0,
        borderWidth: 1,
        borderBottomWidth: 0,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
      }}
    >
      {isActive ? (
        <View style={styles.overlay}>
          <TextInput
            autoFocus={true}
            style={styles.input}
            placeholder="Type here..."
            value={query}
            onChangeText={setQuery}
            onBlur={() => setIsActive(false)}
          />
          {/* Display the filtered list */}
          <FlatList
            data={filteredList}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Text style={styles.itemText}>{item}</Text>
            )}
          />
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => setIsActive(true)}
          style={styles.searchIcon}
        >
          <Text style={styles.iconText}>Search...</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchOverlay;

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    zIndex: 1,
  },
  input: {
    borderColor : 'gray',
    borderBottomWidth: 1,
  },
  overlayText: {
    fontSize: 16,
  },
  iconText: {
    fontSize: 16,
  },
});
