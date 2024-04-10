import {
    openDatabase,
    closeDatabase,
    writeAppointment,
    readAppointments,
    writeIllness,
    readIllnesses,
    writeMedicine,
    readMedicines,
    writeSymptom,
    readSymptoms,
    writeTestLabwork,
    readTestLabworks,
    writeUserActivity,
    readUserActivities,
  } from './database';
  
  describe('SQLite Database Operations', () => {
    beforeAll(async () => {
      await openDatabase(); // Open the SQLite database before running tests
    });
  
    afterAll(() => {
      closeDatabase(); // Close the SQLite database after running tests
    });

    /**
 * Test for writing and reading appointments to and from the database.
 */
test('Write and Read Appointments', async () => {
    // Define appointment data
    const appointmentData = { date: '2024-03-30', name: 'Dentist', time: '10:00 AM' };
    // Write appointment to the database
    await writeAppointment(appointmentData);
    // Read appointments from the database
    const appointments = await readAppointments();
    // Expect the appointments to contain the appointment data
    expect(appointments).toContainEqual(expect.objectContaining(appointmentData));
  });
  
  /**
   * Test for writing and reading illnesses to and from the database.
   */
  test('Write and Read Illnesses', async () => {
    // Define illness data
    const illnessData = { date_started: '2024-03-20', date_ended: '2024-03-25', illness_name: 'Flu', time_started: '10:00 AM', time_ended: '11:00 AM' };
    // Write illness to the database
    await writeIllness(illnessData);
    // Read illnesses from the database
    const illnesses = await readIllnesses();
    // Expect the illnesses to contain the illness data
    expect(illnesses).toContainEqual(expect.objectContaining(illnessData));
  });
  
  /**
   * Test for writing and reading medicines to and from the database.
   */
  test('Write and Read Medicines', async () => {
    // Define medicine data
    const medicineData = { dosage: '10 mg', frequency: 'Twice a day', medicine_name: 'Aspirin' };
    // Write medicine to the database
    await writeMedicine(medicineData);
    // Read medicines from the database
    const medicines = await readMedicines();
    // Expect the medicines to contain the medicine data
    expect(medicines).toContainEqual(expect.objectContaining(medicineData));
  });
  
  /**
   * Test for writing and reading symptoms to and from the database.
   */
  test('Write and Read Symptoms', async () => {
    // Define symptom data
    const symptomData = { date: '2024-03-20', symptom_name: 'Fever', time: '10:00 AM' };
    // Write symptom to the database
    await writeSymptom(symptomData);
    // Read symptoms from the database
    const symptoms = await readSymptoms();
    // Expect the symptoms to contain the symptom data
    expect(symptoms).toContainEqual(expect.objectContaining(symptomData));
  });
  
  /**
   * Test for writing and reading test and labworks to and from the database.
   */
  test('Write and Read Test and Labworks', async () => {
    // Define test and labwork data
    const testLabworkData = { date: '2024-03-20', test_lab_name: 'Blood test', time: '10:00 AM' };
    // Write test and labwork to the database
    await writeTestLabwork(testLabworkData);
    // Read test and labworks from the database
    const testLabworks = await readTestLabworks();
    // Expect the test and labworks to contain the test and labwork data
    expect(testLabworks).toContainEqual(expect.objectContaining(testLabworkData));
  });
  
  /**
   * Test for writing and reading user activities to and from the database.
   */
  test('Write and Read User Activities', async () => {
    // Define user activity data
    const userActivityData = { date: '2024-03-20', journal_entry: 'Went for a walk', time: '10:00 AM' };
    // Write user activity to the database
    await writeUserActivity(userActivityData);
    // Read user activities from the database
    const userActivities = await readUserActivities();
    // Expect the user activities to contain the user activity data
    expect(userActivities).toContainEqual(expect.objectContaining(userActivityData));
  });  
});