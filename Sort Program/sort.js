$.noConflict();
jQuery(document).ready(function($){
  

  //DATA STRUCTURE
  //////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////
const employees = [
  {fname: "Gen", lname: "Rufford", email: "genrufford@gmail.com", status: 0,id: 1},
  {fname: "Harry", lname: "Potter", email: "hary@potter@gmail.com", status: 1, id: 2},
  {fname: "Ron", lname: "Shepherd", email: "ronshepherd@gmail.com", status: 0, id: 3},
  {fname: "Hermione", lname: "Watson", email: "hermionewatson@gmail.com", status: 1, id: 4},
  {fname: "Drake", lname: "Joseph", email: "drakejoseph@gmail.com", status: 1, id: 5},
  {fname: "Slytherin", lname: "Weird", email: "slytherinweird@hogwarts.com", status: 0, id: 6},
  {fname: "Grejard", lname: "Winchester", email: "grejardwinchester@supernatural.com", status: 1, id: 7},
  {fname: "Leonard", lname: "Swan", email: "leonardswan@tbbt.com", status: 1, id: 8},
  {fname: "Sheldon", lname: "Salvatore", email: "sheldonsalvatore@tvd.com", status: 0, id: 9},
  {fname: "Luther", lname: "Sean", email: "lutherswan@who.com", status: 1, id: 10},
];










//UI 
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
  //To display Add pop-up
$(".here").click(function(){
  $("#form1").css("display", "block");
});


////To Hide Add pop-up
$(".close").click(function(){
  $("#form1, #form3").css("display", "none");
});


//Show Data on UI
function listshow(arr){
  
let edit = "";
arr.forEach(function(current, index){
  let html, newhtml;

html = '<tr id="%bno%"><td>%sno%</td><td>%fname%</td><td>%lname%</td><td>%email%</td><td><label class="switch"><input class="chec" type="checkbox" %checked% value=%val%><span class="slider round"></span></label></td><td><button class="time_btn"><i class="fa fa-times" aria-hidden="true"></i></button><br><br><button class="edit"><i class="fa fa-pencil" aria-hidden="true"></i></button></td></tr>';
newhtml = html.replace('%bno%', current.id);
newhtml = newhtml.replace("%sno%", index+1);
newhtml = newhtml.replace("%fname%", current.fname);
newhtml = newhtml.replace("%lname%", current.lname);
newhtml = newhtml.replace("%email%",current.email);
newhtml = newhtml.replace("%val%",current.status);
if(current.status == 1){
  newhtml = newhtml.replace("%checked%", "checked");
};
edit += newhtml;
});
$(".tbody").html(edit);
}


//Search Works
////////////////////////////
///////////////////////////

  $("#searchfield").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

  //Paid button in work
  $(".paidcont").click(function(){
    
    var value = employees.filter(function(item) {
      return item.status == 1;
    });
    listshow(value);
  });

  //Unpaid button in work
  $(".unpaidcont").click(function(){
    
    var value = employees.filter(function(item) {
      return item.status == 0;
    });
    listshow(value);
  });


  //All button work
  $(".allcont").click(function(){
    listshow(employees);
  });

  //Toggling Of Switch
  $(document).on('click', ".chec", function(){
    let item = $(this).closest("tr").attr("id");
    let index = employees.findIndex(function(current){
      return current.id == item;
  });
  if(employees[index].status == 1){
    employees[index].status = 0;
  } else {

    employees[index].status = 1;
  }
  listshow(employees);
  console.table(employees);
  });










//App Control
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////


//Submit and store data
let fname, lname, email, status;
$(".submit_btn").click(function(){
  
  if (employees.length > 0){
    id = employees[employees.length - 1].id + 1;
  } else {
    id = 0;
  }
 
fname = $("#fname").val();
lname = $("#lname").val();
email = $("#email").val();
status = $("#status:checked").val() != undefined ? 1 : 0;

if (fname !== "" && lname !== "" && email !== ""){
  employees.push({fname, lname, email,status,id});
listshow(employees);
$("#email,#fname,#lname").val("");
$("#status").prop("checked", false);
$("#fname").focus();
console.table(employees);
};
});


//Delete button in function
$(document).on('click',".time_btn", function(event){
 let item = $(this).closest("tr").attr("id");
 $(this).closest("tr").remove();
 let index = employees.findIndex(function(current){
   return current.id == item;
 });
 employees.splice(index, 1);
 console.table(employees);
})


//Edit Button click Show
////////////////////////
////////////////////////

$(document).on('click', ".edit", function(){
  $("#form3").css("display", "block");
  var item = $(this).closest("tr").attr("id");
  var index = employees.findIndex(function(current){
    return current.id == item;
  });
  $("#editid").val(index);
  $("#editid2").val(item);
  if (employees[index]){
    $("#fnameupt").val(employees[index].fname);
    $("#lnameupt").val(employees[index].lname);
    $("#emailupt").val(employees[index].email);
    var a = employees[index].status;
    if(a == 1){
      $("#statusupt").prop("checked", true);
    } else {
      $("#statusupt").prop("checked", false);
    };
  };
})

//Collect Data from Edit box
$(document).on('click', "#update", function(){
  fname = $("#fnameupt").val();
  lname = $("#lnameupt").val();
  email = $("#emailupt").val();
  status = $("#statusupt:checked").val() != undefined ? 1 : 0;
  console.log(status);
  var index = $("#editid").val();
  var item = $("#editid2").val();

  if (fname !== "" && lname !== "" && email !== ""){
  employees.splice(index, 1, {fname, lname, email,status: parseInt(status),id: parseInt(item)});
  listshow(employees);
  $("#form3").css("display", "none");
  console.table(employees);
  };
  })  





function init (){
  listshow(employees);
  console.table(employees);
}
init();


});
