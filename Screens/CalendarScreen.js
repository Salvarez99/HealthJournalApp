import React from "react";
import { StyleSheet, Text, View, Platform, Button } from "react-native";

export default function CalendarScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>I am the CalendarScreen!</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Go to Home Screen"
          onPress={() => navigation.navigate("Home")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === 'ios' ? 30 : 0,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
});
