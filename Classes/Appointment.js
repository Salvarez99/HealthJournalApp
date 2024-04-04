export default class Appointment {
    constructor(name, date, startTime, endTime) {
      this._name = name;
      this._date = date;
      this._startTime = startTime;
      this._endTime = endTime;
    }
  
    get name() {
      return this._name;
    }
  
    get date() {
      return this._date;
    }
  
    get startTime() {
      return this._startTime;
    }
  
    get endTime() {
      return this._endTime;
    }

    set name(value) {
      this._name = value;
    }
  
    set date(value) {
      this._date = value;
    }
  
    set startTime(value) {
      this._startTime = value;
    }
  
    set endTime(value) {
      this._endTime = value;
    }
  
    // Example toString method
    toString() {
      return `${this._name} on ${this._date} from ${this._startTime} to ${this._endTime}`;
    }
  }
  