var yearOfBirth = [1997, 1992, 2000, 1990, 1983, 2002];

var agesOfPerson = [];

for (var i = 0; i < yearOfBirth.length; i++){
   agesOfPerson[i] = 2020 - yearOfBirth[i];
}

for (i = 0; i < agesOfPerson.length; i++) {

    if(agesOfPerson[i] >= 18){
       console.log("Person " + (i + 1) + " is " + agesOfPerson[i] + " is year old and a grown man.");
    } else {
         console.log("Person is " + agesOfPerson[i] + " is year old and not a grown man.");
        }
}
