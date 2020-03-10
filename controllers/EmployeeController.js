const Employee = require("../models/Employee");

// Show the list of Employees
const index = (req, res, next) => {
  Employee.find()
    .then(response => {
      res.json({
        response
      });
    })
    .catch(error => {
      res.json({
        message: "An Error Occured!"
      });
    });
};

// Show single employee
const show = (req, res, next) => {
  let employeeID = req.body.employeeID;

  Employee.findById(employeeID)
    .then(response => {
      res.json({
        response
      });
    })
    .catch(error => {
      res.json({
        message: "An Error Occured!"
      });
    });
};

// Add new employee
const store = (req, res, next) => {
  let employee = new Employee({
    name: req.body.name,
    designation: req.body.designation,
    email: req.body.email,
    phone: req.body.phone,
    age: req.body.age
  });

  // Single Upload
  // if (req.file) {
  //   employee.avatar = req.file.path;
  // }

  // Multiple upload
  if (req.files) {
    let path = "";
    req.files.forEach(function(files, index, arr) {
      path = path + files.path + ",";
    });

    path = path.substring(0, path.lastIndexOf(","));
    employee.avatar = path;
  }

  employee
    .save()
    .then(response => {
      res.json({
        message: "Employee Added Successfully"
      });
    })
    .catch(error => {
      res.json({
        message: "An Error Occured!"
      });
    });
};

// Update an employee
const update = (req, res, next) => {
  let employeeID = req.body.employeeID;

  let updateData = {
    name: req.body.name,
    designation: req.body.designation,
    email: req.body.email,
    phone: req.body.phone,
    age: req.body.age
  };

  Employee.findByIdAndUpdate(employeeID, { $set: updateData })
    .then(() => {
      res.json({
        message: "Employee Updated Successfully"
      });
    })
    .catch(error => {
      res.json({
        message: "An Error Occured!"
      });
    });
};

// Delete an employee
const destroy = (req, res, next) => {
  let employeeID = req.body.employeeID;

  Employee.findByIdAndRemove(employeeID)
    .then(() => {
      res.json({
        message: "Employee Deleted Successfully"
      });
    })
    .catch(error => {
      res.json({
        message: "An Error Occured!"
      });
    });
};

module.exports = { index, show, store, update, destroy };
