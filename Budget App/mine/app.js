//We using IIFE for Modules to make codes private.

//Budget Controller
//Module for all functions related to budget calculation
var budgetController = (function (){

    //Expense object Constructor so all expenses later stored as instances of this.
    var Expense = function(id,description,value){

        this.id =  id;
        this.description = description;
        this.value = value;
    }
    //Income object Constructor so all income later stored as instances of this.
    var Income = function(id,description,value){

        this.id =  id;
        this.description = description;
        this.value = value;
    }

    Expense.prototype.calcPercentage = function(totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);

        } else {
            this.percentage = -1;
        }
        
    };
    
    Expense.prototype.getPercentage = function() {
        return this.percentage;
    };

    var calculateTotal = function(type) { //take input as parameter
        var sum = 0;  //initial sum is o of budget.
        data.allItems[type].forEach(function(cur) { //forEach loop to  add all data of either in or exp type 
            sum += cur.value;  //current value is the values we looping to the existiing sum
        });
        data.totals[type] = sum;//atlast fill the sum of either inc or exp total
    };



    //this stores all data as an object and is a data structure to our app.
    var data = {
        allItems: {
            exp: [],  //in form of exp and inc bcz  input type is mentioned as inc and exp in our HTML files first input field which ditinguish them.
            inc: []   //all expenses and income are stored herethis object data where all child object and methods point to main Object "Data"
        },

        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    }


    return {
        addItem: function(type,des,val) {
            var newItem,ID;

            //[1 2 3 4 5], next ID = 6
            //[1 2 4 6 8], next ID = 9
            // ID = last ID + 1
            
            // Create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;//data.allItems[type].length(to locate last element index in array)  = length of array
            } else {                                                             //and.id after this means we want id of that last element of array and add one on that id
                ID = 0;
            }

            if(type === 'inc'){
                newItem = new Income(ID, des, val);//create a new income object from Income constructor if conditions true
            } else if (type === 'exp') {
                newItem = new Expense(ID, des, val);//create a new expense object from Expense constructor if conditions true
            }

            //Push it into our Data Structure
            data.allItems[type].push(newItem);

            //Return the new element
            return newItem;
        },

        deleteItem: function(type, id) {
            var ids, index;
            
            // id = 6
            //data.allItems[type][id];
            // ids = [1 2 4  8]
            //index = 3
            
            ids = data.allItems[type].map(function(current) { //map is another method fro looping but at end it gives data in array
                return current.id;                            //we want all id iin array to handle them and use them easily
            });

            index = ids.indexOf(id);  //index store the position of id in array we get when delete button click 

            if (index !== -1) {  //the id on index we select get splice (remove) index paraameter is location and 1 is how many elements we want to delete
                data.allItems[type].splice(index, 1);
            }
            
        },
        

        calculateBudget : function() {
            //calculate total expense and income
             calculateTotal("exp");
             calculateTotal("inc");

             // Calculate the budget: income - expenses
             data.budget = data.totals.inc - data.totals.exp;
            
             // calculate the percentage of income that we spent
             if (data.totals.inc > 0) { //for percentage if there's income data presebt then calculate percentage else just show -1
                 data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
             } else {
                 data.percentage = -1;
             }            
             
             // Expense = 100 and income 300, spent 33.333% = 100/300 = 0.3333 * 100
         },

        testing : function() {
            console.log(data); //this method is no use its for developing purpose to chck our data time o time in console
        },


        calculatePercentages: function() {
            
            /*
            a=20
            b=10
            c=40
            income = 100
            a=20/100=20%
            b=10/100=10%
            c=40/100=40%
            */
            
            data.allItems.exp.forEach(function(cur) {//running for each loop 
               cur.calcPercentage(data.totals.inc);
            });
        },
        
        
        getPercentages: function() {
            var allPerc = data.allItems.exp.map(function(cur) {
                return cur.getPercentage();
            });
            return allPerc;//returning all percentages stored in array
        },
        

        getBudget: function() {
            return { //return all our buget calculation in form of object
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        },
        
    };
})();












