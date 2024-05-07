export default class TestAndLabwork{
    constructor(name, dateOccured){
        this._name = name;
        this._dateOccured = dateOccured;
    }

    get name() {
        return this._name;
    }

    get dateOccured() {
        return this._dateOccured;
    }

    toString() {
      return `${this._name}\nDate Occured: ${this._dateOccured}`;
    }
};