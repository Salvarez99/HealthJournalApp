import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  fetchUserIllnessByJournalId,
  fetchUserSymptomByJournalId,
  fetchUserTestByJournalId,
  fetchUserSymptom,
} from "../../LocalStorage/LocalDatabase";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";

export default function JournalTitle({ route, navigation }) {
  const { journalId } = route.params;
  const [journalData, setJournalData] = useState([]); //empty list
  const [symptomData, setSymptomData] = useState([]);
  const [illnessData, setIllnessData] = useState([]);
  const [testData, setTestData] = useState([]);
 // call fecthJournalData() to start fetching
  useFocusEffect(
    useCallback(() => {
      fetchJournalData();
    }, [])
  );
  // fetch list of symptm data, illness data, test data and print in consol
  useEffect(() => {
    console.log("Symptom Data:", symptomData);
    console.log("Illness Data:", illnessData);
    console.log("Test Data:", testData);
  }, [symptomData, illnessData, testData]);

  const fetchJournalData = async () => {
    try {
      const fetchedSymptoms = await fetchUserSymptomByJournalId(journalId);  // call defined fetching function
      const fetchedIllnesses = await fetchUserIllnessByJournalId(journalId);
      const fetchedTests = await fetchUserTestByJournalId(journalId);

      setSymptomData(fetchedSymptoms);
      setIllnessData(fetchedIllnesses);
      setTestData(fetchedTests);

      console.log(symptomData);
      console.log(illnessData);
      console.log(testData);
    } catch (error) {
      console.error("Error fetching journal data:", error);
    }
  };
// use each of entries from list of symtomp, illness, test and use map to display each entry.
  const renderEntry = (symptomEntries, illnessEntries, testEntries) => {
    return (
      <View key={journalId}>
        {/* Symptom Section */}
        <Text style={styles.sectionTitle}>Symptoms</Text>
        <View style={styles.innerContainer}>
          {symptomEntries.map((symptomEntry) => (
            <View style={styles.entryContainer} key={symptomEntry.id}>
              <Text>{symptomEntry.symptomName}</Text>
              <View style={styles.dateContainer}>
                <Text>Start Date: {symptomEntry.symptomStartDate}</Text>
                <Text>End Date: {symptomEntry.symptomEndDate}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={{ height: 1, backgroundColor: 'black', width: '100%' }}></View> 

        {/* Illness Section */}
        <Text style={styles.sectionTitle}>Illnesses</Text>
        <View style={styles.innerContainer}>
          {illnessEntries.map((illnessEntry) => (
            <View style={styles.entryContainer} key={illnessEntry.id}>
              <Text>{illnessEntry.illnessName}</Text>
              <View style={styles.dateContainer}>
                <Text>Start Date: {illnessEntry.illnessStartDate}</Text>
                <Text>End Date: {illnessEntry.illnessEndDate}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={{ height: 1, backgroundColor: 'black', width: '100%' }}></View> 

        {/* Test Section */}
        <Text style={styles.sectionTitle}>Tests</Text>
        <View style={styles.innerContainer}>
          {testEntries.map((testEntry) => (
            <View style={styles.entryContainer} key={testEntry.id}>
              <Text>{testEntry.testName}</Text>
              <Text>Date Occurred: {testEntry.testDate}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderIfExists = (data) => {
    if (!data || data.length === 0) {
      return <Text>No information available</Text>;
    }

    const groupedData = groupDataByJID(data);

    return (
      <>
        {Object.keys(groupedData).map((jid, index) => (
          <React.Fragment key={index}>
            <Text style={styles.sectionTitle}>Journal #{jid}</Text>
            <View style={styles.innerContainer}>
              {renderEntry(groupedData[jid])}
            </View>
          </React.Fragment>
        ))}
      </>
    );
  };

  const groupDataByJID = (data) => {
    const groupedData = {};
    data.forEach((entry) => {
      const jid = entry.JID;
      if (groupedData[jid]) {
        groupedData[jid].push(entry);
      } else {
        groupedData[jid] = [entry];
      }
    });
    return groupedData;
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <Text style={styles.mainIdContainer}>Journal #{journalId}</Text> */}

        <View style={styles.innerContainer}>
          {renderEntry(symptomData, illnessData, testData)}
          {/* render if exist */}
        </View>
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
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    ...Platform.select({
      ios: {
        fontFamily: "Times New Roman",
      },
    }),
  },
  innerContainer: {
    minHeight: 80,
  },
  sectionTitle: {
    padding: 10,
    marginTop: 20,
    borderBottomWidth: 1,
    fontSize: 20,
    fontWeight: "bold",
    ...Platform.select({
      ios: {
        fontFamily: "Times New Roman",
      },
    }),
  },
  entryContainer: {
    padding: 5,
    justifyContent: "center",
    ...Platform.select({
      ios: {
        fontFamily: "Times New Roman",
      },
    }),
  },
  entryTitle: {
    fontSize: 16,
    paddingTop: 10,
    ...Platform.select({
      ios: {
        fontFamily: "Times New Roman",
      },
    }),
  },
  dateContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
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
        fontFamily: "Times New Roman",
      },
    }),
  },
});
