/*
    SETUP
*/

// Express
var express = require('express');
var app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

PORT = 5080;

// Database
var db = require('./database/db-connector');

// Handlebars
const { engine } = require('express-handlebars');
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates

/*
    ROUTES
*/

app.get('/', function(req, res)
    {  
        let query1 = "SELECT * FROM Car;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('index', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query

// render Car page
app.get('/Car', function(req, res) {
    let query1 = "SELECT * FROM Car;";               // Define our query
    db.pool.query(query1, function(error, rows, fields){    // Execute the query
        res.render('Car', {data: rows});                  // Render the index.hbs file, and also send the renderer
    })   
});
// render Customer page
app.get('/Customer', function(req, res) {
    let query1 = "SELECT * FROM Customer;";               // Define our query
    db.pool.query(query1, function(error, rows, fields){    // Execute the query
        res.render('Customer', {data: rows});                  // Render the index.hbs file, and also send the renderer
    })   
});
// render Employee page
app.get('/Employee', function(req, res) {
    let query1 = "SELECT * FROM Employee;";               // Define our query
    db.pool.query(query1, function(error, rows, fields){    // Execute the query

        res.render('Employee', {data: rows});                  // Render the index.hbs file, and also send the renderer
    })   
});
// render Invoice page
app.get('/Invoice', function(req, res) {
    let query1 = "SELECT * FROM Invoice;";               // Define our query
    db.pool.query(query1, function(error, rows, fields){    // Execute the query

        res.render('Invoice', {data: rows});                  // Render the index.hbs file, and also send the renderer
    })   
});
// render Waitlist page
app.get('/Waitlist', function(req, res) {
    let query1 = "SELECT * FROM Waitlist;";               // Define our query
    db.pool.query(query1, function(error, rows, fields){    // Execute the query

        res.render('Waitlist', {data: rows});                  // Render the index.hbs file, and also send the renderer
    })   
});


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

app.delete('/deleteCar-ajax/', function(req,res,next){                                                                
    let data = req.body;
    let carID = parseInt(data.id);
    let deleteInvoice = `DELETE FROM Invoice WHERE car_id = ?`;
    //let deleteWaitlist = `DELETE FROM Waitlist where WHERE car_id = ?`;
    let deleteCar= `DELETE FROM Car WHERE id = ?`;
  
  
          // Run the 1st query
          db.pool.query(deleteInvoice, [carID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
              else {
                //db.pool.query(deleteWaitlist, [carID], function(error, rows, fields){
                //    if(error) {
                //        console.log(error);
                //        res.sendStatus(400);
                //    }
                //    else {
                        db.pool.query(deleteCar, [carID], function(error, rows, fields) {
                            if (error) {
                                console.log(error);
                                res.sendStatus(400);
                            } 
                            else {
                                res.sendStatus(204);
                            }
                        })
                    //}
                //})
              }
  })});

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

app.get('*', function (req, res) {
    res.status(404).render('404')
  });


/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});