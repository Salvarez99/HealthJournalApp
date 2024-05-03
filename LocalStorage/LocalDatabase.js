import * as SQLite from 'expo-sqlite';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';

const db = SQLite.openDatabase('journal.db');
const medicineList = ["Motrin", "Ibuprofen",  "Benadryl", "Albuterol", "Motrin", "Epinephrine"];
const illnessList = ["Cold", "Flu", "Pneumonia", "Cancer", "Allergies", "Pink Eye"];
const symptomList = ["Cough", "Headache", "Sore Throat", "Back Pain", "Congestion", "Light Headedness"];
const testList = ["Bloodwork", "X-Ray", "Physical Exam", "Biopsy", "Blood Pressure", "Cholesterol"];

export const initializeDatabase = () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        // Create the appointments table
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS appointments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            eventName TEXT,
            eventDate TEXT,
            eventStartTime TEXT,
            eventEndTime TEXT
          );`,
          [],
          (_, result) => {
            // Resolve if the appointments table creation is successful
            console.log("Appointments table created successfully");
          },
          (_, error) => {
            reject(error); // Reject with the error if table creation fails
          }
        );
  
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS illness (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT
          );`,
          [],
          (_, result) => {
            console.log("Illness table created successfully");
            // Prepopulate the illness table with initial data
            tx.executeSql(
              `INSERT INTO illness (name) VALUES (?);`,
              [illnessList],
              
              (_, result) => {
                console.log("Illness prepopulated successfully");
              },
              (_, error) => {
                console.log("Error prepopulating illness table:", error);
              }
            );
          },
          (_, error) => {
            reject(error);
          }
        );

        // Create the symptom table
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS symptom (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT
          );`,
          [],
          (_, result) => {
            console.log("Symptom table created successfully");
            // Prepopulate the symptom table with initial data
            tx.executeSql(
              `INSERT INTO symptom (name) VALUES (?);`,
              [symptomList],
              
              (_, result) => {
                console.log("Symptom prepopulated successfully");
              },
              (_, error) => {
                console.log("Error prepopulating symptom table:", error);
              }
            );
          },
          (_, error) => {
            reject(error);
          }
        );

        // Create the test table
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS test (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT
          );`,
          [],
          (_, result) => {
            console.log("Test table created successfully");
          },
          (_, error) => {
            reject(error);
          }
        );

        // Create the medicine table
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS medicine (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT
          );`,
          [],
          (_, result) => {
            console.log("Medicine table created successfully");
            // Prepopulate the medicine table with initial data
            tx.executeSql(
              `INSERT INTO medicine (name) VALUES (?);`,
              [medicineList],
              
              (_, result) => {
                console.log("Medicine prepopulated successfully");
              },
              (_, error) => {
                console.log("Error prepopulating medicine table:", error);
              }
            );
          },
          (_, error) => {
            console.log("Error?");
            reject(error);
          }
        );


        // Create the journal table with foreign key constraints
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS journal (
            id INTEGER PRIMARY KEY,
            symptomName TEXT,
            symptomStartDate TEXT,
            symptomEndDate TEXT,
            illnessName TEXT,
            illnessStartDate TEXT,
            illnessEndDate TEXT,
            testName TEXT,
            testDate TEXT,
            FOREIGN KEY (illnessName) REFERENCES illness(name),
            FOREIGN KEY (symptomName) REFERENCES symptom(name),
            FOREIGN KEY (testName) REFERENCES test(name)
          );`,
          [],
          (_, result) => {
            console.log("Journal table modified successfully");
            resolve();
          },
          (_, error) => {
            reject(error);
          }
        );

        // Create the medicineEntry table with foreign key reference to medicine
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS medicineEntry (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            medicineId INTEGER,
            dosage TEXT,
            dosageSchedule TEXT,
            frequency TEXT,
            FOREIGN KEY (medicineId) REFERENCES medicine(id)
          );`,
          [],
          (_, result) => {
            console.log("MedicineEntry table created successfully");
            resolve();
          },
          (_, error) => {
            reject(error);
          }
        );

      }, null, resolve);
    });
};


// Create a new appointment
export const addAppointment = (eventName, eventDate, eventStartTime, eventEndTime) => {
  return new Promise((resolve, reject) => {
      db.transaction((tx) => {
          tx.executeSql(
              `INSERT INTO appointments (eventName, eventDate, eventStartTime, eventEndTime) VALUES (?, ?, ?, ?);`,
              [eventName, eventDate, eventStartTime, eventEndTime],
              (_, result) => {
                  console.log("Appointment added successfully");
                  resolve(result.insertId); // Resolve with the ID of the newly inserted appointment
              },
              (_, error) => {
                  reject(error); // Reject with the error if insertion fails
              }
          );
      });
  });
};

// Fetch all appointments
export const fetchAppointments = () => {
  return new Promise((resolve, reject) => {
      db.transaction((tx) => {
          tx.executeSql(
              `SELECT * FROM appointments;`,
              [],
              (_, result) => {
                  const appointments = result.rows._array;
                  resolve(appointments); // Resolve with the fetched appointments
              },
              (_, error) => {
                  reject(error); // Reject with the error if fetching fails
              }
          );
      });
  });
};

// Create a new journal entry
export const addJournalEntry = (symptomName, symptomStartDate, symptomEndDate, illnessName, illnessStartDate, illnessEndDate, testName, testDate) => {
  return new Promise((resolve, reject) => {
      db.transaction((tx) => {
          tx.executeSql(
              `INSERT INTO journal (symptomName, symptomStartDate, symptomEndDate, illnessName, illnessStartDate, illnessEndDate, testName, testDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
              [symptomName, symptomStartDate, symptomEndDate, illnessName, illnessStartDate, illnessEndDate, testName, testDate],
              (_, result) => {
                  console.log("Journal entry added successfully");
                  resolve(result.insertId); // Resolve with the ID of the newly inserted journal entry
              },
              (_, error) => {
                  reject(error); // Reject with the error if insertion fails
              }
          );
      });
  });
};

