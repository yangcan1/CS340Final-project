// /*
//     SETUP for a simple web app
// */
// // Express
// var express = require('express');   // We are using the express library for the web server
// var app     = express();            // We need to instantiate an express object to interact with the server in our code
// PORT        = 20419;                 // Set a port number at the top so it's easy to change in the future
// var db = require('./database/db_connector')

// // Handlebars
// const { engine } = require('express-handlebars');
// var exphbs = require('express-handlebars');     // Import express-handlebars
// app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
// app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


// /*
//     ROUTES
// */
// app.get('/', function(req, res)
//     {
//         context = {};
//         console.log("Rendering page");        
//         console.log(context);
//         // Render the users.handlebars file with the context
     
//         res.status(200).render('index', context);

//     });

// app.get('/Cars', function(req, res) 
//     {
//         let query1 = "SELECT * FROM Cars;";
//         db.pool.query(query1, function(error, rows, fields) {
//             res.render('Cars', {data: rows});
//         })
//     });

// /*
//     LISTENER
// */
// app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
//     console.log('Express started on http://flip3.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.')
// });




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

    //if (isNaN(id))
    //{
    //    id = 'NULL'
    //}

    //let year = parseInt(data.year);
    //if (isNaN(year))
    //{
    //    year = 'NULL'
    //}

    // Create the query and run it on the database
    query1 = `INSERT INTO Car (id, price, brand, model, year, color) VALUES (${data['id']}, '${data['price']}', '${data['brand']}', '${data['model']}', ${data['year']}, '${data['color']}')`;
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


app.get('*', function (req, res) {
    res.status(404).render('404')
  });


/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});