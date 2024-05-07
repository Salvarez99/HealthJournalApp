/***************************************************************************************
 * Authors: Stephen Alvarez
 * Date: 5/1/2024
 * Code Version: 1.0
 * 
 * Description:
 *  Renders a button. When clicked expands into 3 buttons that are linked to respected modal forms
 * 
 * 
 ***************************************************************************************/
import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; //Vector Icons are used for button icons

/**
 * 
 * @param {List} modalComponents list of modalComponents, each item consist of {name, function}
 * @returns 
 */
export default function QuickAddButton({ modalComponents }) {
  const [showButtons, setShowButtons] = useState(false);

  const handleButtonPress = (openModal) => {
    setShowButtons(false); // Close the buttons when a modal is opened
    openModal(); // Open the selected modal
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => setShowButtons(!showButtons)}
      >
        <Ionicons
          name={showButtons ? "close" : "add"}
          size={30}
          color="white"
        />
      </TouchableOpacity>

      {/**If showButtons is true, render the buttons from the map of modal components */}
      {showButtons && (
        <View style={styles.buttonContainer}>
          {/**Create a button for each modalComponent in the map */}
          {modalComponents.map(({ name, openModal }, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuButton}
              onPress={() => handleButtonPress(openModal)}
            >
              <View style={styles.iconContainer}>
                <Ionicons name="add" size={30} color="white" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.buttonText}>{name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 70,
    left: 10,
  },
  menuButton: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: 30,
    width: 180,
    height: 60,
    justifyContent: "flex-start",
  },
  primaryButton: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: "#2c72a3",
    padding: 10,
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2c72a3",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textContainer: {
    backgroundColor: "#ddd",
    borderRadius: 5,
    marginLeft: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
  },
});
