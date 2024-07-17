/// select table to save form details

// select save_table,, save, 5 inputs

var save_table=document.querySelector('.save_table')
var save= document.getElementById('save')
var namee= document.getElementById("namee")
var age= document.getElementById("age")
var gen= document.getElementById("gen")
var mail= document.getElementById("mail")
var crse= document.getElementById("crse")


function save_data(event) {
    // Prevent the default form submission
    event.preventDefault();

    // Validate input fields
    // Check if any field is empty after trimming whitespace
    if (!namee.value.trim() || !age.value.trim() || !gen.value.trim() || !mail.value.trim() || !crse.value.trim()) {
        // Alert the user if any field is empty
        alert("All fields must be filled out.");
        return; // Stop the function execution
    }

    // Create a new table row with the input values
    var table = document.createElement("tr");
    table.setAttribute('class', "save_table_tr");
    table.innerHTML = `<td>${namee.value}</td> 
                       <td>${age.value}</td> 
                       <td>${gen.value}</td> 
                       <td>${mail.value}</td> 
                       <td>${crse.value}</td> 
                       <td><button onclick='del(event)' style="background-color: red;">Delete</button></td>`;
    save_table.append(table);

    // Clear the input fields
    namee.value = '';
    age.value = '';
    gen.value = '';
    mail.value = '';
    crse.value = '';
}


function del(event) {
    // Show a confirmation dialog
    var confirmation = confirm("Are you sure you want to delete this entry?");
    if (confirmation) {
        // If the user clicks "Yes", remove the table row
        event.target.closest('tr').remove();
    }
}