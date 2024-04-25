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
      //console.error('Error inserting appointment:', error);
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
const insertIllness = async (dateStarted, dateEnded, illnessName, timeStarted, timeEnded) => {
  const sql = `
      INSERT INTO Illnesses (date_started, date_ended, illness_name, time_started, time_ended)
      VALUES (?, ?, ?, ?, ?);
  `;
  try {
      await executeStatement(sql, [dateStarted, dateEnded, illnessName, timeStarted, timeEnded]);
      console.log('Illness inserted successfully');
  } catch (error) {
      console.error('Error inserting illness:', error);
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

export {insertAppointment, getAppointments, insertIllness, getIllnesses};