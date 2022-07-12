const { v4: uuid } = require("uuid");
const Employee = require("../database/employee");

const getAllEmployees = (filterParams) => {
  try {
    const allEmployees = Employee.getAllEmployees(filterParams);
    return allEmployees;
  } catch (error) {
    throw error;
  }
};

const getOneEmployee = (employeeId) => {
  try {
    const employee = Employee.getOneEmployee(employeeId);
    return employee;
  } catch (error) {
    throw error;
  }
};

const createEmployee = (newEmployee) => {
  const newEmployeeToInsert = {
    ...newEmployee,
    id: uuid(),
  };
  try {
    const createdEmployee = Employee.createNewEmployee(newEmployeeToInsert);
    return createdEmployee;
  } catch (error) {
    throw error;
  }
};

const createEmployeesFromFile = (filePath) => {
  try {
    const createdEmployees = Employee.createEmployeesFromFile(filePath);
    return createdEmployees;
  } catch (error) {
    throw error;
  }
};

const updateEmployee = (employeeId, changes) => {
  try {
    const updatedEmployee = Employee.updateEmployee(employeeId, changes);
    return updatedEmployee;
  } catch (error) {
    throw error;
  }
};

const deleteEmployee = (employeeId) => {
  try {
    const deletedEmployee = Employee.deleteEmployee(employeeId);
    return deletedEmployee;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllEmployees,
  getOneEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  createEmployeesFromFile,
};
