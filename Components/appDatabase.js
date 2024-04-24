import React, { useEffect, useState } from "react";
import { Text, View, TextInput, Button } from "react-native";
import firebase from "firebase/app";
import "firebase/database";
import firebaseConfig from "../firebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function appDatabase() {
  //stored using the useState
  const [appointments, setAppointments] = useState([]);
  const [illnesses, setIllnesses] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [testAndLabworks, setTestAndLabworks] = useState([]);
  const [userActivities, setUserActivities] = useState([]);

  useEffect(() => {
    const database = firebase.database();

    // Read appointments data
    const appointmentsRef = database.ref("Appointments");
    appointmentsRef.once("value", (snapshot) => {
      const appointmentsData = snapshot.val();
      if (appointmentsData) {
        const appointmentsList = Object.values(appointmentsData);
        setAppointments(appointmentsList);
      }
    });

    // Read illnesses data
    const illnessesRef = database.ref("Illnesses");
    illnessesRef.once("value", (snapshot) => {
      const illnessesData = snapshot.val();
      if (illnessesData) {
        const illnessesList = Object.values(illnessesData);
        setIllnesses(illnessesList);
      }
    });

    // Read medicines data
    const medicinesRef = database.ref("Medicine");
    medicinesRef.once("value", (snapshot) => {
      const medicinesData = snapshot.val();
      if (medicinesData) {
        const medicinesList = Object.values(medicinesData);
        setMedicines(medicinesList);
      }
    });

    // Read symptoms data
    const symptomsRef = database.ref("Symptom Checker");
    symptomsRef.once("value", (snapshot) => {
      const symptomsData = snapshot.val();
      if (symptomsData) {
        const symptomsList = Object.values(symptomsData);
        setSymptoms(symptomsList);
      }
    });

    // Read test and labworks data
    const testAndLabworksRef = database.ref("Test and Labworks");
    testAndLabworksRef.once("value", (snapshot) => {
      const testAndLabworksData = snapshot.val();
      if (testAndLabworksData) {
        const testAndLabworksList = Object.values(testAndLabworksData);
        setTestAndLabworks(testAndLabworksList);
      }
    });

    // Read user activities data
    const userActivitiesRef = database.ref("User Activity");
    userActivitiesRef.once("value", (snapshot) => {
      const userActivitiesData = snapshot.val();
      if (userActivitiesData) {
        const userActivitiesList = Object.values(userActivitiesData);
        setUserActivities(userActivitiesList);
      }
    });
  }, []);

  // Writes appointments data
  const writeAppointment = (data) => {
    const database = firebase.database();
    const ref = database.ref("Appointments");
    ref.push(data);
  };

  // Writes illnesses data
  const writeIllness = (data) => {
    const database = firebase.database();
    const ref = database.ref("Illnesses");
    ref.push(data);
  };

  // Writes medicines data
  const writeMedicine = (data) => {
    const database = firebase.database();
    const ref = database.ref("Medicine");
    ref.push(data);
  };

  // writes symptoms data
  const writeSymptom = (data) => {
    const database = firebase.database();
    const ref = database.ref("Symptom Checker");
    ref.push(data);
  };

  // writes test and labworks data
  const writeTest = (data) => {
    const database = firebase.database();
    const ref = database.ref("Test and Labworks");
    ref.push(data);
  };

  // Writes user activities data
  const writeUserActivity = (data) => {
    const database = firebase.database();
    const ref = database.ref("User Activity");
    ref.push(data);
  };

  return (
    <View>
      <Text>Appointments:</Text>
      {appointments.map((appointment, index) => (
        <View key={index}>
          <Text>Date: {appointment.Date}</Text>
          <Text>Name of appointment: {appointment["Name of appointment"]}</Text>
          <Text>Time: {appointment.Time}</Text>
        </View>
      ))}

      <Button
        title="Add Appointment"
        onPress={() => {
          const newAppointment = {
            Date: "New Date",
            "Name of appointment": "New Appointment",
            Time: "New Time",
          };
          writeAppointment(newAppointment);
        }}
      />

      <Text>Illnesses:</Text>
      {illnesses.map((illness, index) => (
        <View key={index}>
          <Text>Date started: {illness["Date started"]}</Text>
          <Text>Date ended: {illness["Date ended"]}</Text>
          <Text>Illness Name: {illness["Illness Name"]}</Text>
          <Text>Time started: {illness["Time started"]}</Text>
          <Text>Time ended: {illness["Time ended"]}</Text>
        </View>
      ))}

      <Button
        title="Add Illness"
        onPress={() => {
          const newIllness = {
            "Date started": "New Date started",
            "Date ended": "New Date ended",
            "Illness Name": "New Illness Name",
            "Time started": "New Time started",
            "Time ended": "New Time ended",
          };
          writeIllness(newIllness);
        }}
      />

      <Text>Medicine:</Text>
      {medicines.map((medicine, index) => (
        <View key={index}>
          <Text>Medicine Name: {medicine["Medicine Name"]}</Text>
          <Text>Dosage: {medicine["Dosage"]}</Text>
          <Text>Frequency: {medicine["Frequency"]}</Text>
        </View>
      ))}

      <Button
        title="Add Medicine"
        onPress={() => {
          const newMedicine = {
            "Medicine Name": "New Medicine Name",
            Dosage: "New Dosage",
            Frequency: "New Frequency",
          };
          writeMedicine(newMedicine);
        }}
      />

      <Text>Symptom Checker:</Text>
      {symptoms.map((symptom, index) => (
        <View key={index}>
          <Text>Date: {symptom["Date"]}</Text>
          <Text>Symptom Name: {symptom["Symptom Name"]}</Text>
          <Text>Time: {symptom["Time"]}</Text>
        </View>
      ))}

      <Button
        title="Add Symptom"
        onPress={() => {
          const newSymptom = {
            Date: "New Date",
            "Symptom Name": "New Symptom Name",
            Time: "New Time",
          };
          writeSymptom(newSymptom);
        }}
      />

      <Text>Test and Labworks:</Text>
      {testAndLabworks.map((test, index) => (
        <View key={index}>
          <Text>Date: {test["Date"]}</Text>
          <Text>Test or Lab Names: {test["Test or Lab Names"]}</Text>
          <Text>Time: {test["Time"]}</Text>
        </View>
      ))}

      <Button
        title="Add Test or Labwork"
        onPress={() => {
          const newTest = {
            Date: "New Date",
            "Test or Lab Names": "New Test or Lab Names",
            Time: "New Time",
          };
          writeTest(newTest);
        }}
      />

      <Text>User Activity:</Text>
      {userActivities.map((activity, index) => (
        <View key={index}>
          <Text>Date: {activity["Date"]}</Text>
          <Text>Journal Entry: {activity["Journal Entry"]}</Text>
          <Text>Time: {activity["Time"]}</Text>
        </View>
      ))}

      <Button
        title="Add User Activity"
        onPress={() => {
          const newUserActivity = {
            Date: "New Date",
            "Journal Entry": "New Journal Entry",
            Time: "New Time",
          };
          writeUserActivity(newUserActivity);
        }}
      />
    </View>
  );
}
