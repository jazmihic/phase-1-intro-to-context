// Your code here
function createEmployeeRecord(employee) {
  let record = {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: [],
  };

  return record;
}
function createEmployeeRecords(employeelist) {
  return employeelist.map(createEmployeeRecord);
}

function createTimeInEvent(employeeRecord, date) {
  let timeInEvent = {
    type: "TimeIn",
    hour: Number(date.slice(-4)),
    date: date.slice(0, 10),
  };

  employeeRecord.timeInEvents.push(timeInEvent);

  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, date) {
  let timeOutEvent = {
    type: "TimeOut",
    hour: Number(date.slice(-4)),
    date: date.slice(0, 10),
  };

  employeeRecord.timeOutEvents.push(timeOutEvent);

  return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
  let timeIn = employeeRecord.timeInEvents.find((elm) => elm.date === date);
  let timeOut = employeeRecord.timeOutEvents.find((elm) => elm.date === date);

  let hoursWorked = (timeOut.hour - timeIn.hour) / 100;

  return hoursWorked;
}

function wagesEarnedOnDate(employeeRecord, date) {
  return employeeRecord.payPerHour * hoursWorkedOnDate(employeeRecord, date);
}

function allWagesFor(employeeRecord) {
  return employeeRecord.timeInEvents.reduce(
    (a, b) => wagesEarnedOnDate(employeeRecord, b.date) + a,
    0
  );
}

function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce((a, b) => allWagesFor(b) + a, 0);
}
