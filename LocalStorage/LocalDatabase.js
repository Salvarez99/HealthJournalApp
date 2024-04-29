import * as SQLite from 'expo-sqlite';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';

const db = SQLite.openDatabase('journal.db');

export const initializeDatabase = () => {
  // Initialize the database and create tables if they don't exist
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS appointments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        eventName TEXT,
        eventDate TEXT,
        eventStartTime TEXT,
        eventEndTime TEXT
      );`
    );
  });
  console.log("Table created I think???");
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