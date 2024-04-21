import { openDatabase } from 'react-native-sqlite-storage';
import { readAppointments, readIllnesses, readMedicines, readSymptomChecker, readTestAndLabworks, readUserActivity } from './LocalDatabaseManager';

const db = openDatabase({ name: 'local.db' });

const fetchLocalData = () => {
  return new Promise((resolve, reject) => {
    db.transaction((txn) => {
      txn.executeSql(
        'SELECT * FROM Appointments',
        [],
        (tx, results) => {
          const appointments = readAppointments(results);
          txn.executeSql(
            'SELECT * FROM Illnesses',
            [],
            (tx, results) => {
              const illnesses = readIllnesses(results);
              txn.executeSql(
                'SELECT * FROM Medicines',
                [],
                (tx, results) => {
                  const medicines = readMedicines(results);
                  txn.executeSql(
                    'SELECT * FROM SymptomChecker',
                    [],
                    (tx, results) => {
                      const symptomChecker = readSymptomChecker(results);
                      txn.executeSql(
                        'SELECT * FROM TestAndLabworks',
                        [],
                        (tx, results) => {
                          const testAndLabworks = readTestAndLabworks(results);
                          txn.executeSql(
                            'SELECT * FROM UserActivity',
                            [],
                            (tx, results) => {
                              const userActivity = readUserActivity(results);
                              resolve({
                                appointments,
                                illnesses,
                                medicines,
                                symptomChecker,
                                testAndLabworks,
                                userActivity,
                              });
                            },
                            (_, error) => reject(error)
                          );
                        },
                        (_, error) => reject(error)
                      );
                    },
                    (_, error) => reject(error)
                  );
                },
                (_, error) => reject(error)
              );
            },
            (_, error) => reject(error)
          );
        },
        (_, error) => reject(error)
      );
    });
  });
};

export default fetchLocalData;
