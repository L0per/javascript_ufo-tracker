////////////////////////////////////////////////////////////////////////////////
// Data and d3 selections

// from data.js
let tableData = data;

// select the table body
let table = d3.select("#ufo-table").select("tbody");

// text header if no text is found
let notFound = d3.select("#table-area").append("h2")


////////////////////////////////////////////////////////////////////////////////
// Initial table creation

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

resetTable()


////////////////////////////////////////////////////////////////////////////////
// Filtering table

// select the filter button
let button = d3.select("#filter-btn");

// trigger when filter button is clicked
button.on("click", function() {

    // select date input field
    let inputDate = d3.select("#datetime");
    // select date input field values
    let inputDateValue = inputDate.property("value");

    // filter data based on input date
    let filteredDates = tableData.filter(sighting => sighting.datetime === inputDateValue);

    // exit function if date field is left empty
    if (inputDateValue.length === 0) {
        table.html("");
        resetTable();
        return;
    }

    // clear table
    table.html("")
    // clear not found text
    notFound.html("")

    // //Refresh table
    filteredDates.forEach(sighting => {

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

    // text if no results found
    if (filteredDates.length === 0) {
        notFound.text("No sightings found!")
    }

})

