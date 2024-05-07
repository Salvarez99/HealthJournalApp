import firestore from '@react-native-firebase/firestore';

// Function to write data to Firestore
const writeUserData = async (collection, docId, data) => {
  try {
    await firestore().collection(collection).doc(docId).set(data);
    console.log('Data successfully written!');
  } catch (error) {
    console.error('Error writing data: ', error);
  }
};

// Function to update data in Firestore
const updateUserData = async (collection, docId, data) => {
  try {
    await firestore().collection(collection).doc(docId).update(data);
    console.log('Data successfully updated!');
  } catch (error) {
    console.error('Error updating data: ', error);
  }
};

// Function to listen for real-time updates
const subscribeToUserData = (collection, docId, callback) => {
  return firestore()
    .collection(collection)
    .doc(docId)
    .onSnapshot((snapshot) => {
      const data = snapshot.data();
      callback(data);
    });
};

//function for reading user data
export const readUserData = async (collection, docId) => {
  try {
    const snapshot = await firestore().collection(collection).doc(docId).get();
    if (snapshot.exists) {
      return snapshot.data();
    } else {
      console.log('Document does not exist');
      return null;
    }
  } catch (error) {
    console.error('Error reading data: ', error);
    return null;
  }
};

// Example usage
writeUserData('users', 'Illnesses', {
  date_ended: '4/29/24',
  date_started: '4/2/24',
  id: 2,
  illness_name: 'cough',
  time_ended: '4:00pm',
  time_started: '2:00pm',
});

updateUserData('users', 'Medicines', {
  dosage: '3mg',
  dosage_schedule: 'every morning',
  frequency: 'once a day for 5 days',
  id: 43,
  medicine_name: 'cough syrup',
});

const unsubscribe = subscribeToUserData('users', 'Symptom_checker', (data) => {
  console.log('Received data:', data);
});

// To unsubscribe from real-time updates
// unsubscribe();
