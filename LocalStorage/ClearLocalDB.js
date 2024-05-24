import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("journal.db");

//Used to delete all user entries
export const clearUser = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM user;`,
        [],
        (_, result) => {
          // After deleting all records, reset the primary key sequence
          tx.executeSql(
            `DELETE FROM sqlite_sequence WHERE name = 'user';`,
            [],
            () => {
              // Resolve with the number of rows affected (should be 0 or more)
              resolve(result.rowsAffected);
              console.log("Rows deleted: ", result.rowsAffected);
            },
            (_, error) => {
              reject(error); // Reject with the error if resetting the sequence fails
            },
          );
        },
        (_, error) => {
          reject(error); // Reject with the error if deletion fails
        },
      );
    });
  });
};

//Used to delete all medicine entries
export const clearMedicineEntry = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM medicineEntry;`,
        [],
        (_, result) => {
          // After deleting all records, reset the primary key sequence
          tx.executeSql(
            `DELETE FROM sqlite_sequence WHERE name = 'medicineEntry';`,
            [],
            () => {
              // Resolve with the number of rows affected (should be 0 or more)
              resolve(result.rowsAffected);
            },
            (_, error) => {
              reject(error); // Reject with the error if resetting the sequence fails
            },
          );
        },
        (_, error) => {
          reject(error); // Reject with the error if deletion fails
        },
      );
    });
  });
};

//Clear illness table
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
            },
          );
        },
        (_, error) => {
          reject(error); // Reject with the error if deletion fails
        },
      );
    });
  });
};

//Clear symptom table
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
            },
          );
        },
        (_, error) => {
          reject(error); // Reject with the error if deletion fails
        },
      );
    });
  });
};

//Clear test table
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
            },
          );
        },
        (_, error) => {
          reject(error); // Reject with the error if deletion fails
        },
      );
    });
  });
};

//Clear medicine table
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
            },
          );
        },
        (_, error) => {
          reject(error); // Reject with the error if deletion fails
        },
      );
    });
  });
};

//Clear journal entry table
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
            },
          );
        },
        (_, error) => {
          reject(error); // Reject with the error if deletion fails
        },
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
            },
          );
        },
        (_, error) => {
          reject(error); // Reject with the error if deletion fails
        },
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
            },
          );
        },
        (_, error) => {
          reject(error); // Reject with the error if deletion fails
        },
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
            },
          );
        },
        (_, error) => {
          reject(error); // Reject with the error if deletion fails
        },
      );
    });
  });
};
