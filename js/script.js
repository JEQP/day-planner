// functions needed:
// time and date
// at turn of hour, start functions.
// change colours of hour slots
// check for save button pressed - then save content to local storage with date-time. 
var currentDayEl=document.getElementById("currentDay");




function showDate(){
    
    // "formatDate" is the time to be formatted. 
    
    var test = document.createelement("li");
    test.setAttribute("class", "list-item");
    test.textContent = "testy westy";
    currentDayEl.appendChild(test);


    var liEl = document.createElement("li");
        liEl.setAttribute("class", "list-item");
        liEl.textContent = highScoresJSON[k].name + " - " + highScoresJSON[k].score;
    var formatDate= 1399919400000;
    var m=moment(formatDate).format('DD/MM/YYYY');
    currentDayEl.innerHTML = m;

    currentDayEl.textContent = "textContent";
    currentDayEl.innerHTML = "innerHTML";
    currentDayEl.innerText = "innerText";
    $("#currentDay").text("currentDay");
    
    

}

showDate;