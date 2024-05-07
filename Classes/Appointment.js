/***************************************************************************************
 * Authors: Stephen Alvarez
 * Date: 5/1/2024
 * Code Version: 1.0
 * 
 * Description:
 *  A class to wrap all appointment data in one place for easy access later on.
 * 
 * 
 ***************************************************************************************/

export default class Appointment {

    /**
     * @param {String} name 
     * @param {String} date 
     * @param {String} startTime 
     * @param {String} endTime 
     */
    constructor(name, date, startTime, endTime) {
      this._name = name;
      this._date = date;
      this._startTime = startTime;
      this._endTime = endTime;
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
    get date() {
      return this._date;
    }
  
    /**
     * @return {String}
     */
    get startTime() {
      return this._startTime;
    }
  
    /**
     * @return {String}
     */
    get endTime() {
      return this._endTime;
    }
  
    toString() {
      return `${this._name} on ${this._date} from ${this._startTime} to ${this._endTime}`;
    }
  }
  