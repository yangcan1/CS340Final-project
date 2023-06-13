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

// PORT = 5080;

// Database
var db = require('./database/db-connector');

// Handlebars
const { engine } = require('express-handlebars');
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates

/*
    Get Page ROUTES (Successful!)
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

// Add Car (working!)
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

// Add Customer (working!)
app.post('/addCustomer', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

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

// Add Employee (working!)
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

// Add Waitlist (working)
app.post('/addWaitlist', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    var date = new Date();
	var current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
	var current_time = date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
	var date_time = current_date+" "+current_time;	
    // console.log(date_time);


    // Create the query and run it on the database
    query1 = `INSERT INTO Waitlist (c_id, car_id, date_added) VALUES ('${data['cID']}', '${data['carID']}', '${date_time}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/Waitlist');
        }
    })
});

// Add Waitlist (working)
app.post('/addInvoice', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    var date = new Date();
	var current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
	var current_time = date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
	var date_time = current_date+" "+current_time;	
    // console.log(date_time);


    // Create the query and run it on the database
    query1 = `INSERT INTO Invoice (c_id, car_id, e_id, date_sale) VALUES ('${data['cID']}', '${data['carID']}', '${data['eID']}', '${date_time}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/Invoice');
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
    let deleteInvoice = `DELETE FROM Invoice WHERE car_id = ?`;
    let deleteWaitlist = `DELETE FROM Waitlist WHERE car_id = ?`;
    let deleteCar = `DELETE FROM Car WHERE id = ?`;

    // run the first query
    db.pool.query(deleteInvoice, [carID], function(error, rows, fields){
        if (error) {

        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
        }

        else
        {
            // Run the second query
            db.pool.query(deleteWaitlist, [carID], function(error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    db.pool.query(deleteCar, [carID], function(error, rows, fields) {
                        if (error) {
                            console.log(error);
                            res.sendStatus(400);
                        }
                        // res.sendStatus(204);

                    })
                }
                res.sendStatus(204);

            })
        }
})});


// Delete Customer (working!)
app.delete('/delete-customer-ajax/', function(req, res, next) {
    let data = req.body;
    let customerID = parseInt(data.id);
    let deleteCustomer = `DELETE FROM Customer WHERE id = ?`;
    let deleteWaitlist = `DELETE FROM Waitlist WHERE c_id = ?`;
    let deleteInvoice = `DELETE FROM Invoice WHERE c_id = ?`;

    // run the first query
    db.pool.query(deleteInvoice, [customerID], function(error, rows, fields){
        if (error) {

        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
        } else {
            // Run the second query
            db.pool.query(deleteWaitlist, [customerID], function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    // run the third query
                    db.pool.query(deleteCustomer, [customerID], function(error, rows, fields) {
                        if (error) {
                            console.log(error);
                            res.sendStatus(400);
                        }
                        // res.sendStatus(204);

                    })
                }
                res.sendStatus(204);

            })
        }
})});

// Delete Employee (working!)
app.delete('/delete-employee-ajax/', function(req, res, next) {
    let data = req.body;
    let employeeID = parseInt(data.id);
    let deleteEmployee = `DELETE FROM Employee WHERE id = ?`;
    let deleteInvoice = `DELETE FROM Invoice WHERE e_id = ?`;

    db.pool.query(deleteInvoice, [employeeID], function(error, rows, fields){
        if (error) {

        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
        } else {
            // Run the second query
            db.pool.query(deleteEmployee, [employeeID], function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                res.sendStatus(204);
            })

        }
})});


// Delete Waitlist (working!)
app.delete('/delete-waitlist-ajax/', function(req, res, next) {
    let data = req.body;
    let waitlistID = parseInt(data.id);
    let deleteWaitlist = `DELETE FROM Waitlist WHERE id = ?`;

    db.pool.query(deleteWaitlist, [waitlistID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    });
});

// Delete Invoice (working!)
app.delete('/delete-invoice-ajax/', function(req, res, next) {
    let data = req.body;
    let invoiceID = parseInt(data.id);
    let deleteInvoice = `DELETE FROM Invoice WHERE id = ?`;

    db.pool.query(deleteInvoice, [invoiceID], function(error, rows, fields) {
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

// update Car (working)
app.post('/update-car', function(req,res, next){                                   
    let data = req.body;
    let carID = parseInt(data.select_id);
    let price = data.price;
    let brand = data.brand;
    let model = data.model;
    let year = data.year;
    let color = data.color;
  
    queryUpdateCar = `UPDATE Car SET Car.price = ?, Car.brand = ?, Car.model = ?, Car.year = ?, Car.color = ? WHERE Car.id = ? `; 
    // queryUpdateWaitlist = `UPDATE Waitlist SET year = '${data['year']}', color = '${data['color']}' WHERE id = '${data['id']}'`; 
    // queryUpdateInvoice = `UPDATE Invoice SET price = '${data['price']}', brand = '${data['brand']}', model = '${data['model']}', year = '${data['year']}', color = '${data['color']}' WHERE id = '${data['id']}'`; 

        db.pool.query(queryUpdateCar, [price, brand, model, year, color, carID], function(error, rows, fields) {
        //db.pool.query(queryUpdateCar, function(error, rows, fields) {

            if (error) {
                console.log(error);
                res.sendStatus(400);
            } else {
                res.redirect('/Car');
            }
        })
  }); 

// update customer (working!)
app.post('/update-cus', function(req,res, next){                                   
    let data = req.body;
    let cusID = parseInt(data.select_id);
    let first_name = data.first_name;
    let last_name = data.last_name;
    let street = data.street;
    let state = data.state;
    let city = data.city;
    let zip = data.zip;
    let email = data.email;
    let phone = data.phone;
  
    queryUpdateCar = `UPDATE Customer SET Customer.first_name = ?, Customer.last_name = ?, Customer.street = ?, Customer.state = ?, Customer.city = ?, Customer.zip = ?, Customer.email = ?, Customer.phone = ? WHERE Customer.id = ? `; 
    //queryUpdateCar = `UPDATE Car SET price = '${data['price']}', brand = '${data['brand']}', model = '${data['model']}', year = '${data['year']}', color = '${data['color']}' WHERE id = '${data['id']}'`; 
        db.pool.query(queryUpdateCar, [first_name, last_name, street, state, city, zip, email, phone, cusID], function(error, rows, fields) {
        //db.pool.query(queryUpdateCar, function(error, rows, fields) {

            if (error) {
                console.log(error);
                res.sendStatus(400);
            } else {
                res.redirect('/Customer');
            }
        })
});

// update Employee (working!)
app.post('/update-employee', function(req,res, next){                                   
    let data = req.body;
    let employeeID = parseInt(data.select_id);
    let first_name = data.first_name;
    let last_name = data.last_name;
    let sales = data.sales;
  
    queryUpdateCar = `UPDATE Employee SET Employee.first_name = ?, Employee.last_name = ?, Employee.sales = ? WHERE Employee.id = ? `; 
    //queryUpdateCar = `UPDATE Car SET price = '${data['price']}', brand = '${data['brand']}', model = '${data['model']}', year = '${data['year']}', color = '${data['color']}' WHERE id = '${data['id']}'`; 
        db.pool.query(queryUpdateCar, [first_name, last_name, sales, employeeID], function(error, rows, fields) {
        //db.pool.query(queryUpdateCar, function(error, rows, fields) {

            if (error) {
                console.log(error);
                res.sendStatus(400);
            } else {
                res.redirect('/Employee');
            }
        })
});

// update Waitlist (working!)
app.post('/update-waitlist', function(req,res, next){                                   
    let data = req.body;
    let waitlistID = parseInt(data.select_id);
    let c_id = data.c_id;
    let car_id = data.car_id;

    var date = new Date();
	var current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
	var current_time = date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
	var date_time = current_date+" "+current_time;	
  
    queryUpdateCar = `UPDATE Waitlist SET Waitlist.c_id = ?, Waitlist.car_id = ?, Waitlist.date_added = ? WHERE Waitlist.id = ? `; 
    //queryUpdateCar = `UPDATE Car SET price = '${data['price']}', brand = '${data['brand']}', model = '${data['model']}', year = '${data['year']}', color = '${data['color']}' WHERE id = '${data['id']}'`; 
        db.pool.query(queryUpdateCar, [c_id, car_id, date_time, waitlistID], function(error, rows, fields) {
        //db.pool.query(queryUpdateCar, function(error, rows, fields) {

            if (error) {
                console.log(error);
                res.sendStatus(400);
            } else {
                res.redirect('/Waitlist');
            }
        })
});

// update Invoice (working!)
app.post('/update-invoice', function(req,res, next){                                   
    let data = req.body;
    let invoiceID = parseInt(data.select_id);
    let c_id = data.c_id;
    let car_id = data.car_id;
    let e_id = data.e_id;

    var date = new Date();
	var current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
	var current_time = date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
	var date_time = current_date+" "+current_time;	
  
    queryUpdateCar = `UPDATE Invoice SET Invoice.c_id = ?, Invoice.car_id = ?, Invoice.e_id = ?, Invoice.date_sale = ? WHERE Invoice.id = ? `; 
    //queryUpdateCar = `UPDATE Car SET price = '${data['price']}', brand = '${data['brand']}', model = '${data['model']}', year = '${data['year']}', color = '${data['color']}' WHERE id = '${data['id']}'`; 
        db.pool.query(queryUpdateCar, [c_id, car_id, e_id, date_time, invoiceID], function(error, rows, fields) {
        //db.pool.query(queryUpdateCar, function(error, rows, fields) {

            if (error) {
                console.log(error);
                res.sendStatus(400);
            } else {
                res.redirect('/Invoice');
            }
        })
});

app.get('*', function (req, res) {
    res.status(404).render('404')
  });


/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});