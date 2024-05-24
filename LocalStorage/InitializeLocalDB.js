import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("journal.db");

export const initializeDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        // Create the user table
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS user (
              uid TEXT PRIMARY KEY
          );`,
          [],
          (_, result) => {
            // Resolve if the user table creation is successful
            console.log("User table created successfully");
          },
          (_, error) => {
            reject(error); // Reject with the error if table creation fails
          },
        );

        // Create the appointments table used for calendar
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS appointments (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              uid TEXT,
              eventName TEXT,
              eventDate TEXT,
              eventStartTime TEXT,
              eventEndTime TEXT,
              FOREIGN KEY (uid) REFERENCES user(uid)
          );`,
          [],
          (_, result) => {
            // Resolve if the appointments table creation is successful
            console.log("Appointments table created successfully");
          },
          (_, error) => {
            reject(error); // Reject with the error if table creation fails
          },
        );

        //Create illness table
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
          },
        );

        //TODO: If broken indent again
        //Checks to see if table is already pre-populated with the illness data and if not calls populateIllnessTable
        tx.executeSql(
          `SELECT name FROM sqlite_master WHERE type='table' AND name='illness';`,
          [],
          (_, result) => {
            // Illness table does not exist, create table and populate it
            // Illness table exists, check if it's empty
            if (result.rows.length != 0) {
              tx.executeSql(
                `SELECT * FROM illness;`,
                [],
                (_, result) => {
                  // Illness table is empty, populate it
                  if (result.rows.length === 0) populateIllnessTable(tx);
                },
                (_, error) => {
                  reject(error);
                },
              );
            } else {
              console.log("Illness table doesn't exist?");
              resolve();
            }
          },
          (_, error) => {
            reject(error);
          }, //stop here
        );

        const populateIllnessTable = (tx) => {
          tx.executeSql(
            `INSERT INTO illness (name) VALUES (?), (?), (?), (?), (?), (?);`,
            ["Cold", "Flu", "Pneumonia", "Cancer", "Allergies", "Pink Eye"],
            (_, result) => {
              console.log("Illness prepopulated successfully");
            },
            (_, error) => {
              console.log("Error prepopulating illness table:", error);
            },
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
          },
        );

        //Checks to see if table is already pre-populated with the symptom data and if not calls populateSymptomTable
        tx.executeSql(
          `SELECT name FROM sqlite_master WHERE type='table' AND name='symptom';`,
          [],
          (_, result) => {
            if (result.rows.length != 0) {
              tx.executeSql(
                `SELECT * FROM symptom;`,
                [],
                (_, result) => {
                  if (result.rows.length === 0) {
                    // symptom table is empty, populate it
                    populateSymptomTable(tx);
                  }
                },
                (_, error) => {
                  reject(error);
                },
              );
            } else {
              console.log("symptom table doesn't exist?");
              resolve();
            }
          },
          (_, error) => {
            reject(error);
          },
        );

        const populateSymptomTable = (tx) => {
          tx.executeSql(
            `INSERT INTO symptom (name) VALUES (?), (?), (?), (?), (?), (?);`,
            [
              "Cough",
              "Headache",
              "Sore Throat",
              "Back Pain",
              "Congestion",
              "Light Headedness",
            ],
            (_, result) => {
              console.log("symptom prepopulated successfully");
            },
            (_, error) => {
              console.log("Error prepopulating symptom table:", error);
            },
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
            // Prepopulate the test table with initial data
            console.log("Test table created successfully");
          },
          (_, error) => {
            reject(error);
          },
        );

        //Checks to see if table is already pre-populated with the test data and if not calls populateTestTable
        tx.executeSql(
          `SELECT name FROM sqlite_master WHERE type='table' AND name='test';`,
          [],
          (_, result) => {
            // test table does not exist, create table and populate it
            // test table exists, check if it's empty
            if (result.rows.length != 0) {
              tx.executeSql(
                `SELECT * FROM test;`,
                [],
                (_, result) => {
                  // test table is empty, populate it
                  if (result.rows.length === 0) populateTestTable(tx);
                },
                (_, error) => {
                  reject(error);
                },
              );
            } else {
              console.log("Test table doesn't exist?");
              resolve();
            }
          },
          (_, error) => {
            reject(error);
          },
        );

        const populateTestTable = (tx) => {
          tx.executeSql(
            `INSERT INTO test (name) VALUES (?), (?), (?), (?), (?), (?);`,
            [
              "Bloodwork",
              "X-Ray",
              "Physical Exam",
              "Biopsy",
              "Blood Pressure",
              "Cholesterol",
            ],
            (_, result) => {
              console.log("Test prepopulated successfully");
            },
            (_, error) => {
              console.log("Error prepopulating test table:", error);
            },
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
          },
        );

        //Checks to see if table is already pre-populated with the medicine data and if not calls populateMedicineTable
        tx.executeSql(
          `SELECT name FROM sqlite_master WHERE type='table' AND name='medicine';`,
          [],
          (_, result) => {
            if (result.rows.length != 0) {
              tx.executeSql(
                `SELECT * FROM medicine;`,
                [],
                (_, result) => {
                  if (result.rows.length === 0) populateMedicineTable(tx);
                },
                (_, error) => {
                  reject(error);
                },
              );
            } else {
              console.log("Medicine table doesn't exist?");
              resolve();
            }
          },
          (_, error) => {
            reject(error);
          },
        );

        const populateMedicineTable = (tx) => {
          tx.executeSql(
            `INSERT INTO medicine (name) VALUES (?), (?), (?), (?), (?), (?);`,
            [
              "Motrin",
              "Ibuprofen",
              "Benadryl",
              "Albuterol",
              "Motrin",
              "Epinephrine",
            ],
            (_, result) => {
              console.log("Medicine prepopulated successfully");
            },
            (_, error) => {
              console.log("Error prepopulating medicine table:", error);
            },
          );
        };

        // Create the medicineEntry table with foreign key reference to medicine
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS medicineEntry (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              uid TEXT,
              medicineName TEXT,
              dosage TEXT,
              dosageSchedule TEXT,
              frequency TEXT,
              FOREIGN KEY (medicineName) REFERENCES medicine(name),
              FOREIGN KEY (uid) REFERENCES user(uid)
          );`,
          [],
          (_, result) => {
            console.log("MedicineEntry table created successfully");
            resolve();
          },
          (_, error) => {
            reject(error);
          },
        );

        //Create Journal Entry table to keep track of
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS journalEntry (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              uid TEXT,
              primaryDate TEXT,
              FOREIGN KEY (uid) REFERENCES user(uid)
          );`,
          [],
          (_, result) => {
            console.log("journalEntry Table Initialized Successfully");
            resolve();
          },
          (_, error) => {
            console.error("Error creating journalEntry Table:", error);
            reject(error);
          },
        );

        //Create userSymptom table to keep track of user entered journal data regarding symptoms
        //These userTables are connected by a JID Foreign Key to the JournalEntry table
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
          },
        );

        //Create userIllness table to keep track of user entered journal data regarding illnesses
        //These userTables are connected by a JID Foreign Key to the JournalEntry table
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
          },
        );

        //Create userTest table to keep track of user entered journal data regarding tests
        //These userTables are connected by a JID Foreign Key to the JournalEntry table
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
          },
        );
      },
      null,
      resolve,
    );
  });
};
