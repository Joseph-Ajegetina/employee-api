# Employee API
This apis consumes a file to populate a central repository to track the employee data within the repository <br/>
From there, a user can view, update, delete and create new employees to be added to the central repository

# ENDPOINTS
### View Employee (GET request) <br/>
#### http://localhost:3000/api/v1/employees


### View Single Employee (GET) <br/>
#### http://localhost:3000/api/v1/employees/:id


### Filter Employee (GET) <br/>
http://localhost:3000/api/v1/employees?filter=email<br/>

### Create Employee (POST request)  <br/>
#### http://localhost:3000/api/v1/employees <br/>
Attach data in json format <br/>
sample <br/>
{
"name": "es",
"surname": "Appiah",
"address":"Accr 1",
"phone":"0552522140",
"email": "josep@gmail.com",
"dob": "10/12/1999"
}

### Upadate Employee (PATCH request)  <br/>
#### http://localhost:3000/api/v1/employees/:id  <br/>
attach data in json format corresponding to fieldnames
sample <br/>
{
"name": "Joseph",
"surname": "Appiah",
"address":"Accra",
"phone":"0552522140",
"email": "josep@gmail.com",
"dob": "10/12/1999"
}

### Delete Employee (DELETE request)  <br/>
### http://localhost:3000/api/v1/employees/:id

### Upload Employee Data file (POST request)  <br/>
#### http://localhost:3000/api/v1/employees/upload <br/>
Attach txt file, with field name as "file" <br/>


# STARTING SERVER
## change directory into cloned project 
## install dependencies
npm install 
## run the server 
npm run start

### test endpoints using POSTMAN or any web client
