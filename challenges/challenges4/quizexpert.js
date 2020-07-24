/*Use IIFE to make our whole code inaccessible to outside and other programmers can't face
 a problem with this.*/
(function() {
   //constructor for our objects, so from which we can create instances.
function Question(questions, answers, correct) {
    this.questions = questions;
    this.answers = answers;
    this.correct = correct;
}

//method in our prototype to access objects and show relevant question
Question.prototype.display$question = function() {
console.log(this.questions);
for(i = 0; i < this.answers.length; i++){
console.log(i + " : " + this.answers[i]);
}
}

//method in our prototype to access input ans in prompt and check if its correct or not.
Question.prototype.check$answer = function(givenans, callback) {
    var score;
  if(givenans == this.correct){
      console.log("Correct Answer.");
      score = callback(true);
  } else {
      console.log("Sorry mate, Wrong Answer.Try Next.");
      score = callback(false);
  }
  this.display$score(score);
}

Question.prototype.display$score = function (score) {

    console.log("The current score is " + score);
    console.log("============================");
}
//All questionsfor different objects
var q1 = "Is Narendra Modi is current Prime Minister of India";
var q2 = "From which political party P.M. Narendra Modi belongs to?";
var q3 = "Is P.M. Narendra modi married?";
var q4 = "In which year of decade 2010-2020, B.J.P. came into power?"

//all answers for different objects
var a1 = ["Yes", "No"];
var a2 = ["Congress", "B.J.P.", "B.S.P.", "Republican Party"]
var a3 = ["Yes", "No"];
var a4 = ["2012","2014","2016","2018","2020"];

//objects with different question and their answers.
var fq1 = new Question(q1,a1,0);
var fq2 = new Question(q2,a2,1);
var fq3 = new Question(q3,a3,1);
var fq4 = new Question(q4,a4,1);

//array storing data of all objects
var fq = [fq1,fq2,fq3,fq4];

function status (){
    var currentscore = 0;
     return function (correct){
         if (correct){
            currentscore++;
         }
         return currentscore;
     }
     
}

var keepscore = status();


//iniate this function one time.
 nextquestion();

function nextquestion () {
//expression for calculating random number between 0,1,2,3
var ran = Math.floor(Math.random() * fq.length);

/*expression with method of to display our question with the help of array directing which question
 should access on which index.*/
fq[ran].display$question();

//create a prompt which going to take our answer.
var promptt = prompt("Select the correct option for the answer.");
if (promptt !== "exit") {
/*expression with method of to display our answer with the help of array directing which answer 
should access on which index, and also take our input value via prompt.*/
fq[ran].check$answer(parseInt(promptt),keepscore);
/*calling next function again because it stored in memory before execution so it can be 
processed.now this function stuck in loop*/
nextquestion();
}
}
})();
