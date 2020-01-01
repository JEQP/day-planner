
var currentDayEl = document.getElementById("currentDay");
var daysActivities = ["", "", "", "", "", "", "", ""];
var dailyHourText = "string";
var tempDay = new Date(2019, 11, 31); // date object, year month day. (months are from 0-11)

$(document).ready(function () {
    showDate();
    // setCurrentHour();
    // displayActivities();
    // createStorageString();
});

// function createStorageString() {
//     dailyHourText = "hourText" + currentDayEl.innerHTML;
//     console.log("dailyHourText: " + dailyHourText);
// }

function showDate() {

    var NowMoment = moment();
    currentDayEl.innerHTML = NowMoment.format('DD/MM/YYYY');
    setCurrentHour(); // this is needed for the button click event
    displayActivities();

}

function changeDate() {
    var x = document.getElementById("myDate").value;
    currentDayEl.innerHTML = moment(x).format('DD/MM/YYYY');
    setCurrentHour();
    displayActivities();
}

function setCurrentHour() {

    var currentHour = moment().format("H"); // moment() returns the WHOLE time, date, location. with format("H") it only returns the hour section in 24hour times.
    console.log("current time: " + moment().format());
    // console.log(currentHour); 

    // sets the colour of the time blocks
    // this should compare the current date to the day displayed, and colour boxes accordingly. 
    if (moment().isAfter(currentDayEl.innerHTML, 'day')) {
        $(".time-block").each(function () {
            $(this).addClass("past");
            $(this).removeClass("present");
            $(this).removeClass("future");
        });
    }

    else if (moment().isBefore(currentDayEl.innerHTML, 'day')) {
        $(".time-block").each(function () {
            $(this).addClass("future");
            $(this).removeClass("present");
            $(this).removeClass("past");
        });
    }

    else {
        $(".time-block").each(function () {
            var itemID = parseInt($(this).parent().attr("id"));

            if (itemID == currentHour) {
                $(this).addClass("present");
                $(this).removeClass("future");
                $(this).removeClass("past");
            } else if (itemID < currentHour) {
                $(this).addClass("past");
                $(this).removeClass("present");
                $(this).removeClass("future");
            }
            else {
                $(this).addClass("future");
                $(this).removeClass("present");
                $(this).removeClass("past");
            }
        });
    }
}

// Changes the timeblock to accept text
function addText(blockClicked) {

    $("#" + blockClicked).find(".textarea").addClass("hide");
    $("#" + blockClicked).find(".inputbox").removeClass("hide");
}

function updateSaved(blockClicked) {
    dailyHourText = "hourText" + currentDayEl.innerHTML;
    var toDoList = localStorage.getItem(dailyHourText); // this is the string from the local storage
    //convert string toDoList into array daysActivities
    if (toDoList === null) {
        daysActivities = ["", "", "", "", "", "", "", ""];
    }
    else {
        daysActivities = JSON.parse(toDoList);
    }

    var pos = blockClicked - 9; // converts id to array position

    daysActivities[pos] = $("#" + blockClicked).find(".inputbox").val(); // adds text in the box into the array

    toDoList = JSON.stringify(daysActivities); // stringify array
    localStorage.setItem(dailyHourText, toDoList); // store array
    $("#" + blockClicked).find(".inputbox").addClass("hide"); // hides input box
    $("#" + blockClicked).find(".textarea").removeClass("hide"); // shows text
    displayActivities();
}

// When save icon is clicked, gets hourText from storage, checks it exists, parses to an array. Changes relevant text based on user input, saves array, calls display function
$(".save-icon").click(function (event) {

    event.stopPropagation();

    var blockClicked = $(this).parent().attr("id");
    console.log("save icon clicked: " + blockClicked);
    updateSaved(blockClicked);

});

$(".inputbox").on('keyup', function (event) {
    event.stopPropagation();
    if (event.keyCode === 13) {
        var blockClicked = $(this).closest(".row").attr("id");
        console.log("keyup: " + blockClicked);
        updateSaved(blockClicked);


    }
});



function displayActivities() {
    // get toDoList from localstorage
    dailyHourText = "hourText" + currentDayEl.innerHTML;
    var toDoList = localStorage.getItem(dailyHourText);
    console.log("toDoList: " + toDoList);

    // unstringify it
    if (toDoList === null) {
        daysActivities = ["", "", "", "", "", "", "", ""];
    }
    else {
        daysActivities = JSON.parse(toDoList);
    }
    console.log(daysActivities);

    // This should clear the days activities before adding new ones // but it deletes them.
    // for (var i=9; i<17; i++){
    //     $("#"+i).find(".textarea").text("");
    // }

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

// check if date has changed and change date only if the calendar is set to current date

function newDay() {
    if (currentDayEl.innerHTML == moment().format('DD/MM/YYYY')) {
        if (moment().isAfter(tempDay, 'day')) {
            showDate();
            tempDay = moment().format('YYYY/MM/DD');
        }
    }
    else {
        tempDay = moment().format('YYYY/MM/DD');
        return;
    }
}

setInterval(setCurrentHour, 60000);
setInterval(newDay, 60000);