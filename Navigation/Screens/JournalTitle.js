import React from "react";
import { Ionicons } from "@expo/vector-icons";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { useAnimatedGestureHandler } from "react-native-reanimated";

//Goal : Distinguish between different type of entries ( symptom, illness, test and labworks) from fetched data.
// display details + exit button ( go back to journalscreen.js )

export default function JournalTitle({ route, navigation }) {
  const { arryOfAppointmentInfo } = route.params; // used navigation parameter to get data from journalscreen.js // citation needed
  // citation for route.params : https://reactnavigation.org/docs/params/

  // used switch statement to display symtop, illness and test and labwork.
  // citation for switch statement : https://simplefrontend.com/switch-statement-in-react/
  const renderEntry = (entry, araytype) => {
    switch (araytype) {
      case "Symptom":
        return (
          <>
            <View sytle={styles.entryContainer}>
              <Text style={styles.entryTitle}>Symptom Name: {entry.name}</Text>
              <Text syle={styles.entryDate}>
                Start Date: {entry.startDate} End Date: {entry.endDate}
              </Text>
            </View>
          </>
        );
      case "Illness":
        return (
          <>
            <View sytle={styles.entryContainer}>
              <Text style={styles.entryTitle}>Illness Name: {entry.name} </Text>
              <Text syle={styles.entryDate}>
                Start Date: {entry.startDate} End Date: {entry.endDate}
              </Text>
            </View>
          </>
        );
      case "TestsAndLabWorks":
        return (
          <>
            <View sytle={styles.entryContainer}>
              <Text style={styles.entryTitle}>
                Test & Labwork Name: {entry.name}
              </Text>
              <Text syle={styles.entryDate}>
                Date Occurred: {entry.dateOccurred}
              </Text>
            </View>
          </>
        );
      default:
        return null;
    }
    // end of switch
  };

  // Method to render entry if it exists
  //ciation for for loop idea : https://stackoverflow.com/questions/42519800/how-to-loop-and-render-elements-in-react-native , https://www.delftstack.com/howto/react/react-native-for-loop/

  const renderIfExists = (data, arraytype) => {
    // if data array is not null, iterate over with for loop and render each index value
    if (data && data.length > 0) {
      const renderedItems = [];
      for (let i = 0; i < data.length; i++) {
        renderedItems.push(
          <React.Fragment key={i}>
            {renderEntry(data[i], arraytype)}
          </React.Fragment>
        ); // end of push
      }

      return renderedItems;
    }
    //else
    return null;
  };

  //  Check if arrayOfAppointmentInfo exists
  const checkPassedInfo = (arryOfAppointmentInfo) => {
    if (!arryOfAppointmentInfo) {
      return <Text>No information available</Text>;
    }
  };

  // citation https://legacy.reactjs.org/docs/fragments.html, <React.Fragment> same as <> </>
  // https://www.knowledgehut.com/blog/web-development/understanding-react-fragments#should-i-use-react-fragments?%C2%A0
  return (
    <ScrollView>
      <View style={styles.container}>
        {/*call const checkpassedinfo to check wehther array is undefined or not. */}
        {checkPassedInfo(arryOfAppointmentInfo)}

        <Text style={styles.mainIdContainer}>
          Journal {arryOfAppointmentInfo.id.toString()}
        </Text>
        {/* Render Symptoms */}
        <Text style={styles.sectionTitle}>Symptom</Text>
        <View style={styles.innerContainer}>
          {renderIfExists(arryOfAppointmentInfo.Symptom, "Symptom")}
        </View>

        {/* Render Illnesses */}
        <Text style={styles.sectionTitle}>Illnesses</Text>
        <View style={styles.innerContainer}>
          {renderIfExists(arryOfAppointmentInfo.Illness, "Illness")}
        </View>

        {/* Render Tests & Labworks */}
        <Text style={styles.sectionTitle}>Tests & Labworks</Text>
        <View style={styles.innerContainer}>
          {renderIfExists(
            arryOfAppointmentInfo.TestsAndLabWorks,
            "TestsAndLabWorks"
          )}
        </View>

        {/* Exit Button */}
        <TouchableOpacity
          style={styles.exitButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="exit-outline" size={24} color="lightblue" />
          <Text style={styles.exitButtonText}>Exit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  mainIdContainer: {
    // display Journal #number
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 50,
    alignContent: "center", // vertically
    textAlign: "center", // center horizontally
    ...Platform.select({
      ios: {
        fontFamily: "Times New Roman", // Set font family to Times New Roman
      },
    }),
  },
  innerContainer: {
    marginTop: 10,
    marginBottom: 10,
    minHeight: 120, // min hight
  },

  sectionTitle: {
    // display gray box symtom, illness, test and labworks.
    backgroundColor: "lightgray",
    padding: 10,
    borderRadius: 10,
    textAlign: "center",

    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    ...Platform.select({
      ios: {
        fontFamily: "Times New Roman", // Set font family to Times New Roman
      },
    }),
  },
  entryContainer: {
    marginTop: 10,
    padding: 20,
    justifyContent: "center",
    //minHeight: 300, // set minimum height

    fontFamily: "Times New Roman",
    marginBottom: 40,

    ...Platform.select({
      ios: {
        fontFamily: "Times New Roman", // Set font family to Times New Roman
      },
    }),
    
  },
  entryTitle: {
    fontSize: 16,
    paddingTop: 10,
    ...Platform.select({
      ios: {
        fontFamily: "Times New Roman", // Set font family to Times New Roman
      },
    }),
  },
  entryDate: {
    fontSize: 18,
    marginTop: 10,
    ...Platform.select({
      ios: {
        fontFamily: "Times New Roman", // Set font family to Times New Roman
      },
    }),
  },
  exitButton: {
    position: "absolute",
    bottom: -30,
    right: 20,
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    minWidth: 60,
    zIndex: 1,
    marginBottom: 50,
    
  },

  exitButtonText: {
    color: "white",
    fontSize: 16,
    ...Platform.select({
      ios: {
        fontFamily: "Times New Roman", // Set font family to Times New Roman
      },
    }),
  },
});
