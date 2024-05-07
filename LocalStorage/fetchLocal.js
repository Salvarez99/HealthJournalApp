import { getAppointments, getIllnesses, getMedicines, getSymptomCheckerEntries, getTestLabworkEntries, getJournalEntries} from './LocalDatabase';

const fetchLocalData = async () => {
    try {
        const appointments = await getAppointments();
        const illnesses = await getIllnesses();
        const medicines = await getMedicines();
        const symptomCheckerEntries = await getSymptomCheckerEntries();
        const testLabworkEntries = await getTestLabworkEntries();
        const Journal_Entry = await getJournalEntries();


        return {
            appointments,
            illnesses,
            medicines,
            symptomCheckerEntries,
            testLabworkEntries,
            Journal_Entry
        };
    } catch (error) {
        console.error('Error fetching local data:', error);
        return null;
    }
};

export { fetchLocalData };