// Fetch all journal entries
export const fetchJournalEntries = () => {
  return new Promise((resolve, reject) => {
      db.transaction((tx) => {
          tx.executeSql(
              `SELECT * FROM journal;`,
              [],
              (_, result) => {
                  const journalEntries = result.rows._array;
                  resolve(journalEntries); // Resolve with the fetched journal entries
              },
              (_, error) => {
                  reject(error); // Reject with the error if fetching fails
              }
          );
      });
  });
};

// Create a new medicine entry
export const addMedicineEntry = (medicineId, dosage, dosageSchedule, frequency) => {
  return new Promise((resolve, reject) => {
      db.transaction((tx) => {
          tx.executeSql(
              `INSERT INTO medicineEntry (medicineId, dosage, dosageSchedule, frequency) VALUES (?, ?, ?, ?);`,
              [medicineId, dosage, dosageSchedule, frequency],
              (_, result) => {
                  console.log("Medicine entry added successfully");
                  resolve(result.insertId); // Resolve with the ID of the newly inserted medicine entry
              },
              (_, error) => {
                  reject(error); // Reject with the error if insertion fails
              }
          );
      });
  });
};

// Fetch all medicine entries
export const fetchMedicineEntries = () => {
  return new Promise((resolve, reject) => {
      db.transaction((tx) => {
          tx.executeSql(
              `SELECT * FROM medicineEntry;`,
              [],
              (_, result) => {
                  const medicineEntries = result.rows._array;
                  resolve(medicineEntries); // Resolve with the fetched medicine entries
              },
              (_, error) => {
                  reject(error); // Reject with the error if fetching fails
              }
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
              }
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
              }
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
                  reject(error); // Reject with the error if insertion fails
              }
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
              }
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
              }
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
              }
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
              }
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
              }
          );
      });
  });
};