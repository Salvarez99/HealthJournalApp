import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QuickAddButton from '../../Components/QuickAddButton';
import AddJournalEntryForm from '../../InputForms/AddJournalEntryForm'
import AddAppointmentForm from '../../InputForms/AddAppointmentForm'
import AddMedicationForm from '../../InputForms/AddMedicationForm'

export default function MedicationScreen({ navigation }) {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [selectedModal, setSelectedModal] = React.useState(null);

  const openModal1 = () => {
    setSelectedModal('AddAppointmentForm');
    setIsModalVisible(true);
  };

  const openModal2 = () => {
    setSelectedModal('AddMedicationForm');
    setIsModalVisible(true);
  };

  const openModal3 = () => {
    setSelectedModal('AddJournalEntryForm');
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  // Define modal components with their names
  const modalComponents = [
    { name: 'Add Appointment', openModal: openModal1 },
    { name: 'Add Medication', openModal: openModal2 },
    { name: 'Add Journal Entry', openModal: openModal3 },
    // Add more modal components as needed
  ];

  const renderSelectedModal = () => {
    switch (selectedModal) {
      case 'AddAppointmentForm':
        return <AddAppointmentForm isVisible={isModalVisible} onClose={closeModal} />;
      case 'AddMedicationForm':
        return <AddMedicationForm isVisible={isModalVisible} onClose={closeModal} />;
        case 'AddJournalEntryForm':
            return <AddJournalEntryForm isVisible={isModalVisible} onClose={closeModal} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <Text style={styles.title}>
          Medication Screen
        </Text>
        {/* Your main content goes here */}
      </View>

      <View style={styles.quickAddButtonContainer}>
        <QuickAddButton modalComponents={modalComponents} />
      </View>

      {renderSelectedModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  quickAddButtonContainer: {
    position: 'absolute',
    bottom: '2%',
    left: '4%',
  },
});
