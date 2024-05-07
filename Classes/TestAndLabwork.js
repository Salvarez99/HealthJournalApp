/***************************************************************************************
 * Authors: Stephen Alvarez
 * Date: 5/1/2024
 * Code Version: 1.0
 * 
 * Description:
 *  A class to wrap all TestAndLabwork data in one place for easy access later on.
 * 
 * 
 ***************************************************************************************/

export default class TestAndLabwork{
    /**
     * @param {String} name 
     * @param {String} dateOccured 
     */
    constructor(name, dateOccured){
        this._name = name;
        this._dateOccured = dateOccured;
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
    get dateOccured() {
        return this._dateOccured;
    }

    toString() {
      return `${this._name}\nDate Occured: ${this._dateOccured}`;
    }
};