//UI Controller
//MOdule for all functions related to inputt and outputs and display from and to UI
var UIController = (function (){

       
    var DOMstrings = {    //just for better organize all the classes from HTML file or if we want to change some location just change in this object. 
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        inputBtn: ".add__btn",
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    }

    var formatNumber = function(num, type) {
        var numSplit, int, dec, type;
        /*
            + or - before number
            exactly 2 decimal points
            comma separating the thousands

            2310.4567 -> + 2,310.46
            2000 -> + 2,000.00
            */

        num = Math.abs(num);//convert number to strings
        num = num.toFixed(2); //create decimals upto 2 places as parameter 123 = 123.00

        numSplit = num.split('.');// split from decimal and split send data in array

        int = numSplit[0];//integer before decimal
        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3); //input 23510, output 23,510
        }              //substr copy string data from array from index position(1st parameter), upto which charac we want to copy

        dec = numSplit[1];//number after decimal

        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
                   //ternary operator to change  + - button on page   
                 };

    var nodeListForEach = function(list, callback) { //our own foreach loop which need a callback function as a parameter here
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };
    

    return {
        getInput : function(){

            return { //only details we want to be public not private from IIFE have to return from IIFE so other can use it
                type: document.querySelector(DOMstrings.inputType).value, //will be inc or exp as you see on HTML file.
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };//shariing inputt field data as an object return to all modules so they can acces it.
        },

        addListItem: function(obj, type) {
            var html, newHtml, element;
            // Create HTML string with placeholder text
            
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                
                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;
                
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            
            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id); //we use replace to %id% with relevant content of our values stored in html variable up above
            newHtml = newHtml.replace('%description%', obj.description);//since we replace already something from html variable now  its bcm newhtml any other changes should be on it if again we do that on that previous replace going to fail.
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));
            
            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        deleteListItem: function(selectorID) {
            
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
            
        },
        

        clearFields: function() {
            var fields, fieldsArr;
            
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);//querySelectorAll gives output as a list
            
            fieldsArr = Array.prototype.slice.call(fields);//Array is a Javascript Global object constructor for arrays and we add a prototype method to convert list we getting from queryselectorall into array with help of call and slice.
            
            fieldsArr.forEach(function(current, index, array) {//for each loop need a callback function with given parameters always if we want to use them.-
                current.value = ""; //loop go and take each element in array and current the element in loop set value with empty string.
            });
            
            fieldsArr[0].focus();//change focus of css to decription field.
        },
        
        displayBudget: function(obj) {
               
            var type;
            obj.budget > 0 ? type = "inc" : type = "exp";

            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, "inc");
            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, "exp");
           
            if (obj.percentage > 0) {  //if no incomoe we show % = -1 but we don't want -1 on display of our app so if %is less than 0 than just show "--"
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }
            

        },

        displayPercentages: function(percentages) {
            
            var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);
            
            nodeListForEach(fields, function(current, index) {  //we kind of create our own foreach loop whic work when callback function of this source function calls this is a part of callback.
                
                if (percentages[index] > 0) { //same like we do to allover budget %
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                }
            });
            
        },
        
        
        displayMonth: function() {
            var now, months, month, year;
            
            now = new Date();  //calling Date Constructor object of javascript
            //var christmas = new Date(2016, 11, 25);
            
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            month = now.getMonth();//using methods of Date constructor
            
            year = now.getFullYear();
            document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;
        },//months in Date constructor start from 0-11 so we save all months in array so where their indexes represnt which month
        //like if we get 8 from now.getmonth it means its September(not August) but in array we used that 8 to find index were at 8 index iin array we have August
        
        
        changedType: function() {
            
            var fields = document.querySelectorAll(
                DOMstrings.inputType + ',' +
                DOMstrings.inputDescription + ',' +
                DOMstrings.inputValue);
            
            nodeListForEach(fields, function(cur) { //using same for Each loop that we created.
               cur.classList.toggle('red-focus'); 
            });
            
            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
            
        },



            getDOMstrings: function(){
            return DOMstrings; //sharing DOMstrings to other modules
        }
    };
    
})();














//App Controller
//Module for all the operations and execution of App
var controller = (function (budgetCtrl,UICtrl){

     //Create a function for all event listening
    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();//importing getdomstrings method from uictrl module.
        
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);//when button click

        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();//when events happen run ctrladditem
            };//when enter clicks on keyboard

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);  //delete button but here we use event delegation. via event bubbling 
        
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
        });

    }

    var updateBudget = function(){
        // 1.Calculate the Budget
        budgetCtrl.calculateBudget();
        // 2. Return the Budget
        var budget = budgetCtrl.getBudget();
        // 3. Display the Budget on UI
        UICtrl.displayBudget(budget);
    }

    var updatePercentages = function() {
        
        // 1. Calculate percentages
        budgetCtrl.calculatePercentages();
        
        // 2. Read percentages from the budget controller
        var percentages = budgetCtrl.getPercentages();
        
        // 3. Update the UI with the new percentages
        UICtrl.displayPercentages(percentages);
    };
    
    
    var ctrlAddItem = function(){
        var input,newItem;

    // 1. Get the field input data
     input = UICtrl.getInput();//all input data store in input variable

     if (input.description !== "" && !isNaN(input.value) && input.value > 0) { //if inputs are valid then do further work, here isNan means not a number true, but !isNaN opposite of this if true then do false

     // 2. Add the item to the budget controller
     newItem = budgetCtrl.addItem(input.type, input.description, input.value);//get our stored data from data structures.
     // 3. Add the item to the UI
     UICtrl.addListItem(newItem, input.type);
     // 4. Clear the fields
     UICtrl.clearFields();
      // 5. Calculate and update budget
     updateBudget();
     //6.Calculate and update Percentage
     updatePercentages();
     }

     
    };


        var ctrlDeleteItem = function(event) { //take Event constructor of the global object its in built constructor for Events same we use in enter event for our keycode  in setup event listener
            var itemID, splitID, type, ID;
            
            itemID = event.target.parentNode.parentNode.parentNode.parentNode.id; //parentnode go to one up parent element fom <i> element 4 times means go 4parent element up upto div with class container.
                                         //target is the event which was click and id is we select the id from that element in ur case it was the individual object or the list of income or expense we see on screen with their specific id
            if (itemID) {
                
                //inc-1
                splitID = itemID.split('-'); //split split the string before and after the string we gave to Parameters.
                type = splitID[0];  
                ID = parseInt(splitID[1]); //we getting id as string so we convert it inti number same we do to value before
                
                // 1. delete the item from the data structure
                budgetCtrl.deleteItem(type, ID);  //here we sending type and id to this funuction
                
                // 2. Delete the item from the UI
                UICtrl.deleteListItem(itemID);
                
                // 3. Update and show the new budget
                updateBudget();
                
                // 4. Calculate and update percentages
                updatePercentages();
            }
        }

        return {
            init: function() {  //sharing initiation function to public
                
                console.log('Application has started.');
                UICtrl.displayMonth();
                UICtrl.displayBudget({
                    budget: 0,     //keep all values of data structure to 0 at starting 
                    totalInc: 0,
                    totalExp: 0,
                    percentage: -1
                });
                setupEventListeners();  //initiate all events listener
            }
        };




    




})(budgetController,UIController);//Because we want to link other two modules to link with each other. 

controller.init();//initiation function from controller module.