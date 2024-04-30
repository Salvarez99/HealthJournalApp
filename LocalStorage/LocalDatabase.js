import * as SQLite from 'expo-sqlite';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';

const db = SQLite.openDatabase('journal.db');

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
  
        // Create the illness table
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS journal (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            symptomName TEXT,
            symptomStartDate TEXT,
            symptomEndDate TEXT,
            illnessName TEXT,
            illnessStartDate TEXT,
            illnessEndDate TEXT,
            testName TEXT,
            testDate TEXT
          );`,
          [],
          (_, result) => {
            // Resolve if the Journal table creation is successful
            console.log("Journal table created successfully");
          },
          (_, error) => {
            reject(error); // Reject with the error if table creation fails
          }
        );
  
        // Create the medicine table
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS medicine (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            dosage TEXT,
            dosageSchedule TEXT,
            frequency TEXT
          );`,
          [],
          (_, result) => {
            // Resolve if the medicine table creation is successful
            console.log("Medicine table created successfully");
          },
          (_, error) => {
            reject(error); // Reject with the error if table creation fails
          }
        );
      }, null, resolve);
    });
  };

export const addAppointment = (eventName, eventDate, eventStartTime, eventEndTime) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO appointments (eventName, eventDate, eventStartTime, eventEndTime) VALUES (?, ?, ?, ?);`,
          [eventName, eventDate, eventStartTime, eventEndTime],
          (_, result) => {
            console.log("Insert Successful ID: ", result.insertId)
            resolve(result.insertId); // Resolve with the ID of the newly inserted appointment
          },
          (_, error) => {
            reject(error); // Reject with the error if insertion fails
          }
        );
      });
    });
  };

  export const addMedicine = (name, dosage, dosageSchedule, frequency) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO medicine (name, dosage, dosageSchedule, frequency) VALUES (?, ?, ?, ?);`,
          [name, dosage, dosageSchedule, frequency],
          (_, result) => {
            console.log("Insert Successful ID: ", result.insertId)
            resolve(result.insertId); // Resolve with the ID of the newly inserted medicine
          },
          (_, error) => {
            reject(error); // Reject with the error if insertion fails
          }
        );
      });
    });
  };

  export const addJournal = (symptomName, symptomStartDate, symptomEndDate, illnessName, illnessStartDate, illnessEndDate, testName, testDate) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO journal (symptomName, symptomStartDate, symptomEndDate, illnessName, illnessStartDate, illnessEndDate, testName, testDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
          [symptomName, symptomStartDate, symptomEndDate, illnessName, illnessStartDate, illnessEndDate, testName, testDate],
          (_, result) => {
            console.log("Insert Successful ID: ", result.insertId)
            resolve(result.insertId); // Resolve with the ID of the newly inserted journal
          },
          (_, error) => {
            reject(error); // Reject with the error if insertion fails
          }
        );
      });
    });
  };

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


  export const fetchMedications = () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM medications;`,
          [],
          (_, result) => {
            const medications = result.rows._array;
            resolve(medications); // Resolve with the fetched appointments
          },
          (_, error) => {
            reject(error); // Reject with the error if fetching fails
          }
        );
      });
    });
  };

  export const fetchJournals = () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM journal;`,
          [],
          (_, result) => {
            const journals = result.rows._array;
            resolve(journals); // Resolve with the fetched appointments
          },
          (_, error) => {
            reject(error); // Reject with the error if fetching fails
          }
        );
      });
    });
  };

  export const clearAppointments = () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `DELETE FROM appointments;`,
          [],
          (_, result) => {
            // After deleting all records, reset the primary key sequence
            tx.executeSql(
              `DELETE FROM sqlite_sequence WHERE name = 'appointments';`,
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

  export const clearJournals = () => {
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

  export const clearMedications = () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `DELETE FROM medications;`,
          [],
          (_, result) => {
            // After deleting all records, reset the primary key sequence
            tx.executeSql(
              `DELETE FROM sqlite_sequence WHERE name = 'medications';`,
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


const exportDb = async () => {
    if (Platform.OS === "android") {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(
          FileSystem.documentDirectory + 'SQLite/test.db',
          {
            encoding: FileSystem.EncodingType.Base64
          }
        );

        await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, 'test.db', 'application/octet-stream')
        .then(async (uri) => {
          await FileSystem.writeAsStringAsync(uri, base64, { encoding : FileSystem.EncodingType.Base64 });
        })
        .catch((e) => console.log(e));
      } else {
        console.log("Permission not granted");
      }
    } else {
      await Sharing.shareAsync(FileSystem.documentDirectory + 'SQLite/test.db');
    }
  }