/*
    SETUP
*/

// Express
var express = require('express');
var app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

PORT = 5050;

// Database
var db = require('./database/db-connector');

// Handlebars
const { engine } = require('express-handlebars');
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates

/*
    app.get() ROUTES (Successful!)
*/

app.get('/', function(req, res)
    {  
        let query1 = "SELECT * FROM Car;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('index', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query

app.get('/:i', function(req, res, next) {
    var i = req.params.i
    if (i == "Car" || i == "Customer" || i == "Employee" || i == "Invoice" || i == "Waitlist") {
        let query1 = "SELECT * FROM " + i;
        db.pool.query(query1, function(error, rows, fields) {
            res.render(i, {data: rows})
        }) 
    } else next()
})

/*
    Add ROUTES
*/

app.post('/addCar', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    let id = parseInt(data.id);

    // Create the query and run it on the database
    query1 = `INSERT INTO Car (price, brand, model, year, color) VALUES ('${data['price']}', '${data['brand']}', '${data['model']}', ${data['year']}, '${data['color']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/Car');
        }
    })
});

app.post('/addCustomer', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    let id = parseInt(data.id);

    // Create the query and run it on the database
    query1 = `INSERT INTO Customer (first_name, last_name, street, zip, state, city, phone, email) VALUES ('${data['first_name']}', '${data['last_name']}', '${data['street']}', ${data['zip']}, '${data['state']}', '${data['city']}', '${data['phone']}', '${data['email']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/Customer');
        }
    })
});

app.post('/addEmployee', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Employee (first_name, last_name, sales) VALUES ('${data['first_name']}', '${data['last_name']}', '${data['sales']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/Employee');
        }
    })
});

/*
    Delete ROUTES
*/

// Delete Car (working!)
app.delete('/delete-car-ajax/', function(req, res, next) {
    let data = req.body;
    let carID = parseInt(data.id);
    let deleteCar = `DELETE FROM Car WHERE id = ?`;
    let deleteInvoice

    db.pool.query(deleteCar, [carID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    });
});

// Delete Customer (working!)
app.delete('/delete-customer-ajax/', function(req, res, next) {
    let data = req.body;
    let customerID = parseInt(data.id);
    let deleteCustomer = `DELETE FROM Customer WHERE id = ?`;

    db.pool.query(deleteCustomer, [customerID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    });
});

// Delete Employee (working!)
app.delete('/delete-employee-ajax/', function(req, res, next) {
    let data = req.body;
    let employeeID = parseInt(data.id);
    let deleteEmployee = `DELETE FROM Customer WHERE id = ?`;

    db.pool.query(deleteEmployee, [employeeID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    });
});

/*
    Update ROUTES
*/

// update Car
app.put('/updateCar-ajax', function(req,res,next){                                   
    let data = req.body;
  
    //let homeworld = parseInt(data.homeworld);
    //let Car = parseInt(data.fullname)``;
  
    queryUpdateCar = `UPDATE bsg_people SET homeworld = ? WHERE bsg_people.id = ?`;
    selectCar = `SELECT * FROM Car WHERE id = ?`
  
          // Run the 1st query
          db.pool.query(queryUpdateWorld, [homeworld, Car], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              // If there was no error, we run our second query and return that data so we can use it to update the people's
              // table on the front-end
              else
              {
                  // Run the second query
                  db.pool.query(selectWorld, [homeworld], function(error, rows, fields) {
          
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.send(rows);
                      }
                  })
              }
  })});

// update customer
  app.post('/update-customer', function (req, res, next) {
    let data = req.body;
    let ID = parseInt(data.id_select);
    let firstName = data.new_first_name;
    let lastName = data.new_last_name;
    let email = data.new_email;
    let phone = data.new_phone;
    let streetAddress = data.new_street_address;
    let city = data.new_city;
    let state = data.new_state;
    let zip = data.new_zip;
    let dentistID = data.new_dentist_id;

    let queryUpdateFirstName = `UPDATE Patients SET first_name = ? WHERE Patients.patient_ID = ?`;
    let queryUpdateLastName = `UPDATE Patients SET last_name = ? WHERE Patients.patient_ID = ?`;
    let queryUpdatePhone = `UPDATE Patients SET phone = ? WHERE Patients.patient_ID = ?`;
    let queryUpdateEmail = `UPDATE Patients SET email = ? WHERE Patients.patient_ID = ?`;
    let queryUpdateStreetAddress = `UPDATE Patients SET street_address = ? WHERE Patients.patient_ID = ?`;
    let queryUpdateCity = `UPDATE Patients SET city = ? WHERE Patients.patient_ID = ?`;
    let queryUpdateState = `UPDATE Patients SET state = ? WHERE Patients.patient_ID = ?`;
    let queryUpdateZip = `UPDATE Patients SET zip = ? WHERE Patients.patient_ID = ?`;
    let queryUpdateDentistID = `UPDATE Patients SET dentist_ID = ? WHERE Patients.patient_ID = ?`;

    // User hasn't selected a dentist to modify but clicked Submit.
    // Code 204, shouldn't do anything or go anywhere
    if (Number.isNaN(patientID)) {
        res.sendStatus(204)
    }

    else {
        // Run the 1st query
        if (firstName != "") {
            db.pool.query(queryUpdateFirstName, [firstName, patientID], function (error, rows, fields) {
                if (error) {
                    console.log(error)
                    res.sendStatus(400);
                }
            })
        }
        // Run the 2nd query
        if (lastName != "") {
            db.pool.query(queryUpdateLastName, [lastName, patientID], function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400)
                }
            })
        }
        // Run the third query
        if (phone != "") {
            db.pool.query(queryUpdatePhone, [phone, patientID], function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
            })
        }
        // Run the fourth query
        if (email != "") {
            db.pool.query(queryUpdateEmail, [email, patientID], function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400)
                }
            })
        }

        // Run the fifth query
        if (streetAddress != "") {
            db.pool.query(queryUpdateStreetAddress, [streetAddress, patientID], function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400)
                }
            })
        }

        // Run the sixth query
        if (city != "") {
            db.pool.query(queryUpdateCity, [city, patientID], function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400)
                }
            })
        }

        // Run the seventh query
        if (state != "") {
            db.pool.query(queryUpdateState, [state, patientID], function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400)
                }
            })
        }

        // Run the eighth query
        if (zip != "") {
            db.pool.query(queryUpdateZip, [zip, patientID], function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400)
                }
            })
        }

        // Run the ninth query
        if (dentistID != "") {
            db.pool.query(queryUpdateDentistID, [dentistID, patientID], function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400)
                }
            })
        }

        return res.redirect("/patients")
    }
})

app.get('*', function (req, res) {
    res.status(404).render('404')
  });


/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});