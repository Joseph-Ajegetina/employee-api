// modules 
const express = require("express");
const bodyParser = require("body-parser");

// storing the basedir in global scope for file storage
global.__basedir = __dirname;

const v1EmployeeRouter = require("./src/v1/routes/employeeRoutes");

const app = express();
const PORT = process.env.PORT || 3000;



app.use(bodyParser.json());
app.use("/api/v1/employees", v1EmployeeRouter);


app.listen(PORT, () =>{
    console.log(`API is listening on port ${PORT}`);
});