/***************************************************************************************
 * Authors: Stephen Alvarez
 * Date: 5/1/2024
 * Code Version: 1.0
 * 
 * Description:
 *  A class to wrap all Medication data in one place for easy access later on.
 * 
 * 
 ***************************************************************************************/

export default class Medication{
   /**
    * @param {String} name 
    * @param {String} dosage 
    * @param {String} dosageSchedule 
    * @param {List[int]} frequency 
    */
    constructor(name, dosage, dosageSchedule, frequency){
        this._name = name;
        this._dosage = dosage;
        this._dosageSchedule = dosageSchedule;
        this._frequency = frequency;
    }

    /**
     * @return {String}
     */
    get name() {
        return this._name;
    }

     /**
     * @return {String}
     */
    get dosage() {
        return this._dosage;
    }

    /**
     * @return {String}
     */
    get dosageSchedule() {
        return this._dosageSchedule;
    }

    /**
     * @return {List[int]}
     */
    get frequency() {
        return this._frequency;
    }
    toString(){
        return `Medication: ${this._name}\nDosage: ${this._dosage}\nDosage Schedule: ${this._dosageSchedule}\nFrequency: ${this._frequency}`;
    }
}