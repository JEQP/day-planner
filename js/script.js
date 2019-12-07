
var currentDayEl = document.getElementById("currentDay");
var daysActivities = ["", "", "", "", "", "", "", ""];

$(document).ready(function () {
    showDate();
    setCurrentHour();
    displayActivities();
});

function showDate() {

    var NowMoment = moment();
    var currentDayEl = document.getElementById("currentDay");
    currentDayEl.innerHTML = NowMoment.format('DD/MM/YYYY');

}

function setCurrentHour() {

    var currentHour = moment().format("H"); // moment() returns the WHOLE time, date, location. with format("H") it only returns the hour section in 24hour times.
    // console.log(currentHour); 

    // sets the colour of the time blocks
    $(".time-block").each(function () {
        var itemID = parseInt($(this).parent().attr("id"));

        if (itemID == currentHour) {
            $(this).addClass("present");
        } else if (itemID < currentHour) {
            $(this).addClass("past");
         }
        else {
            $(this).addClass("future");
         }
     });
}

// Changes the timeblock to accept text
function addText(blockClicked) {

    $("#" + blockClicked).find(".textarea").addClass("hide");
    $("#" + blockClicked).find(".inputbox").removeClass("hide");
}

    // When save icon is clicked, gets hourText from storage, checks it exists, parses to an array. Changes relevant text based on user input, saves array, calls display function
    $(".save-icon").click(function (event) {

        event.stopPropagation();

        var toDoList = localStorage.getItem("hourText"); // this is the string from the local storage
        //convert string toDoList into array daysActivities
        if (toDoList === null) {
            daysActivities = ["", "", "", "", "", "", "", ""];
        }
        else {
            daysActivities = JSON.parse(toDoList);
        }

        var blockClicked = $(this).parent().attr("id");

        var pos = blockClicked - 9; // converts id to array position

        daysActivities[pos] = $("#" + blockClicked).find(".inputbox").val(); // adds text in the box into the array
 
        toDoList = JSON.stringify(daysActivities); // stringify array
        localStorage.setItem("hourText", toDoList); // store array
        $("#" + blockClicked).find(".inputbox").addClass("hide"); // hides input box
        $("#" + blockClicked).find(".textarea").removeClass("hide"); // shows text
        displayActivities();
    });



function displayActivities() {
    // get toDoList from localstorage
    var toDoList = localStorage.getItem("hourText");

    // unstringify it
    daysActivities = JSON.parse(toDoList);
    console.log(daysActivities);

    // for loop to add the text to all the timeslots
    for (var i = 0; i < daysActivities.length; i++) {
        var rowID = i + 9;
        $("#" + rowID).find(".textarea").text(daysActivities[i]);
    }
}


$(".time-block").click(function (event) {
    event.stopPropagation();
    console.log("Clicked " + $(this).parent().attr("id"));
    var blockClicked = $(this).parent().attr("id");
    addText(blockClicked);
});

setInterval(setCurrentHour, 60000);
setInterval(showDate, 60000);