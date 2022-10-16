/*
Global Variables for the game, the pause flag, the combo count, and 
*/
let paused = true;
let comboCount = 1;
let comboDisp = document.getElementById("comboTextBox");
let enemyDoc = document.getElementById("enemyButton");
let currentSpeedBox = document.getElementById("currentSpeedBox")
let milliSecs = 500;
let boolHit = false;
let clearID; 

function main()
{
    currentSpeedBox.value = milliSecs;
    clearID = setInterval(reset_game, milliSecs);
}

/*
pause_unpause() - toggles the pause switch
*/
function pause_unpause()
{   
    if(paused == true)
        paused = false;
    else
        paused = true;
    return;
}



/*
register_hit() - accoutns for hit and moves target
Args:
    None
Return Value:
    None
*/
function register_hit()
{
    //continue the game if it was paused
    if(paused == true)
        pause_unpause();

    boolHit = true;

    //play the firing sound
    play_fire_sound();
    
    //increment combo counter and change location
    comboDisp.value++;        
    place_in_random_location();
}

/*
place_in_random_location () - places enemy in a random location. 
Updates applicable "stats" blocks
Args: 
    None
Return Value:
    None
*/
function place_in_random_location()
{
    //place enemy in random x and y location 
    let enemyDoc = document.getElementById("enemyButton");
    enemyDoc.style.marginTop =  Math.random()*60+"vh";
    enemyDoc.style.marginLeft = Math.random()*60+"vw";


    //print out the x and y location to the corresponding 
    //text boxes
    document.getElementById("xCoordBox").value = enemyDoc.style.marginLeft.substring(0,5);
    document.getElementById("yCoordBox").value = enemyDoc.style.marginTop.substring(0,5);


}


/*
play_fire_sound() - plays a firing sound effect when a player hits
    the target.
Args:
    None
Return Value:
    None
*/
function play_fire_sound()
{
    var shootEffectContainer = new Audio("shootEffect.mp3");
    shootEffectContainer.play();
}


/*
reset_game() - resets the pause status, combo, and location
Args:
    None
Return Value:
    None
*/
function reset_game()
{
    if(paused == true)
        return;
    //reset the combo, set paused to true, and move the target to 
    //the default location
    if(boolHit == false){ 
        comboDisp.value = 0;
        place_in_random_location();
        document.getElementById("xCoordBox").value = enemyDoc.style.marginLeft.substring(0,5);
        document.getElementById("yCoordBox").value = enemyDoc.style.marginTop.substring(0,5);
    }
    boolHit = false;    
    

}


/*
change_speed() - changes the speed based on what is in the new value
    box
Args:
    None
Return Value:
    None
*/
function change_speed()
{
    //get value from the text box. if it's an invalid valeu then 
    //set value to 500 (the default)
    milliSecs = document.getElementById("newSpeedBox").value; 
    if(milliSecs <=0)
    {
        alert("Error, Invalid No. Value reset to 500");
        milliSecs = 500;
    }
    currentSpeedBox.value = milliSecs;

    //clear the interval so we can reinitialize
    clearInterval(clearID);
    clearID = setInterval(reset_game, milliSecs);

}
/*
play_knocking_noise() - does this as a result of the "horror" button
    I apologize in advance, I thought it was funny lol.
Args:
    None
Return Value:
    None
*/
function play_knocking_noise()
{
    var knockingNoiseContainer = new Audio("trollKnock.mp3");
    knockingNoiseContainer.play();
}