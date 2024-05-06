import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';

const db = SQLite.openDatabase('journal.db');
/*
const medicineList = ["Motrin", "Ibuprofen",  "Benadryl", "Albuterol", "Motrin", "Epinephrine"];
const illnessList = ["Cold", "Flu", "Pneumonia", "Cancer", "Allergies", "Pink Eye"];
const symptomList = ["Cough", "Headache", "Sore Throat", "Back Pain", "Congestion", "Light Headedness"];
const testList = ["Bloodwork", "X-Ray", "Physical Exam", "Biopsy", "Blood Pressure", "Cholesterol"];
*/
export const initializeDatabase = () => {
    return new Promise((resolve, reject) => {
      
      //
      //const checkAndPreloadData = async () => {
      db.transaction((tx) => {
        // Create the appointments table
        /*
        tx.executeSql(
          `DROP TABLE IF EXISTS journal;`,
          [],
          (_, result) => {
              console.log("Journal table deleted successfully");
              resolve();
          },
          (_, error) => {
              reject(error);
          }
      );
*/
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
          },
          (_, error) => {
              reject(error);
          }
      );
      
        tx.executeSql(
          `SELECT name FROM sqlite_master WHERE type='table' AND name='illness';`,
          [],
          (_, result) => {
              if (result.rows.length != 0) {
                tx.executeSql(
                  `SELECT * FROM illness;`,
                  [],
                  (_, result) => {
                    if(result.rows.length === 0){
                          // Illness table is empty, populate it
                          populateIllnessTable(tx);
                    }
                  },
                  (_, error) => {
                      reject(error);
                  }
              );
                  // Illness table does not exist, create table and populate it
                  // Illness table exists, check if it's empty
                  
              }
              else {
                console.log("Illness table doesn't exist?");
                resolve();
            }

          },
          (_, error) => {
              reject(error);
          }
      );

const populateIllnessTable = (tx) => {
tx.executeSql(
  `INSERT INTO illness (name) VALUES (?), (?), (?), (?), (?), (?);`,
  ["Cold","Flu","Pneumonia","Cancer","Allergies","Pink Eye"],
  (_, result) => {
      console.log("Illness prepopulated successfully");
  },
  (_, error) => {
      console.log("Error prepopulating illness table:", error);
  }
);
};

tx.executeSql(
  `CREATE TABLE IF NOT EXISTS symptom (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT
  );`,
  [],
  (_, result) => {
      console.log("Symptom table created successfully");
  },
  (_, error) => {
      reject(error);
  }
);

tx.executeSql(
  `SELECT name FROM sqlite_master WHERE type='table' AND name='symptom';`,
  [],
  (_, result) => {
      if (result.rows.length != 0) {
        tx.executeSql(
          `SELECT * FROM symptom;`,
          [],
          (_, result) => {
            if(result.rows.length === 0){
                  // symptom table is empty, populate it
                  populateSymptomTable(tx);
            }
          },
          (_, error) => {
              reject(error);
          }
      );
          // symptom table does not exist, create table and populate it
          // symptom table exists, check if it's empty
          
      }
      else {
        console.log("symptom table doesn't exist?");
        resolve();
    }

  },
  (_, error) => {
      reject(error);
  }
);

const populateSymptomTable = (tx) => {
tx.executeSql(
`INSERT INTO symptom (name) VALUES (?), (?), (?), (?), (?), (?);`,
["Cough", "Headache", "Sore Throat", "Back Pain", "Congestion", "Light Headedness"],
(_, result) => {
console.log("symptom prepopulated successfully");
},
(_, error) => {
console.log("Error prepopulating symptom table:", error);
}
);
};

        // Create the test table
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS test (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT
          );`,
          [],
          (_, result) => {
              console.log("Test table created successfully");
              // Prepopulate the test table with initial data
          },
          (_, error) => {
              reject(error);
          }
      );
      
        tx.executeSql(
          `SELECT name FROM sqlite_master WHERE type='table' AND name='test';`,
          [],
          (_, result) => {
              if (result.rows.length != 0) {
                tx.executeSql(
                  `SELECT * FROM test;`,
                  [],
                  (_, result) => {
                    if(result.rows.length === 0){
                          // test table is empty, populate it
                          populateTestTable(tx);
                    }
                  },
                  (_, error) => {
                      reject(error);
                  }
              );
                  // test table does not exist, create table and populate it
                  // test table exists, check if it's empty
                  
              }
              else {
                console.log("Test table doesn't exist?");
                resolve();
            }

          },
          (_, error) => {
              reject(error);
          }
      );

const populateTestTable = (tx) => {
tx.executeSql(
  `INSERT INTO test (name) VALUES (?), (?), (?), (?), (?), (?);`,
  ["Bloodwork", "X-Ray", "Physical Exam", "Biopsy", "Blood Pressure", "Cholesterol"],
  (_, result) => {
      console.log("Test prepopulated successfully");
  },
  (_, error) => {
      console.log("Error prepopulating test table:", error);
  }
);
};


        // Create the medicine table
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS medicine (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT
          );`,
          [],
          (_, result) => {
              console.log("Medicine table created successfully");
              
          },
          (_, error) => {
              reject(error);
          }
      );
      
        tx.executeSql(
          `SELECT name FROM sqlite_master WHERE type='table' AND name='medicine';`,
          [],
          (_, result) => {
              if (result.rows.length != 0) {
                tx.executeSql(
                  `SELECT * FROM medicine;`,
                  [],
                  (_, result) => {
                    if(result.rows.length === 0){
                          
                          populateMedicineTable(tx);
                    }
                  },
                  (_, error) => {
                      reject(error);
                  }
              );
                  
              }
              else {
                console.log("Medicine table doesn't exist?");
                resolve();
            }

          },
          (_, error) => {
              reject(error);
          }
      );

const populateMedicineTable = (tx) => {
tx.executeSql(
  `INSERT INTO medicine (name) VALUES (?), (?), (?), (?), (?), (?);`,
  ["Motrin", "Ibuprofen",  "Benadryl", "Albuterol", "Motrin", "Epinephrine"],
  (_, result) => {
      console.log("Medicine prepopulated successfully");
  },
  (_, error) => {
      console.log("Error prepopulating medicine table:", error);
  }
);
};


        // Create the journal table with foreign key constraints test
        /*
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS journal (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            JID INTEGER,
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
            FOREIGN KEY (testName) REFERENCES test(name),
            FOREIGN KEY (JID) REFERENCES journalEntry(id)
          );`,
          [],
          (_, result) => {
            console.log("Journal table initialized successfully");
            resolve();
          },
          (_, error) => {
            console.log("Error creating journal table", error);
            reject(error);
          }
        );
        */
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

        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS journalEntry (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            primaryDate TEXT);`,
          [],
          (_, result) => {
            console.log("journalEntry Table Initialized Successfully");
            resolve();
          },
          (_, error) => {
            reject(error);
          }
        );

        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS userSymptom (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            JID INTEGER,
            symptomName TEXT,
            symptomStartDate TEXT,
            symptomEndDate TEXT,
            FOREIGN KEY (JID) REFERENCES journalEntry(id),
            FOREIGN KEY (symptomName) REFERENCES symptom(name)
            );`,
          [],
          (_, result) => {
            console.log("userSymptom Table Initialized Successfully");
            resolve();
          },
          (_, error) => {
            reject(error);
          }
        );

        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS userIllness (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            JID INTEGER,
            illnessName TEXT,
            illnessStartDate TEXT,
            illnessEndDate TEXT,
            FOREIGN KEY (JID) REFERENCES journalEntry(id),
            FOREIGN KEY (illnessName) REFERENCES illness(name)
            );`,
          [],
          (_, result) => {
            console.log("userIllness Table Initialized Successfully");
            resolve();
          },
          (_, error) => {
            reject(error);
          }
        );

        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS userTest (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            JID INTEGER,
            testName TEXT,
            testDate TEXT,
            FOREIGN KEY (JID) REFERENCES journalEntry(id),
            FOREIGN KEY (testName) REFERENCES test(name)
            );`,
          [],
          (_, result) => {
            console.log("userTest Table Initialized Successfully");
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

export const addJournalEntry = (primaryDate) => {
  return new Promise((resolve, reject) => {
      db.transaction((tx) => {
          tx.executeSql(
              `INSERT INTO journalEntry (primaryDate) VALUES (?);`,
              [primaryDate],
              (_, result) => {
                  console.log("Entry Added Successfully");
                  resolve(result.insertId); // Resolve with the ID of the newly inserted journalEntry
              },
              (_, error) => {
                  reject(error); // Reject with the error if insertion fails
              }
          );
      });
  });
};

export const fetchJournalEntries = () => {
  return new Promise((resolve, reject) => {
      db.transaction((tx) => {
          tx.executeSql(
              `SELECT * FROM journalEntry;`,
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
export const addJournal = (symptomName, symptomStartDate, symptomEndDate, illnessName, illnessStartDate, illnessEndDate, testName, testDate, JID) => {
  return new Promise((resolve, reject) => {
      db.transaction((tx) => {
          tx.executeSql(
              `INSERT INTO journal (symptomName, symptomStartDate, symptomEndDate, illnessName, illnessStartDate, illnessEndDate, testName, testDate, JID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
              [symptomName, symptomStartDate, symptomEndDate, illnessName, illnessStartDate, illnessEndDate, testName, testDate, JID],
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
export const fetchJournals = () => {
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

export const fetchJournalDataByJournalId = (journalId) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM journal WHERE JID = ?;`,
        [journalId],
        (_, result) => {
          const journalData = result.rows._array;
          resolve(journalData); // Resolve with the fetched journal data
        },
        (_, error) => {
          reject(error); // Reject with the error if fetching fails
        }
      );
    });
  });
};

export const clearIllness = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM illness;`,
        [],
        (_, result) => {
          // After deleting all records, reset the primary key sequence
          tx.executeSql(
            `DELETE FROM sqlite_sequence WHERE name = 'illness';`,
            [],
            () => {
              // Resolve with the number of rows affected (should be 0 or more)
              resolve(result.rowsAffected);
            },
            (_, error) => {
              reject(error); // Reject with the error if resetting the sequence fails
            }
          );
        },
        (_, error) => {
          reject(error); // Reject with the error if deletion fails
        }
      );
    });
  });
};

export const clearSymptom = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM symptom;`,
        [],
        (_, result) => {
          // After deleting all records, reset the primary key sequence
          tx.executeSql(
            `DELETE FROM sqlite_sequence WHERE name = 'symptom';`,
            [],
            () => {
              // Resolve with the number of rows affected (should be 0 or more)
              resolve(result.rowsAffected);
            },
            (_, error) => {
              reject(error); // Reject with the error if resetting the sequence fails
            }
          );
        },
        (_, error) => {
          reject(error); // Reject with the error if deletion fails
        }
      );
    });
  });
};

export const clearTest = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM test;`,
        [],
        (_, result) => {
          // After deleting all records, reset the primary key sequence
          tx.executeSql(
            `DELETE FROM sqlite_sequence WHERE name = 'test';`,
            [],
            () => {
              // Resolve with the number of rows affected (should be 0 or more)
              resolve(result.rowsAffected);
            },
            (_, error) => {
              reject(error); // Reject with the error if resetting the sequence fails
            }
          );
        },
        (_, error) => {
          reject(error); // Reject with the error if deletion fails
        }
      );
    });
  });
};

export const clearMedicine = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM medicine;`,
        [],
        (_, result) => {
          // After deleting all records, reset the primary key sequence
          tx.executeSql(
            `DELETE FROM sqlite_sequence WHERE name = 'medicine';`,
            [],
            () => {
              // Resolve with the number of rows affected (should be 0 or more)
              resolve(result.rowsAffected);
            },
            (_, error) => {
              reject(error); // Reject with the error if resetting the sequence fails
            }
          );
        },
        (_, error) => {
          reject(error); // Reject with the error if deletion fails
        }
      );
    });
  });
};

