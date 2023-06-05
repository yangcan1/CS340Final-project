// code for deletecar function using jQuery
function deleteCar(carID) {
	let link = '/deleteCar-ajax/';
	let data = {
	  id: carID
	};
  
	$.ajax({
	  url: link,
	  type: 'DELETE',
	  data: JSON.stringify(data),
	  contentType: "application/json; charset=utf-8", 
	  success: function(result) {
		deleteRow(carID);
	  }
	});
  }
  
  ////  code for deletecar using regular javascript/xhttp
  // function deletecar(carID) {
  //     // Put our data we want to send in a javascript object
  //     let data = {
  //         id: carID
  //     };
	  
  //     // Setup our AJAX request
  //     var xhttp = new XMLHttpRequest();
  //     xhttp.open("DELETE", "/deleteCar-ajax", true);
  //     xhttp.setRequestHeader("Content-type", "application/json");
  
  //     // Tell our AJAX request how to resolve
  //     xhttp.onreadystatechange = () => {
  //         if (xhttp.readyState == 4 && xhttp.status == 204) {
  
  //             // Add the new data to the table
  //             deleteRow(carID);
  
  //         }
  //         else if (xhttp.readyState == 4 && xhttp.status != 204) {
  //             console.log("There was an error with the input.")
  //         }
  //     }
  //     // Send the request and wait for the response
  //     xhttp.send(JSON.stringify(data));
  // }
  
  
  function deleteRow(carID){
  
	  let table = document.getElementById("car-table");
	  for (let i = 0, row; row = table.rows[i]; i++) {
		 //iterate through rows
		 //rows would be accessed using the "row" variable assigned in the for loop
		 if (table.rows[i].getAttribute("data-value") == carID) {
			  table.deleteRow(i);
			  break;
		 }
	  }
  }
  