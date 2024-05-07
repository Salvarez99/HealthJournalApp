/***************************************************************************************
 * Authors: Stephen Alvarez
 * Date: 5/1/2024
 * Code Version: 1.0
 * 
 * Description:
 *  A class to wrap all JournalEntry data in one place for easy access later on.
 * 
 * 
 ***************************************************************************************/
import Illness from "./Illness";
import Symptom from "./Symptom";
import TestAndLabworks from "./TestAndLabwork";
export default class JournalEntry{
   /**
    * @param {List[Symptom]} symptoms 
    * @param {List[Illness]} illnesses 
    * @param {List[TestAndLabworks]} testAndLabworks 
    */
    constructor(symptoms, illnesses, testAndLabworks){
        this._symptoms = symptoms;
        this._illnesses = illnesses;
        this._testAndLabworks = testAndLabworks;
    }

    /**
     * @return {List[Symptom]}
     */
    get symptoms() {
        return this._symptoms;
    }
    
    /**
     * @return {List[Illness]}
     */
    get illnesses() {
        return this._illnesses;
    }
    
    /**
     * @return {List[TestAndLabworks]}
     */
    get testAndLabworks() {
        return this._testAndLabworks;
    }

    toString() {
        return `Symptoms: ${this._symptoms}\nIllnesses: ${this._illnesses}\nTest & Labworks: ${this._testAndLabworks}`;
      }
}