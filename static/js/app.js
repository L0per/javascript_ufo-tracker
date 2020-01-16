////////////////////////////////////////////////////////////////////////////////
// data and d3 selections
////////////////////////////////////////////////////////////////////////////////

// from data.js
let tableData = data;

// select the table body
let table = d3.select("#ufo-table").select("tbody");

// text header if no text is found
let notFound = d3.select("#table-area").append("h2")


////////////////////////////////////////////////////////////////////////////////
// initial table creation
////////////////////////////////////////////////////////////////////////////////

// iterate through tableData and add new table row for each sighting
function resetTable() {
    tableData.forEach(sighting => {

    // add new row for each sighting
    let row = table.append("tr");
    // create array contianing values for each sighting
    let sightingEntry = Object.values(sighting);

    // iterate though each sighting value
    sightingEntry.forEach(sightingValue => {
        // add new td text for each value in the array
        row.append("td").text(sightingValue); 
    })
    })
}

// create initial table
resetTable()


////////////////////////////////////////////////////////////////////////////////
// filter table
////////////////////////////////////////////////////////////////////////////////

// select the filter button
let button = d3.select("#filter-btn");

// trigger when filter button is clicked
button.on("click", function() {

    // select input values
    let inputDate = d3.select("#datetime").property("value");
    let inputCity = d3.select("#city").property("value");
    let inputState = d3.select("#state").property("value");
    let inputCountry = d3.select("#country").property("value");
    let inputShape = d3.select("#shape").property("value");

    // create filtered data variable for checking length
    var filteredData = {}

    // filter data if values are in respective field
    if (inputDate.length > 0) {
        var filteredData = tableData.filter(sighting => sighting.datetime === inputDate);
    }

    if (inputCity.length > 0 && filteredData.length > 0) {
        var filteredData = filteredData.filter(sighting => sighting.city === inputCity);
    }
    else if (inputCity.length > 0) {
        var filteredData = tableData.filter(sighting => sighting.city === inputCity);
    }

    if (inputState.length > 0 && filteredData.length > 0) {
        var filteredData = filteredData.filter(sighting => sighting.state === inputState);
    }
    else if (inputState.length > 0) {
        var filteredData = tableData.filter(sighting => sighting.state === inputState);   
    }

    if (inputCountry.length > 0 && filteredData.length > 0) {
        var filteredData = filteredData.filter(sighting => sighting.country === inputCountry);
    }
    else if (inputCountry.length > 0) {
        var filteredData = tableData.filter(sighting => sighting.country === inputCountry);
    }

    if (inputShape.length > 0 && filteredData.length > 0) {
        var filteredData = filteredData.filter(sighting => sighting.shape === inputShape);
    }
    else if (inputShape.length > 0) {
        var filteredData = tableData.filter(sighting => sighting.shape === inputShape);
    }

    // clear table
    table.html("")
    // clear not found text
    notFound.html("")

    // refresh table 
    if (filteredData.length > 0) {
        filteredData.forEach(sighting => {

            // add new row for each sighting
            let row = table.append("tr");
            // create array contianing values for each sighting
            let sightingEntry = Object.values(sighting);
        
            // iterate though each sighting value
            sightingEntry.forEach(sightingValue => {
                // add new td text for each value in the array
                row.append("td").text(sightingValue); 
            })
        })
    }
    
    // text if no results found
    if (filteredData.length === 0) {
        notFound.text("No sightings found!");
    }

    // reset table if all fields are empty
    let fieldsLength = inputDate.length + inputCity.length + inputState.length + inputCountry.length + inputShape.length;
    if (fieldsLength === 0) {
        resetTable();
    }
})

