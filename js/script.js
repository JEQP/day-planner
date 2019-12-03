// functions needed:
// time and date
// at turn of hour, start functions.
// change colours of hour slots
// check for save button pressed - then save content to local storage with date-time. 
var currentDayEl = document.getElementById("currentDay");


$(document).ready(function () {
    showDate();
    setCurrentHour();
});

function showDate() {

    var NowMoment = moment();
    var currentDayEl = document.getElementById("currentDay");
    currentDayEl.innerHTML = NowMoment.format('DD/MM/YYYY');

}

function setCurrentHour() {

    var currentHour = moment().format("H"); // moment() returns the WHOLE time, date, location. with format("H") it only returns the hour section in 24hour times.
    console.log(currentHour); 


    $( ".time-block" ).each(function() {
        var itemID = parseInt($(this).parent().attr("id"));
        console.log(itemID);
       if ( itemID == currentHour ) {
         $(this).addClass("present");
         console.log("present");
       } else if ( itemID < currentHour){
         $(this).addClass("past");
         console.log("past");
       }
       else {
           $(this).addClass("future");
           console.log("future");
       }
       console.log("iteration");
     });

    
        // $( ".time-block" ).each(function() {
        //    var itemID = parseInt(this.id);
        //    console.log(itemID);
        //   if ( itemID == currentHour ) {
        //     $(this).addClass("present");
        //     console.log("present");
        //   } else if ( itemID < currentHour){
        //     $(this).addClass("past");
        //     console.log("past");
        //   }
        //   else {
        //       $(this).addClass("future");
        //       console.log("future");
        //   }
        //   console.log("iteration");
        // });
    







}
