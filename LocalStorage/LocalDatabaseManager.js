import { executeStatement } from './LocalDatabase'


// Function to insert data into the Appointments table
const insertAppointment = async (appointment) => {
  const { name, date, time_started, time_ended } = appointment;
  const sql = `
      INSERT INTO Appointments (name, date, time_started, time_ended)
      VALUES (?, ?, ?, ?);
  `;
  try {
      await executeStatement(sql, [name, date, time_started, time_ended]);
      //console.log('Appointment inserted successfully');
  } catch (error) {
      console.error('Error inserting appointment:', error);
      throw error;
  }
};

// Function to get all appointments from the Appointments table
const getAppointments = async () => {
  const sql = 'SELECT * FROM Appointments;';
  try {
      const result = await executeStatement(sql);
      return result.rows.raw(); // Returns an array of rows
  } catch (error) {
      console.error('Error getting appointments:', error);
      return [];
  }
};

// Function to insert data into the Illnesses table
const insertIllness = async (illnessName, dateStarted, dateEnded) => {
  const sql = `
      INSERT INTO Illnesses (illness_name, date_started, date_ended)
      VALUES (?, ?, ?);
  `;
  try {
      await executeStatement(sql, [illnessName, dateStarted, dateEnded]);
      //console.log('Illness inserted successfully');
  } catch (error) {
      console.error('Error inserting illness:', error);
      throw error;
  }
};

// Function to get all illnesses from the Illnesses table
const getIllnesses = async () => {
  const sql = 'SELECT * FROM Illnesses;';
  try {
      const result = await executeStatement(sql);
      return result.rows.raw(); // Returns an array of rows
  } catch (error) {
      console.error('Error getting illnesses:', error);
      return [];
  }
};

// Function to insert data into the Medicines table
const insertMedicine = async (medicineName, dosage, dosageSchedule, frequency) => {
  const sql = `
      INSERT INTO Medicines (medicine_name, dosage, dosage_schedule, frequency)
      VALUES (?, ?, ?, ?);
  `;
  try {
      await executeStatement(sql, [medicineName, dosage, dosageSchedule, frequency]);
      //console.log('Medicine inserted successfully');
  } catch (error) {
      console.error('Error inserting medicine:', error);
      throw error;
  }
};

// Function to get all medicines from the Medicines table
const getMedicines = async () => {
  const sql = 'SELECT * FROM Medicines;';
  try {
      const result = await executeStatement(sql);
      return result.rows.raw(); // Returns an array of rows
  } catch (error) {
      console.error('Error getting medicines:', error);
      return [];
  }
};

// Function to insert data into the Symptom_Checker table
const insertSymptomChecker = async (symptomName, startDate, endDate) => {
  const sql = `
      INSERT INTO Symptom_Checker (symptom_name, start_date, end_date)
      VALUES (?, ?, ?);
  `;
  try {
      await executeStatement(sql, [symptomName, startDate, endDate]);
      console.log('Symptom checker entry inserted successfully');
  } catch (error) {
      console.error('Error inserting symptom checker entry:', error);
  }
};

// Function to get all entries from the Symptom_Checker table
const getSymptomCheckerEntries = async () => {
  const sql = 'SELECT * FROM Symptom_Checker;';
  try {
      const result = await executeStatement(sql);
      return result.rows.raw(); // Returns an array of rows
  } catch (error) {
      console.error('Error getting symptom checker entries:', error);
      return [];
  }
};

// Function to insert data into the Test_and_Labworks table
const insertTestLabwork = async (testLabName, date) => {
  const sql = `
      INSERT INTO Test_and_Labworks (test_lab_name, date)
      VALUES (?, ?);
  `;
  try {
      await executeStatement(sql, [testLabName, date]);
      //console.log('Test or lab work entry inserted successfully');
  } catch (error) {
      console.error('Error inserting test or lab work entry:', error);
  }
};

// Function to get all entries from the Test_and_Labworks table
const getTestLabworkEntries = async () => {
  const sql = 'SELECT * FROM Test_and_Labworks;';
  try {
      const result = await executeStatement(sql);
      return result.rows.raw(); // Returns an array of rows
  } catch (error) {
      console.error('Error getting test or lab work entries:', error);
      return [];
  }
};

// Function to insert data into the Journal_Entry table
const insertJournalEntry = async (symptomCheckerId, illnessId, testLabworksId) => {
  const sql = `
      INSERT INTO Journal_Entry (symptom_checker_id, illness_id, test_labworks_id)
      VALUES (?, ?, ?);
  `;
  try {
      await executeStatement(sql, [symptomCheckerId, illnessId, testLabworksId]);
      //console.log('Journal entry inserted successfully');
  } catch (error) {
      console.error('Error inserting journal entry:', error);
      throw error;
  }
};

// Function to get all journal entries from the Journal_Entry table
const getJournalEntries = async () => {
  const sql = 'SELECT * FROM Journal_Entry;';
  try {
      const result = await executeStatement(sql);
      return result.rows.raw(); // Returns an array of rows
  } catch (error) {
      console.error('Error getting journal entries:', error);
      return [];
  }
};

export {insertAppointment, getAppointments, insertIllness, getIllnesses, insertMedicine, getMedicines, 
  insertSymptomChecker, getSymptomCheckerEntries, insertTestLabwork, getTestLabworkEntries, insertJournalEntry, getJournalEntries};