// Get the objects we need to modify
let addPersonForm = document.getElementById('add-car-form-ajax');

// Modify the objects we need
addPersonForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputid = document.getElementById("input-id");
    let inputprice = document.getElementById("input-price");
    let inputbrand = document.getElementById("input-brand");
    let inputmodel = document.getElementById("input-model");
    let inputyear = document.getElementById("input-year");
    let inputcolor = document.getElementById("input-color");

    // Get the values from the form fields
    let idValue = inputid.value;
    let priceValue = inputprice.value;
    let brandValue = inputbrand.value;
    let modelValue = inputmodel.value;
    let yearValue = inputyear.value;
    let colorValue = inputcolor.value;

    // Put our data we want to send in a javascript object
    let data = {
        id: idValue,
        price: priceValue,
        brand: brandValue,
        model: modelValue,
        year: yearValue,
        color: colorValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-car-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputid.value = '';
            inputprice.value = '';
            inputbrand.value = '';
            inputmodel.value = '';
            inputyear.value = '';
            inputcolor.value = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("car-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let priceCell = document.createElement("TD");
    let brandCell = document.createElement("TD");
    let modelCell = document.createElement("TD");
    let yearCell = document.createElement("TD");
    let colorCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.id;
    priceCell.innerText = newRow.price;
    brandCell.innerText = newRow.brand;
    modelCell.innerText = newRow.model;
    yearCell.innerText = newRow.year;
    colorCell.innerText = newRow.color;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(priceCell);
    row.appendChild(brandCell);
    row.appendChild(modelCell);
    row.appendChild(yearCell);
    row.appendChild(colorCell);
    
    // Add the row to the table
    currentTable.appendChild(row);
}