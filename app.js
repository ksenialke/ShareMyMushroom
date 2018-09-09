const realFileBtn = document.getElementById("real-file");
const customBtn = document.getElementById("custom-button");
const customTxt = document.getElementById("custom-text");
/*
//If we leve the buttons
//Clicking the button
customBtn.addEventListener("click", function() {
    realFileBtn.click();
});

realFileBtn.addEventListener("change", function() {
    //If the status changes show a name of the chosen file
    if (realFileBtn.value){
        //Extract the last part of the path
        customTxt.innerHTML = realFileBtn.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
    }
    else{
        customTxt.innerHTML = 'No file chosen yet.'
    }



});
*/