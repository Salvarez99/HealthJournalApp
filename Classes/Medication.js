export default class Medication{

    /*
    @params: 
    name: String
    dosage: String
    dosageSchedule: String
    frequency: List[int]
    */
    constructor(name, dosage, dosageSchedule, frequency){
        this._name = name;
        this._dosage = dosage;
        this._dosageSchedule = dosageSchedule;
        this._frequency = frequency;
    }

    get name() {
        return this._name;
    }

    get dosage() {
        return this._dosage;
    }

    get dosageSchedule() {
        return this._dosageSchedule;
    }

    get frequency() {
        return this._frequency;
    }
    toString(){
        return `Medication: ${this._name}\nDosage: ${this._dosage}\nDosage Schedule: ${this._dosageSchedule}\nFrequency: ${this._frequency}`;
    }
}