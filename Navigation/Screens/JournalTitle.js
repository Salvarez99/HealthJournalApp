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
  console.log('Journal data:' + journalData);
  useEffect(() => {
    
    fetchJournalData();
  }, []);

  const fetchJournalData = async () => {
    try {
      const data = await fetchJournalDataByJournalId(journalId);
      setJournalData(data);
    } catch (error) {
      console.error("Error fetching journal data:", error);
    }
  };

  const renderEntry = (entry) => {
    return (
      <>
        {entry.map((item, index) => (
          <React.Fragment key={index}>
            {item.symptomName && (
              <>
                <Text style={styles.sectionTitle}>Symptom</Text>
                <View style={styles.dateContainer}>
                  <Text>Name: {item.symptomName}</Text>
                  <Text>Start Date: {item.symptomStartDate}</Text>
                  <Text>End Date: {item.symptomEndDate}</Text>
                </View>
              </>
            )}

            {item.illnessName && (
              <>
                <Text style={styles.sectionTitle}>Illness</Text>
                <View style={styles.dateContainer}>
                  <Text>Name: {item.illnessName}</Text>
                  <Text>Start Date: {item.illnessStartDate}</Text>
                  <Text>End Date: {item.illnessEndDate}</Text>
                </View>
              </>
            )}

            {item.testName && (
              <>
                <Text style={styles.sectionTitle}>Test & Labwork</Text>
                <View style={styles.dateContainer}>
                <Text>Name: {item.testName}</Text>
                <Text>Date Occurred: {item.testDate}</Text>
                </View>
              </>
            )}
          </React.Fragment>
        ))}
      </>
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
          {renderIfExists(journalData)}
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