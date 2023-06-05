// Get the objects we need to modify
let updateCarForm = document.getElementById('updateCar-ajax');

// Modify the objects we need
updateCarForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputID = document.getElementById("mySelect");

    // Get the values from the form fields
    let IDValue = inputID.value;
    
    // currently the database table for Car does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld

    //if (isNaN(homeworldValue)) 
    //{
    //    return;
    //}


    // Put our data we want to send in a javascript object
    let data = {
        ID: IDValue,
        //homeworld: homeworldValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/updateCar-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, IDValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, CarID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("car-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == CarID) {

            // Get the location of the row where we found the matching Car ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign homeworld to our value we updated to
            td.innerHTML = parsedData[0].name; 
       }
    }
}