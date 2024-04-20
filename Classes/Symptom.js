export default class Symptom{
    constructor(name, startDate, endDate){
        this._name = name;
        this._startDate = startDate;
        this._endDate = endDate;
    }

    get name() {
        return this._name;
    }

    get startDate() {
        return this._startDate;
    }

    get endDate() {
        return this._endDate;
    }

    toString() {
      return `${this._name}\nStart date: ${this._startDate.toLocaleDateString()}\nEnd date: ${this._endDate.toLocaleDateString()}`;
    }
};