import SQLite from 'react-native-sqlite-storage';

//Configures SQLite
SQLite.DEBUG(true); //enables debbugging
SQLite.enablePromise(true);  //promise based async operations

const databaseName = 'local.db';
let db;

/**
 * Opens a connection to the SQLite database.
 * Copies the database file from the app's bundle to the Library directory.
 * @returns {Promise<Database>} A promise that resolves with the database object if successful, or rejects with an error.
 */
export const openDatabase = () => {
  return new Promise((resolve, reject) => {
    // Open the database with the specified configuration
    db = SQLite.openDatabase(
      {
        name: databaseName,
        createFromLocation: '~local.db',
        location: 'Library',
      },
      // Success callback
      () => resolve(db),
      // Error callback
      (error) => reject(error)
    );
  });
};


/**
 * Closes the connection to the SQLite database if it is open.
 * Sets the database object to null after closing.
 */
export const closeDatabase = () => {
  if (db) {
    // Close the database connection
    db.close();
    // Set the database object to null
    db = null;
  }
};


/**
 * Writes an appointment record to the Appointments table in the SQLite database.
 * @param {Object} data - The appointment data to be inserted (date, name, time_started, time_ended).
 * @returns {Promise} A promise that resolves with the insertion result if successful, or rejects with an error.
 */
export const writeAppointment = (data) => {
    return new Promise((resolve, reject) => {
        // Start a database transaction
        db.transaction((tx) => {
            // Execute SQL to insert data into the Appointments table
            tx.executeSql(
                'INSERT INTO Appointments (date, name, time_started, time_ended) VALUES (?, ?, ?, ?)',
                [data.date, data.name, data.time_started, data.time_ended], // Insertion values
                (_, result) => resolve(result),     // Success callback
                (_, error) => reject(error)         // Error callback
            );
        });
    });
};

  

/**
 * Reads all appointment records from the Appointments table in the SQLite database.
 * @returns {Promise} A promise that resolves with the appointment records if successful, or rejects with an error.
 */
export const readAppointments = () => {
    return new Promise((resolve, reject) => {
        // Start a database transaction
        db.transaction((tx) => {
            // Execute SQL to select all records from the Appointments table
            tx.executeSql(
                'SELECT * FROM Appointments',
                [],                              // No parameters needed for select
                (_, { rows }) => resolve(rows.raw()), // Success callback to return the raw result
                (_, error) => reject(error)           // Error callback
            );
        });
    });
};

  

  /**
   * Writes an illness record to the Illnesses table in the SQLite database.
   * @param {Object} data - The illness data to be inserted (date_started, date_ended, illness_name, time_started, time_ended).
   * @returns {Promise} A promise that resolves with the insertion result if successful, or rejects with an error.
   */
  export const writeIllness = (data) => {
    return new Promise((resolve, reject) => {
      // Start a database transaction
      db.transaction((tx) => {
        // Execute SQL to insert data into the Illnesses table
        tx.executeSql(
          'INSERT INTO Illnesses (date_started, date_ended, illness_name, time_started, time_ended) VALUES (?, ?, ?, ?, ?)',
          [data.date_started, data.date_ended, data.illness_name, data.time_started, data.time_ended], // Insertion values
          (_, result) => resolve(result),     // Success callback
          (_, error) => reject(error)         // Error callback
        );
      });
    });
  };
  

  /**
   * Reads all illness records from the Illnesses table in the SQLite database.
   * @returns {Promise} A promise that resolves with the illness records if successful, or rejects with an error.
   */
  export  const readIllnesses = () => {
    return new Promise((resolve, reject) => {
      // Start a database transaction
      db.transaction((tx) => {
        // Execute SQL to select all records from the Illnesses table
        tx.executeSql(
          'SELECT * FROM Illnesses',
          [],                              // No parameters needed for select
          (_, { rows }) => resolve(rows.raw()), // Success callback to return the raw result
          (_, error) => reject(error)           // Error callback
        );
      });
    });
  };
  

/**
 * Writes a medicine record to the Medicines table in the SQLite database.
 * @param {Object} data - The medicine data to be inserted (dosage, dosage_schedule, frequency, medicine_name).
 * @returns {Promise} A promise that resolves with the insertion result if successful, or rejects with an error.
 */
