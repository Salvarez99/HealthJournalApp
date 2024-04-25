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
                date_started TEXT,
                date_ended TEXT,
                illness_name TEXT,
                time_started TEXT,
                time_ended TEXT
            );
        `);
        await executeStatement(`
            CREATE TABLE IF NOT EXISTS Medicines (
                id INTEGER PRIMARY KEY,
                dosage TEXT,
                dosage_schedule TEXT,
                frequency TEXT,
                medicine_name TEXT
            );
        `);
        await executeStatement(`
            CREATE TABLE IF NOT EXISTS Symptom_Checker (
                id INTEGER PRIMARY KEY,
                date TEXT,
                symptom_name TEXT,
                time TEXT
            );
        `);
        await executeStatement(`
            CREATE TABLE IF NOT EXISTS Test_and_Labworks (
                id INTEGER PRIMARY KEY,
                date TEXT,
                test_lab_name TEXT,
                time TEXT
            );
        `);
        await executeStatement(`
            CREATE TABLE IF NOT EXISTS User_Activity (
                id INTEGER PRIMARY KEY,
                date TEXT,
                journal_entry TEXT,
                time TEXT
            );
        `);
        console.log('Tables created successfully');
    } catch (error) {
        console.error('Error creating tables:', error);
    }
};

export { openData, closeData, createTables, executeStatement };