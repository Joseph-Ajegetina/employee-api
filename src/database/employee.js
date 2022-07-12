// In src/database/Workout.js
const csv = require("csvtojson");
const DB = require("./db.json");
const { saveToDatabase, paginator } = require("./utils");

const getAllEmployees = (filterParams) => {
  try {
    let employees = DB.employees;
    if (filterParams.email) {
      employees = employees.filter((employee) =>
        employee.email.toLowerCase().includes(filterParams.email)
      );
    }
    return paginator(employees, filterParams.page);
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const createNewEmployee = (newEmployee) => {
  try {
    const isAlreadyAdded =
      DB.employees.findIndex((employee) => employee.name === newEmployee.name) >
      -1;
    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Employee with the name '${newEmployee.name}' already exists`,
      };
    }
    DB.employees.push(newEmployee);
    saveToDatabase(DB);
    return newEmployee;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const createEmployeesFromFile = async (filePath) => {
  try {
    const fileHeaders = [
      "id",
      "name",
      "surname",
      "address",
      "phone",
      "email",
      "birthdate",
    ];
    let employees = await csv({headers:fileHeaders}).fromFile(filePath)
    employees.forEach(employeeFile => {
      const isAlreadyAdded = DB.employees.findIndex( employee => employee.name == employeeFile.name) > -1;
      if (!isAlreadyAdded){
        DB.employees.push(employeeFile);
      }
    })
    saveToDatabase(DB)
    return employees
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const getOneEmployee = (employeeId) => {
  try {
    employee = DB.employees.find((employee) => employee.id == employeeId);
    if (!employee) {
      throw {
        status: 400,
        message: `Can't find employee with the id '${employeeId}'`,
      };
    }
    return employee;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const updateEmployee = (employeeId, changes) => {
  try {
    indexForUpdate = DB.employees.findIndex(
      (employee) => employee.id === employeeId
    );
    if (!indexForUpdate == -1) {
      throw {
        status: 400,
        message: `Can't find employee with the id '${employeeId}'`,
      };
    }
    const updatedEmployee = {
      ...DB.employees[indexForUpdate],
      ...changes,
    };
    DB.employees[indexForUpdate] = updatedEmployee;
    saveToDatabase(DB);
    return updatedEmployee;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const deleteEmployee = (employeeId) => {
  try {
    const indexForDeletion = DB.employees.findIndex(
      (employee) => employee.id === employeeId
    );
    if (indexForDeletion === -1) {
      throw {
        status: 400,
        message: `Can't find employee with the id '${employeeId}'`,
      };
    }
    DB.employees.splice(indexForDeletion, 1);
    saveToDatabase(DB);
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

module.exports = {
  getAllEmployees,
  getOneEmployee,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  createEmployeesFromFile,
};