export const clearJournalEntry = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM journalEntry;`,
        [],
        (_, result) => {
          // After deleting all records, reset the primary key sequence
          tx.executeSql(
            `DELETE FROM sqlite_sequence WHERE name = 'journalEntry';`,
            [],
            () => {
              // Resolve with the number of rows affected (should be 0 or more)
              resolve(result.rowsAffected);
            },
            (_, error) => {
              reject(error); // Reject with the error if resetting the sequence fails
            }
          );
        },
        (_, error) => {
          reject(error); // Reject with the error if deletion fails
        }
      );
    });
  });
};

export const clearJournal = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM journal;`,
        [],
        (_, result) => {
          // After deleting all records, reset the primary key sequence
          tx.executeSql(
            `DELETE FROM sqlite_sequence WHERE name = 'journal';`,
            [],
            () => {
              // Resolve with the number of rows affected (should be 0 or more)
              resolve(result.rowsAffected);
            },
            (_, error) => {
              reject(error); // Reject with the error if resetting the sequence fails
            }
          );
        },
        (_, error) => {
          reject(error); // Reject with the error if deletion fails
        }
      );
    });
  });
};

//Add/Insert functions for User tables
export const addUserSymptom = (JID, symptomName, symptomStartDate, symptomEndDate) => {
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
        }
      );
    });
  });
};

