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

const closeData = () => {
    if (database) {
        database.close();
        //console.log('Database closed');
    }
};

const executeStatement = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                sql,
                params,
                (_, result) => resolve(result),
                (_, error) => reject(error)
            );
        });
    });
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
                date_ended TEXT,
            );
        `);
        await executeStatement(`
            CREATE TABLE IF NOT EXISTS Medicines (
                id INTEGER PRIMARY KEY,
                medicine_name TEXT
                dosage TEXT,
                dosage_schedule TEXT,
                frequency TEXT,
                
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