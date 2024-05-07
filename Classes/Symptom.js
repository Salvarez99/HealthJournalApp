/***************************************************************************************
 * Authors: Stephen Alvarez
 * Date: 5/1/2024
 * Code Version: 1.0
 * 
 * Description:
 *  A class to wrap all Symptom data in one place for easy access later on.
 * 
 * 
 ***************************************************************************************/

export default class Symptom{

    /**
     * @param {String} name 
     * @param {String} startDate 
     * @param {String} endDate 
     */
    constructor(name, startDate, endDate){
        this._name = name;
        this._startDate = startDate;
        this._endDate = endDate;
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
    get startDate() {
        return this._startDate;
    }

    /**
     * @return {String}
     */
    get endDate() {
        return this._endDate;
    }

    toString() {
      return `${this._name}\nStart date: ${this._startDate}\nEnd date: ${this._endDate}`;
    }
};