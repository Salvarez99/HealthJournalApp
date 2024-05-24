import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("journal.db");

// Fetch all users
export const fetchUser = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM user;`,
        [],
        (_, result) => {
          const user = result.rows._array;
          resolve(user); // Resolve with the fetched users
        },
        (_, error) => {
          reject(error); // Reject with the error if fetching fails
        },
      );
    });
  });
};

// Fetch all appointments
export const fetchAppointments = (uid) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM appointments WHERE uid = ?;`,
        [uid],
        (_, result) => {
          const appointments = result.rows._array;
          resolve(appointments); // Resolve with the fetched appointments
        },
        (_, error) => {
          reject(error); // Reject with the error if fetching fails
        },
      );
    });
  });
};

//Fetch all journal Entries for specific user
export const fetchJournalEntries = (uid) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM journalEntry WHERE uid = ?;`,
        [uid],
        (_, result) => {
          const journal = result.rows._array; //Id, uid , Date
          // console.log("Fetched journal entries:", journal); // Log fetched appointments
          resolve(journal); // Resolve with the fetched appointments
        },
        (_, error) => {
          console.error("Error fetching journal entries:", error); // Log fetch error
          reject(error); // Reject with the error if fetching fails
        },
      );
    });
  });
};

// Fetch all medicine entries
export const fetchMedicineEntries = (uid) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM medicineEntry WHERE uid = ?;`,
        [uid],
        (_, result) => {
          const medicineEntries = result.rows._array;
          resolve(medicineEntries); // Resolve with the fetched medicine entries
          // console.log(medicineEntries);
        },
        (_, error) => {
          reject(error); // Reject with the error if fetching fails
        },
      );
    });
  });
};

// Fetch all illnesses
export const fetchIllnesses = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM illness;`,
        [],
        (_, result) => {
          const illnesses = result.rows._array;
          resolve(illnesses); // Resolve with the fetched illnesses
        },
        (_, error) => {
          reject(error); // Reject with the error if fetching fails
        },
      );
    });
  });
};

// Fetch all symptoms
export const fetchSymptoms = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM symptom;`,
        [],
        (_, result) => {
          const symptoms = result.rows._array;
          resolve(symptoms); // Resolve with the fetched symptoms
        },
        (_, error) => {
          reject(error); // Reject with the error if fetching fails
        },
      );
    });
  });
};

// Fetch all tests
export const fetchTests = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM test;`,
        [],
        (_, result) => {
          const tests = result.rows._array;
          resolve(tests); // Resolve with the fetched tests
        },
        (_, error) => {
          reject(error); // Reject with the error if fetching fails
        },
      );
    });
  });
};

// Fetch all medicines
export const fetchMedicines = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM medicine;`,
        [],
        (_, result) => {
          const medicines = result.rows._array;
          resolve(medicines); // Resolve with the fetched medicines
        },
        (_, error) => {
          reject(error); // Reject with the error if fetching fails
        },
      );
    });
  });
};

//Fetch by JID functions, returns array of row objects that share the given JID
export const fetchUserSymptomByJournalId = (journalId) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM userSymptom WHERE JID = ?;`,
        [journalId],
        (_, result) => {
          const symptomData = result.rows._array;
          resolve(symptomData); // Resolve with the fetched journal data
        },
        (_, error) => {
          reject(error); // Reject with the error if fetching fails
        },
      );
    });
  });
};

export const fetchUserIllnessByJournalId = (journalId) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM userIllness WHERE JID = ?;`,
        [journalId],
        (_, result) => {
          const illnessData = result.rows._array;
          resolve(illnessData); // Resolve with the fetched journal data
        },
        (_, error) => {
          reject(error); // Reject with the error if fetching fails
        },
      );
    });
  });
};

export const fetchUserTestByJournalId = (journalId) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM userTest WHERE JID = ?;`,
        [journalId],
        (_, result) => {
          const testData = result.rows._array;
          resolve(testData); // Resolve with the fetched journal data
        },
        (_, error) => {
          reject(error); // Reject with the error if fetching fails
        },
      );
    });
  });
};

//Fetch all Functions for the 3 User Tables, returns array of row objects
export const fetchUserSymptom = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM userSymptom;`,
        [],
        (_, result) => {
          const userSymptoms = result.rows._array;
          resolve(userSymptoms); // Resolve with the fetched medicines
        },
        (_, error) => {
          reject(error); // Reject with the error if fetching fails
        },
      );
    });
  });
};

export const fetchUserIllness = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM userIllness;`,
        [],
        (_, result) => {
          const userIllnesses = result.rows._array;
          resolve(userIllnesses); // Resolve with the fetched medicines
        },
        (_, error) => {
          reject(error); // Reject with the error if fetching fails
        },
      );
    });
  });
};

export const fetchUserTest = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM userTest;`,
        [],
        (_, result) => {
          const userTests = result.rows._array;
          resolve(userTests); // Resolve with the fetched medicines
        },
        (_, error) => {
          reject(error); // Reject with the error if fetching fails
        },
      );
    });
  });
};

//Returns the latest journalEntry, might be useful for AddJournalEntryForm logic
export const fetchLatestJournalEntry = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM journalEntry ORDER BY id DESC LIMIT 1`,
        [],
        (_, { rows }) => {
          const latestEntry = rows.item(0); // Retrieve the first (and only) item from the result set
          console.log("Latest Journal Entry:", latestEntry);
          resolve(latestEntry);
        },
        (_, error) => {
          console.error("Error fetching latest journal entry:", error);
          reject(error);
        },
      );
    });
  });
};

//Returns the latest journalEntry, might be useful for AddJournalEntryForm logic
export const fetchLatestJournalEntryJID = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT id FROM journalEntry ORDER BY id DESC LIMIT 1`,
        [],
        (_, { rows }) => {
          if (rows.length > 0) {
            const latestJID = rows.item(0).id; // Retrieve the JID from the first (and only) row
            console.log("Latest Journal Entry JID:", latestJID);
            resolve(latestJID);
          } else {
            resolve(null); // If no rows found, resolve with null
          }
        },
        (_, error) => {
          console.error("Error fetching latest journal entry JID:", error);
          reject(error);
        },
      );
    });
  });
};
