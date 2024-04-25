import { openDatabase } from 'react-native-sqlite-storage';
import { readAppointments, readIllnesses, readMedicines, readSymptoms, readTestLabworks, readUserActivities } from './LocalDatabaseManager';

const fetchLocalData = () => {
  return new Promise((resolve, reject) => {
    openDatabase()
      .then(db => {
        db.transaction((txn) => {
          txn.executeSql(
            'SELECT * FROM Appointments',
            [],
            (_, results) => {
              const appointments = readAppointments(results.rows);
              txn.executeSql(
                'SELECT * FROM Illnesses',
                [],
                (_, results) => {
                  const illnesses = readIllnesses(results.rows);
                  txn.executeSql(
                    'SELECT * FROM Medicines',
                    [],
                    (_, results) => {
                      const medicines = readMedicines(results.rows);
                      txn.executeSql(
                        'SELECT * FROM Symptom_Checker',
                        [],
                        (_, results) => {
                          const symptomChecker = readSymptoms(results.rows);
                          txn.executeSql(
                            'SELECT * FROM Test_and_Labworks',
                            [],
                            (_, results) => {
                              const testAndLabworks = readTestLabworks(results.rows);
                              txn.executeSql(
                                'SELECT * FROM User_Activity',
                                [],
                                (_, results) => {
                                  const userActivity = readUserActivities(results.rows);
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
      })
      .catch(error => reject(error));
  });
};

export default fetchLocalData;