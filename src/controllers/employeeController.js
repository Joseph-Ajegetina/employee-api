const uploadFile = require("../middleware/upload");
const employeeService = require("../services/employeeService");

// controllers for api routes

const getAllEmployees = (req, res) => {
  // getting query parameters from url
  const { filter } = req.query;
  const { length } = req.query;
  const { page } = req.query;

  try {
    const allEmployees = employeeService.getAllEmployees({
      email: filter,
      length,
      page,
    });
    res.send({ status: "OK", data: allEmployees });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getOneEmployee = (req, res) => {
  const {
    params: { employeeId },
  } = req;
  // checking to see if the id is defined for a particular employee
  if (!employeeId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':workoutId' can not be empty" },
    });
  }
  try {
    const employee = employeeService.getOneEmployee(employeeId);
    res.send({ status: "OK", data: employee });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createEmployee = (req, res) => {
  // getting the form data and checking if the values are valid
  const { body } = req;
  if (
    !body.name ||
    !body.surname ||
    !body.address ||
    !body.phone ||
    !body.email ||
    !body.dob
  ) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the  following keys is missing or is empty in the request body: name, surname, address, phone, email, date of birth",
      },
    });
  }

  // new employee to be added
  const createNewEmployee = {
    name: body.name,
    surname: body.surname,
    address: body.address,
    phone: body.phone,
    email: body.email,
    dob: body.dob,
  };
  try {
    const createdEmployee = employeeService.createEmployee(createNewEmployee);
    res.status(201).send({ status: "OK", data: createdEmployee });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createEmployeesFromFile = async (req, res) => {
  try {
    // upload file to the server
    await uploadFile(req, res);
    const file = req.file;
    if (file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    const employees = employeeService.createEmployeesFromFile(file.path);
    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
      data: employees,
    });
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

const updateEmployee = (req, res) => {
  const {
    body,
    params: { employeeId },
  } = req;
  if (!employeeId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':workoutId' can not be empty" },
    });
  }
  try {
    const updatedEmployee = employeeService.updateEmployee(employeeId, body);
    res.send({ status: "OK", data: updatedEmployee });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteEmployee = (req, res) => {
  const {
    params: { employeeId },
  } = req;
  if (!employeeId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':employeeId' can not be empty" },
    });
  }
  try {
    const employee = employeeService.deleteEmployee(employeeId);
    res.send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
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