export const writeMedicine = (data) => {
    return new Promise((resolve, reject) => {
      // Start a database transaction
      db.transaction((tx) => {
        // Execute SQL to insert data into the Medicines table
        tx.executeSql(
          'INSERT INTO Medicines (dosage, dosage_schedule, frequency, medicine_name) VALUES (?, ?, ?, ?)',
          [data.dosage, data.dosage_schedule, data.frequency, data.medicine_name], // Insertion values
          (_, result) => resolve(result),     // Success callback
          (_, error) => reject(error)         // Error callback
        );
      });
    });
};
  
  /**
   * Reads all medicine records from the Medicines table in the SQLite database.
   * @returns {Promise} A promise that resolves with the medicine records if successful, or rejects with an error.
   */
  export  const readMedicines = () => {
    return new Promise((resolve, reject) => {
      // Start a database transaction
      db.transaction((tx) => {
        // Execute SQL to select all records from the Medicines table
        tx.executeSql(
          'SELECT * FROM Medicines',
          [],                              // No parameters needed for select
          (_, { rows }) => resolve(rows.raw()), // Success callback to return the raw result
          (_, error) => reject(error)           // Error callback
        );
      });
    });
  };
  

  /**
   * Writes a symptom record to the Symptom_Checker table in the SQLite database.
   * @param {Object} data - The symptom data to be inserted (date, symptom_name, time).
   * @returns {Promise} A promise that resolves with the insertion result if successful, or rejects with an error.
   */
  export   const writeSymptom = (data) => {
    return new Promise((resolve, reject) => {
      // Start a database transaction
      db.transaction((tx) => {
        // Execute SQL to insert data into the Symptom_Checker table
        tx.executeSql(
          'INSERT INTO Symptom_Checker (date, symptom_name, time) VALUES (?, ?, ?)',
          [data.date, data.symptom_name, data.time], // Insertion values
          (_, result) => resolve(result),     // Success callback
          (_, error) => reject(error)         // Error callback
        );
      });
    });
  };
  

  /**
   * Reads all symptom records from the Symptom_Checker table in the SQLite database.
   * @returns {Promise} A promise that resolves with the symptom records if successful, or rejects with an error.
   */
  export  const readSymptoms = () => {
    return new Promise((resolve, reject) => {
      // Start a database transaction
      db.transaction((tx) => {
        // Execute SQL to select all records from the Symptom_Checker table
        tx.executeSql(
          'SELECT * FROM Symptom_Checker',
          [],                              // No parameters needed for select
          (_, { rows }) => resolve(rows.raw()), // Success callback to return the raw result
          (_, error) => reject(error)           // Error callback
        );
      });
    });
  };
  

  /**
 * Writes a test or labwork record to the Test_and_Labworks table in the SQLite database.
 * @param {Object} data - The test or labwork data to be inserted (date, test_lab_name, time).
 * @returns {Promise} A promise that resolves with the insertion result if successful, or rejects with an error.
 */
  export const writeTestLabwork = (data) => {
    return new Promise((resolve, reject) => {
      // Start a database transaction
      db.transaction((tx) => {
        // Execute SQL to insert data into the Test_and_Labworks table
        tx.executeSql(
          'INSERT INTO Test_and_Labworks (date, test_lab_name, time) VALUES (?, ?, ?)',
          [data.date, data.test_lab_name, data.time], // Insertion values
          (_, result) => resolve(result),     // Success callback
          (_, error) => reject(error)         // Error callback
        );
      });
    });
  };
  

  /**
   * Reads all test and labwork records from the Test_and_Labworks table in the SQLite database.
   * @returns {Promise} A promise that resolves with the test and labwork records if successful, or rejects with an error.
   */
  export const readTestLabworks = () => {
    return new Promise((resolve, reject) => {
      // Start a database transaction
      db.transaction((tx) => {
        // Execute SQL to select all records from the Test_and_Labworks table
        tx.executeSql(
          'SELECT * FROM Test_and_Labworks',
          [],                              // No parameters needed for select
          (_, { rows }) => resolve(rows.raw()), // Success callback to return the raw result
          (_, error) => reject(error)           // Error callback
        );
      });
    });
  };
  

  /**
   * Writes a user activity record to the User_Activity table in the SQLite database.
   * @param {Object} data - The user activity data to be inserted (date, journal_entry, time).
   * @returns {Promise} A promise that resolves with the insertion result if successful, or rejects with an error.
   */
  export const writeUserActivity = (data) => {
    return new Promise((resolve, reject) => {
      // Start a database transaction
      db.transaction((tx) => {
        // Execute SQL to insert data into the User_Activity table
        tx.executeSql(
          'INSERT INTO User_Activity (date, journal_entry, time) VALUES (?, ?, ?)',
          [data.date, data.journal_entry, data.time], // Insertion values
          (_, result) => resolve(result),     // Success callback
          (_, error) => reject(error)         // Error callback
        );
      });
    });
  };
  

  /**
   * Reads all user activity records from the User_Activity table in the SQLite database.
   * @returns {Promise} A promise that resolves with the user activity records if successful, or rejects with an error.
   */
  export const readUserActivities = () => {
    return new Promise((resolve, reject) => {
      // Start a database transaction
      db.transaction((tx) => {
        // Execute SQL to select all records from the User_Activity table
        tx.executeSql(
          'SELECT * FROM User_Activity',
          [],                              // No parameters needed for select
          (_, { rows }) => resolve(rows.raw()), // Success callback to return the raw result
          (_, error) => reject(error)           // Error callback
        );
      });
    });
  };
  