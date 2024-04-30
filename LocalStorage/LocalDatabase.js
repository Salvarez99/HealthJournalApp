<<<<<<< HEAD
import SQLite from 'react-native-sqlite-storage';
//Configures SQLite
SQLite.DEBUG(true); // enables debugging
SQLite.enablePromise(true);  //promise based async operations

let database;

const openData = async () => {
    try {
        database = await SQLite.openDatabase({ name: 'local.db', location: 'default' });
        //console.log('Database opened successfully');
        await createTables(); // Create tables if they don't exist
        //return database;
    } catch (error) {
        //console.error('Error opening database:', error);
        throw error;
    }
};

const closeData = async () =>{
    if (database) {
        database.close();
        //console.log('Database closed');
    }
};

const executeStatement = async (sql, params = []) => {
    if (!database) {
        throw new Error('Database not initialized');
    }

    try {
        const result = await new Promise((resolve, reject) => {
            database.transaction((tx) => {
                tx.executeSql(
                    sql,
                    params,
                    (_, result) => resolve(result),
                    (_, error) => reject(error)
                );
            });
        });
        return result;
    } catch (error) {
        console.error('Error executing statement:', error);
        //throw error;
    }
};

// Function to create tables
const createTables = async () => {
    try {
        await executeStatement(`
            CREATE TABLE IF NOT EXISTS Appointments (
                id INTEGER PRIMARY KEY,
                name TEXT,
                date TEXT,
                time_started TEXT,
                time_ended TEXT
            );
        `);
        await executeStatement(`
            CREATE TABLE IF NOT EXISTS Illnesses (
                id INTEGER PRIMARY KEY,
                illness_name TEXT,
                date_started TEXT,
                date_ended TEXT
            );
        `);
        await executeStatement(`
            CREATE TABLE IF NOT EXISTS Medicines (
                id INTEGER PRIMARY KEY,
                medicine_name TEXT,
                dosage TEXT,
                dosage_schedule TEXT,
                frequency TEXT
            );
        `);
        await executeStatement(`
            CREATE TABLE IF NOT EXISTS Symptom_Checker (
                id INTEGER PRIMARY KEY,
                symptom_name TEXT,
                start_date TEXT,
                end_date TEXT
            );
        `);
        await executeStatement(`
            CREATE TABLE IF NOT EXISTS Test_and_Labworks (
                id INTEGER PRIMARY KEY,
                test_lab_name TEXT,
                date TEXT
            );
        `);
        await executeStatement(`
            CREATE TABLE IF NOT EXISTS Journal_Entry (
                id INTEGER PRIMARY KEY,
                symptom_checker_id INTEGER,
                illness_id INTEGER,
                test_labworks_id INTEGER,
                FOREIGN KEY(symptom_checker_id) REFERENCES Symptom_Checker(id),
                FOREIGN KEY(illness_id) REFERENCES Illnesses(id),
                FOREIGN KEY(test_labworks_id) REFERENCES Test_and_Labworks(id)
            );
        `);
        console.log('Tables created successfully');
    } catch (error) {
        console.error('Error creating tables:', error);
    }
};



export { openData, closeData, createTables, executeStatement };
=======
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
            // Resolve if the illness table creation is successful
            console.log("Illness table created successfully");
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
          `SELECT * FROM journals;`,
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
>>>>>>> ff7054900c1f940391931997e5c8d21ef508f599
