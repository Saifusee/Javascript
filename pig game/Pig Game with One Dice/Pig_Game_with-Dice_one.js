/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


//Declaring some global variables.
var gscore, cscore, aplayer, gameon,lastroll;




start();




//Roll Dice button
document.querySelector(".btn-roll").addEventListener("click", function() {
    //this if statement check if our boolean gameon is still true thene do further work here, if false, button don't work.
    if (gameon) {
     //Adding How Dice going to work.
    var dicevalue = Math.floor(Math.random() * 6) + 1;
    document.querySelector(".dice").style.display = "block";
    document.querySelector(".dice").src = "dice-" + dicevalue + ".png";
    
    if (dicevalue === 6 && lastroll === 6) {
        //with consecutive 2 sixes player loses all data.
    gscore[aplayer] = 0;
    document.querySelector("score-" + aplayer).textContent = "0";

    } else if(dicevalue !== 1){
        //what resuults we want from this button-roll.
       //if we get any number other than 1.
    
    cscore += dicevalue;
    document.getElementById("current-" + aplayer).textContent = cscore;
      //if we get 1.
    } else {
        nextPlayer();
    }
    lastroll = dicevalue;
    }
    
});




//Hold button 
document.querySelector(".btn-hold").addEventListener("click", function() {
   //this if statement check if our boolean gameon is still true thene do further work here, if false, button don't work.
    if (gameon) {
    //Add current score to global score
 gscore[aplayer] += cscore;
 //update the global score on browser display or ui
 document.querySelector("#score-" + aplayer).textContent = gscore[aplayer];
   }
//introducing if-else statement if on hold buttton player win or not.
 // if gain winning score then ---
 if (gscore[aplayer] >= 50){
     //show text winner and hide dice.
    document.getElementById("name-" + aplayer).textContent = "WINNER!";
    document.getElementById("current-" + aplayer).textContent = "0";
    document.querySelector(".dice").style.display = "none";
    //change css of panels by adding removing classes.
    document.querySelector(".player-" + aplayer + "-panel").classList.remove("active");
    document.querySelector(".player-" + aplayer + "-panel").classList.add("winner");
    //gameon boolean gives false when  gscore is >=10, so all the places where gameon is true sop working until gscore < 0 or gscore=0.
    gameon = false;
 } else {
     //else its next player turn.
 nextPlayer();
 }
});




//New game Start button
document.querySelector(".btn-new").addEventListener("click", start);




//Instead of adding new game code different time we create a function for new game and call it when we need it.
function start(){
//assign global variables their values.
gscore = [0,0];
cscore = 0;
aplayer = 0; 
gameon = true;

  //setting all scores and global scores to 0.
 document.getElementById("score-0").textContent = "0";
 document.getElementById("score-1").textContent = "0";
 document.getElementById("current-0").textContent = "0";
 document.getElementById("current-1").textContent = "0";
 //dice will not display until game is started.
 document.querySelector(".dice").style.display = "none";
 //players get their starting name.
 document.getElementById('name-0').textContent = 'Player 1';
 document.getElementById('name-1').textContent = 'Player 2';
 //all the css for winning and active players removed.
 document.querySelector('.player-0-panel').classList.remove('winner');
 document.querySelector('.player-1-panel').classList.remove('winner');
 document.querySelector('.player-0-panel').classList.remove('active');
 document.querySelector('.player-1-panel').classList.remove('active');
 //css active added to default starting player.
 document.querySelector('.player-0-panel').classList.add('active');


}




//Instead of changing players turn at different event, we create function which can be call for this
function nextPlayer() {
    //adding ternary operator as neat substitute to if-else statement.
    aplayer === 0 ? aplayer = 1 : aplayer = 0;

    //declaring current scores to 0.
    cscore = 0;
    //current scores to 0.
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";  
    //chanaging css of current active player link to class active with help of toggling of class.
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    /*
    We can do this without toggling by simply mentioningg add and remove of class.
    like  first of all we remove active class and its css from current player and mention it in starting of this function.
    //document.querySelector(".player-" + aplayer + "-panel").classList.remove("active"); 
    //document.querySelector(".player-" + aplayer + "-panel").classList.add("active");
    */
    
}
