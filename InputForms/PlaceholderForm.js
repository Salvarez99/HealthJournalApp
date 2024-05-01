/***************************************************************************************
 * Authors: Stephen Alvarez
 * Date: 5/1/2024
 * Code Version: 1.0
 * 
 * Description:
 * A template for forms, can be used to start building a form
 * 
 * 
 ***************************************************************************************/
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PlaceholderForm = ({ isVisible, onClose }) => {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text>This is a placeholder form</Text>
        <Text>Enter your appointment details here</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalFormContent: {
    height: 50,
    backgroundColor: "white",
    width: "100%",
    height: "90%",
    padding: 18,
    paddingTop: 5,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  closeButton: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'lightblue',
  },
});

export default PlaceholderForm;
