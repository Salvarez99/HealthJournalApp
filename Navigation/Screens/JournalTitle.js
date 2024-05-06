import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { fetchJournalDataByJournalId, addJournal } from "../../LocalStorage/LocalDatabase";
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
 

  useEffect(() => {
    
    fetchJournalData();
  }, []);

  const fetchJournalData = async () => {
    try {
      const entries = await fetchJournalEntries(); // Fetch all journal entries
      let foundEntry = null;
  
      for (let i = 0; i < entries.length; i++) {
        if (entries[i].id === journalId) { // match with passed journalID from journalScreen.js 
          foundEntry = entries[i]; // store journalId's entire row data into foundEntry
          break; 
        }
      }
  
      if (foundEntry) { // get symtom name, symtom star date, symtom end date, illness name, illness name, etc 
        setJournalData(foundEntry); // set data
      } else {
        setJournalData([]); // if we can't find matching one 
      }
    } catch (error) {
      console.error('Error fetching journal data:', error);
    }
  };


  const renderEntry = (entry) => {
    return (
      <View key={entry.id}>
        {entry.symptomName && (
          <View style={styles.entryContainer}>
            <Text>Name: {entry.symptomName}</Text>
            <Text>Start Date: {entry.symptomStartDate}</Text>
            <Text>End Date: {entry.symptomEndDate}</Text>
          </View>
        )}

        {entry.illnessName && (
          <View style={styles.entryContainer}>
            <Text>Name: {entry.illnessName}</Text>
            <Text>Start Date: {entry.illnessStartDate}</Text>
            <Text>End Date: {entry.illnessEndDate}</Text>
          </View>
        )}

        {entry.testName && (
          <View style={styles.entryContainer}>
            <Text>Name: {entry.testName}</Text>
            <Text>Date Occurred: {entry.testDate}</Text>
          </View>
        )}
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
        <Text style={styles.mainIdContainer}>
          Journal #{journalId}
        </Text>

       
        <View style={styles.innerContainer}>
        {journalData && renderEntry(journalData)}
        {/* render if exist */}
        </View>

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
    fontSize: 30,
    marginTop: 30,
    fontWeight: "bold",
    textAlign: "center",
    ...Platform.select({
      ios: {
        fontFamily: "Times New Roman",
      },
    }),
  },
  innerContainer: {
    marginTop: 10,
    marginBottom: 10,
    minHeight: 120,
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
    marginTop: 10,
    padding: 20,
    marginBottom: 40,
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