// code for deletecar function using jQuery
function Delete(carID) {
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
  