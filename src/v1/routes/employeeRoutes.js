// In src/v1/routes/index.js
const express = require("express");
const apicache = require("apicache");
const employeeController = require("../../controllers/employeeController");

const router = express.Router();
const cache = apicache.middleware;

router.get("/", cache("1 minute"), employeeController.getAllEmployees);

router.get("/:employeeId", employeeController.getOneEmployee);

router.post("", employeeController.createEmployee);

router.post("/file", employeeController.createEmployeesFromFile);

router.patch("/:employeeId", employeeController.updateEmployee);

router.delete("/:employeeId", employeeController.deleteEmployee);

module.exports = router;
