import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("journal.db");

// Create a new user
export const addUser = (uid) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO user (uid) VALUES (?)`,
        [uid],
        (_, result) => {
          console.log("User added successfully");
          console.log(`User details - uid: ${uid}`);
          resolve(result.insertId);
        },
        (_, error) => {
          console.error("Error adding user:", error);
          reject(error);
        },
      );
    });
  });
};

// Create a new appointment
export const addAppointment = (
  uid,
  eventName,
  eventDate,
  eventStartTime,
  eventEndTime,
) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO appointments (uid, eventName, eventDate, eventStartTime, eventEndTime) VALUES (?, ?, ?, ?, ?);`,
        [uid, eventName, eventDate, eventStartTime, eventEndTime],
        (_, result) => {
          console.log("Appointment added successfully");
          console.log(
            `Appointment Details - Name: ${eventName}, Date: ${eventDate}, Start Time: ${eventStartTime}, End Time: ${eventEndTime}`,
          );

          resolve(result.insertId); // Resolve with the ID of the newly inserted appointment
        },
        (_, error) => {
          console.error("Error adding appointment:", error);
          reject(error); // Reject with the error if insertion fails
        },
      );
    });
  });
};

//Create new journalEntry, created when user presses save on the AddJournalInputForm
export const addJournalEntry = (uid, primaryDate) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO journalEntry (uid, primaryDate) VALUES (?,?);`,
        [uid, primaryDate],
        (_, result) => {
          console.log("Entry Added Successfully");
          resolve(result.insertId); // Resolve with the ID of the newly inserted journalEntry
        },
        (_, error) => {
          reject(error); // Reject with the error if insertion fails
        },
      );
    });
  });
};

// Create a new medicine entry
export const addMedicineEntry = (
  uid,
  medicineName,
  dosage,
  dosageSchedule,
  frequency,
) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO medicineEntry (uid, medicineName, dosage, dosageSchedule, frequency) VALUES (?, ?, ?, ?, ?);`,
        [uid, medicineName, dosage, dosageSchedule, frequency],
        (_, result) => {
          console.log("Medicine entry added successfully");
          resolve(result.insertId); // Resolve with the ID of the newly inserted medicine entry
        },
        (_, error) => {
          reject(error); // Reject with the error if insertion fails
        },
      );
    });
  });
};

// Create a new illness
export const addIllness = (name) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO illness (name) VALUES (?);`,
        [name],
        (_, result) => {
          console.log("Illness added successfully");
          resolve(result.insertId); // Resolve with the ID of the newly inserted illness
        },
        (_, error) => {
          reject(error); // Reject with the error if insertion fails
        },
      );
    });
  });
};

// Create a new symptom
export const addSymptom = (name) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO symptom (name) VALUES (?);`,
        [name],
        (_, result) => {
          console.log("Symptom added successfully");
          resolve(result.insertId); // Resolve with the ID of the newly inserted symptom
        },
        (_, error) => {
          console.log(
            "error with add symptom Name: ",
            name,
            "Type:",
            typeof name,
          );
          reject(error); // Reject with the error if insertion fails
        },
      );
    });
  });
};

// Create a new test
export const addTest = (name) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO test (name) VALUES (?);`,
        [name],
        (_, result) => {
          console.log("Test added successfully");
          resolve(result.insertId); // Resolve with the ID of the newly inserted test
        },
        (_, error) => {
          reject(error); // Reject with the error if insertion fails
        },
      );
    });
  });
};

// Create a new medicine
export const addMedicine = (name) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO medicine (name) VALUES (?);`,
        [name],
        (_, result) => {
          console.log("Medicine added successfully");
          resolve(result.insertId); // Resolve with the ID of the newly inserted medicine
        },
        (_, error) => {
          reject(error); // Reject with the error if insertion fails
        },
      );
    });
  });
};

//Add/Insert functions for User tables
export const addUserSymptom = (
  JID,
  symptomName,
  symptomStartDate,
  symptomEndDate,
) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO userSymptom (JID, symptomName, symptomStartDate, symptomEndDate) VALUES (?, ?, ?, ?)`,
        [JID, symptomName, symptomStartDate, symptomEndDate],
        (_, result) => {
          console.log("Symptom added successfully");
          resolve(result.insertId); // Return the ID of the newly inserted row
        },
        (_, error) => {
          console.error("Error adding symptom:", error);
          reject(error);
        },
      );
    });
  });
};

export const addUserIllness = (
  JID,
  illnessName,
  illnessStartDate,
  illnessEndDate,
) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO userIllness (JID, illnessName, illnessStartDate, illnessEndDate) VALUES (?, ?, ?, ?)`,
        [JID, illnessName, illnessStartDate, illnessEndDate],
        (_, result) => {
          console.log("Illness added successfully");
          resolve(result.insertId); // Return the ID of the newly inserted row
        },
        (_, error) => {
          console.error("Error adding userIllness:", error);
          reject(error);
        },
      );
    });
  });
};

export const addUserTest = (JID, testName, testDate) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO userTest (JID, testName, testDate) VALUES (?, ?, ?)`,
        [JID, testName, testDate],
        (_, result) => {
          console.log("Test added successfully");
          resolve(result.insertId); // Return the ID of the newly inserted row
        },
        (_, error) => {
          console.error("Error adding userTest:", error);
          reject(error);
        },
      );
    });
  });
};
