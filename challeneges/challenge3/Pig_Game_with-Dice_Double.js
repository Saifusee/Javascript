var cscore, gscore, aplayer, gameon, input, faltu,lastroll;



start();




 //Roll button
 document.querySelector(".btn-roll").addEventListener("click", function(){
    
    empty$input$field();
    //a boolean which on true process this function or in easy word activate button.
    if (gameon && faltu) {
    
    var dice1value = Math.floor(Math.random() * 6) + 1;
    var dice2value = Math.floor(Math.random() * 6) + 1;
    var dicevalue = dice1value + dice2value;
    document.getElementById("dice-1").src = "dice-" + dice1value + ".png";
    document.getElementById("dice-2").src = "dice-" + dice2value + ".png";
    if (lastroll === 12 && dicevalue === 12) {
       gscore[aplayer] = 0;
       document.querySelector("score-" + aplayer).textContent = "0";
    } else if (dice1value !== 1 && dice2value !== 1){
      //both dice should have values other than 1.  
      cscore += dice1value + dice2value;
        document.getElementById("current-" + aplayer).textContent = cscore;
        display$dice();
    } else {
       nextPlayer();
    }
    lastroll = dicevalue;
    }
 });




 //Hold button
 document.querySelector(".btn-hold").addEventListener("click", function() {
   if (faltu){
    //this if statement check if our boolean gameon is still true thene do further work here, if false, button don't work.
  if (gameon) {
   //Add current score to global score
gscore[aplayer] += cscore;
//update the global score on browser display or ui
document.querySelector("#score-" + aplayer).textContent = gscore[aplayer];
  }
//introducing if-else statement if on hold buttton player win or not.
// if gain winning score then ---
if (input <= gscore[aplayer] && input != 0){
    //show text winner and hide dice.
   document.getElementById("name-" + aplayer).textContent = "WINNER!";
   document.getElementById("current-" + aplayer).textContent = "0";
   hide$dice();
   //change css of panels by adding removing classes.
   document.querySelector(".player-" + aplayer + "-panel").classList.remove("active");
   document.querySelector(".player-" + aplayer + "-panel").classList.add("winner");
   //gameon boolean gives false when  gscore is >=10, so all the places where gameon is true sop working until gscore < 0 or gscore=0.
   gameon = false;
} else {
    //else its next player turn.
nextPlayer();
}
   }
 });
 



 //New game Start button
document.querySelector(".btn-new").addEventListener("click", start);

 



 function display$dice (){
    document.querySelector("#dice-1").style.display = "block";
    document.querySelector("#dice-2").style.display = "block";
 }




 function hide$dice (){
    document.querySelector("#dice-1").style.display = "none";
    document.querySelector("#dice-2").style.display = "none";
 }




function empty$input$field(){
     /*add a Javascript .value property which on initiating the function takes the value
     written in input field  and then stored it in variable input */
    //also we provide input variable a if statement so that when input is 0  show a alert message.
    input = document.getElementById("input").value;
        
    if(input > 0 && input <= 500){
        faltu = true;
    } else {
        faltu = false;
        alert("WARNING! MUST PROVIDE FINAL SCORE RANGE BETWEEN 1-500");
    }
}




 //Instead of adding new game code different time we create a function for new game and call it when we need it.
function start(){
    //assign global variables their values.
    gscore = [0,0];
    cscore = 0;
    aplayer = 0; 
    gameon = true;
    input = 0;
    faltu = true;
    
      //setting all scores and global scores to 0.
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    //dice will not display until game is started.
    hide$dice();
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