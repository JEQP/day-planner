// functions needed:
// time and date
// at turn of hour, start functions.
// change colours of hour slots
// check for save button pressed - then save content to local storage with date-time. 
var currentDayEl = document.getElementById("currentDay");
var daysActivities = ["","","","","","","",""];


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
    // console.log(currentHour); 

// sets the colour of the time blocks
    $( ".time-block" ).each(function() {
        var itemID = parseInt($(this).parent().attr("id"));
        // console.log(itemID);
       if ( itemID == currentHour ) {
         $(this).addClass("present");
        //  console.log("present");
       } else if ( itemID < currentHour){
         $(this).addClass("past");
        //  console.log("past");
       }
       else {
           $(this).addClass("future");
        //    console.log("future");
       }
    //    console.log("iteration");
     });

     
}
// This should add the text into an array (get the array before adding, figure out what to do if not entered. Maybe just enter it at the beginning?)
// then it will stringify the array and save it to local storage. Then it should call a function that will add the text to the time slots.
function addText(blockClicked) {
  
    var toDoList = localStorage.getItem("hourText"); // this is the string from the local storage
    //convert string toDoList into array daysActivities
    if (toDoList === null){
        daysActivities = ["","","","","","","",""];
    }
    else {
        daysActivities = JSON.parse(toDoList);
    }

    console.log(blockClicked);
    // This changes the timeblock to accept text. Unfortunately, have to click it again to enter text.
    $("#"+blockClicked).find(".textarea").addClass("hide");
    $("#"+blockClicked).find(".inputbox").removeClass("hide");
    
    // This is what happens when the save icon is clicked on. 
    $("#"+blockClicked).find(".save-icon").click(function(event){

        event.stopPropagation();
       var pos = blockClicked-9; // converts id to array position
       console.log("array position: "+pos);
       console.log("text entered: " +$("#"+blockClicked).find(".inputbox").val() )
       daysActivities[pos]=$("#"+blockClicked).find(".inputbox").val(); // adds text in the box into the array
       console.log(daysActivities);
       toDoList = JSON.stringify(daysActivities); // stringify array
       localStorage.setItem("hourText", toDoList); // store array
       $("#"+blockClicked).find(".inputbox").addClass("hide"); // hides input box
       $("#"+blockClicked).find(".textarea").removeClass("hide"); // shows text area box
       displayActivities();
    });

}

function displayActivities(){
    // get toDoList from localstorage
    var toDoList = localStorage.getItem("hourText");

    // unstringify it
    daysActivities = JSON.parse(toDoList); 

    // for loop to add the text to all the timeslots
    for (var i=0; i<daysActivities.length; i++){
        var rowID = i+9;
        $("#"+rowID).find(".textarea").html=daysActivities[i]
        console.log(daysActivities[i]);
    }
}


//     var highScoresString = localStorage.getItem("highScores");
//     var timeStamp=currentDayEl+blockClicked;
//     console.log("Timestamp: "+localStorage.getItem(timeStamp));
//     localStorage.setItem(timeStamp , $("#"+blockClicked).find(".inputbox").text);
//     $("#"+blockClicked).find(".textarea").append(localStorage.getItem(timeStamp));
//     $("#"+blockClicked).find(".inputbox").addClass("hide");
//     $("#"+blockClicked).find(".textarea").removeClass("hide");
//     $("#"+blockClicked).find(".textarea").innerHTML = localStorage.getItem(timeStamp);
//     console.log("finding textarea: " + $("#"+blockClicked).find(".textarea").innerHTML);


    // store text as an array so the key is constant - and each string is in the array (( probably separate function. Or not?))
    // have an onclick event for relevant save button
    // save string in textbox to local storage
    // add string to textarea
    // addclass hide to inputbox
    // removeclass hide from textarea


        // var rowEl = document.querySelector("id" , blockClicked);
    // var formEl = $("<form/>");
    // var formEl = document.createElement("form"); //form gets added, but doesn't do much. Also, multiple clicks add multiple forms.
    // $("#"+blockClicked).children().children().append(formEl);
    // $("form").submit(function(){
    //     alert("Submitted")});

    // $(this).timeBlock.textarea.innerHTML("Test");




$(".time-block").click(function(event){
    event.stopPropagation();
    console.log("Clicked " + $(this).parent().attr("id"));
    var blockClicked = $(this).parent().attr("id");
    addText(blockClicked);
    // this needs to add a form when clicked, for the user to input. The form will be linked to the ID, and then the save button yadda yadda.

    // $("li").eq(4).parent() will give you the PARENT of the fifth (because it starts from zero) li element in the document. .prev() will go one sibling up 
    // .next() will go one sibling down .siblings() selects all siblings
    // .closest("element") goes up the chain until it reaches the first indicated element
    // .filter(":first") will select the first elements of whatever it comes after. .filter(:"special") will select the elements sought containing this special class
    // (this).find("special") will search (this) element for all instances of special class
    // if( $(this).is("special")) is a if condition checking if the thing has the class special

  });