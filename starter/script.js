function setCurrentDay() {
    const currentDayStr = dayjs().format("dddd MMMM DD")
    const currentDayEl = $("#currentDay")
    currentDayEl.text(currentDayStr)
}

function initialisePage() {
    setCurrentDay()
    const timetableEl = $("#timetable")
    const currentHour = dayjs().hour(); // Get current hour
    // Loop through 24 hours and create a row for each hour
    for (let hour = 7; hour <= 23; hour++) {

        timetableEl.append(createRow(hour, "", currentHour));
    }
}



function createRow(rowHour, savedText, currentHour) {
    var newRow = $("<div>").addClass("row")
    var hourCol = $("<div>").addClass("col hour").text(formatHourNumber(rowHour))
    var textCol = $("<textarea>").addClass("col time-block").text(savedText)
    var buttonCol = $("<button>").addClass("col saveBtn").text("Save")

    // Conditional formatting for past, present, and future
    if (rowHour < currentHour) {
        textCol.addClass('past');
    } else if (rowHour === currentHour) {
        textCol.addClass('present');
    } else {
        textCol.addClass('future');
    }

     // Load saved text for the textarea
     var savedEvent = localStorage.getItem(`event_${rowHour}`);
     if (savedEvent !== null) {
         textCol.val(savedEvent);
     }
     
     // Save event to Local Storage on button click
     buttonCol.on("click", function() {
         var eventText = textCol.val();
         localStorage.setItem(`event_${rowHour}`, eventText);
     });

    newRow.append(hourCol, textCol, buttonCol)
    return newRow
}
// Function to format hour string

function formatHourNumber(hourNumber) {
    var hourString = hourNumber < 12 ? hourNumber + " AM" : hourNumber === 12 ? "12 PM" : (hourNumber - 12) + " PM";
    return hourString;
}


initialisePage()