export default class JournalEntry{
    /*
    @params:
    symptoms: List[Symptom]
    illnesses: List[Illness]
    testAndLabworks: List[TestAndLabwork]
    */
    constructor(symptoms, illnesses, testAndLabworks){
        this._symptoms = symptoms;
        this._illnesses = illnesses;
        this._testAndLabworks = testAndLabworks;
    }

    get symptoms() {
        return this._symptoms;
    }
    
    get illnesses() {
        return this._illnesses;
    }
    
    get testAndLabworks() {
        return this._testAndLabworks;
    }

    toString() {
        return `Symptoms: ${this._symptoms}\nIllnesses: ${this._illnesses}\nTest & Labworks: ${this._testAndLabworks}`;
      }
}