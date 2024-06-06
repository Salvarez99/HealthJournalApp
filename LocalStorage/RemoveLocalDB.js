import { db } from "./InitializeLocalDB";

export const removeUserJournals = (uid) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM journalEntry WHERE uid = ?",
        [uid],
        (tx, result) => {
          resolve(result);
        },
        (tx, error) => {
          reject(error);
        },
      );
    });
  });
};

export const removeUserAppointments = (uid) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM appointments WHERE uid = ?",
        [uid],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          console.log("Issue in removal");  
          reject(error);
        },
      );
    });
  });
};

export const removeUserMedications = (uid) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM medicineEntry WHERE uid = ?",
        [uid],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        },
      );
    });
  });
};