export const addUserIllness = (JID, illnessName, illnessStartDate, illnessEndDate) => {
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
        }
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
        }
      );
    });
  });
};

//Clear Functions for User tables
export const clearUserSymptom = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM userSymptom;`,
        [],
        (_, result) => {
          // After deleting all records, reset the primary key sequence
          tx.executeSql(
            `DELETE FROM sqlite_sequence WHERE name = 'userSymptom';`,
            [],
            () => {
              // Resolve with the number of rows affected (should be 0 or more)
              resolve(result.rowsAffected);
            },
            (_, error) => {
              reject(error); // Reject with the error if resetting the sequence fails
            }
          );
        },
        (_, error) => {
          reject(error); // Reject with the error if deletion fails
        }
      );
    });
  });
};

export const clearUserIllness = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM userIllness;`,
        [],
        (_, result) => {
          // After deleting all records, reset the primary key sequence
          tx.executeSql(
            `DELETE FROM sqlite_sequence WHERE name = 'userIllness';`,
            [],
            () => {
              // Resolve with the number of rows affected (should be 0 or more)
              resolve(result.rowsAffected);
            },
            (_, error) => {
              reject(error); // Reject with the error if resetting the sequence fails
            }
          );
        },
        (_, error) => {
          reject(error); // Reject with the error if deletion fails
        }
      );
    });
  });
};

export const clearUserTest = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM userTest;`,
        [],
        (_, result) => {
          // After deleting all records, reset the primary key sequence
          tx.executeSql(
            `DELETE FROM sqlite_sequence WHERE name = 'userTest';`,
            [],
            () => {
              // Resolve with the number of rows affected (should be 0 or more)
              resolve(result.rowsAffected);
            },
            (_, error) => {
              reject(error); // Reject with the error if resetting the sequence fails
            }
          );
        },
        (_, error) => {
          reject(error); // Reject with the error if deletion fails
        }
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
        }
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
        }
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
        }
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
              }
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
              }
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
              }
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
        }
      );
    });
  });
};