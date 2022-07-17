class Aufgaben {
  constructor(id, beschreibung, erledigungsdatum, erledigt, userID) {
    this.id = id;
    this.beschreibung = beschreibung;
    this.erledigungsdatum = erledigungsdatum;
    this.erledigt = erledigt;
    this.userID = userID;
  }
}

userIDHtml.value = '';
datumHtml.value = '';
zielHtml.value = '';

var aufgabenArray = []; //alle Aufgaben in 1 Array
var chipArray = []; //alle Chips in 1 Array
var closeElement; //var to close all the elements for input
var showElement; //var to show all the elements for input
var getColor; //var to change the color of chips
var chipClicked = []; //var to see if this chip is clicked or not
var chipFinished = []; //array für chips, die erledigt sind
var chipOpen = false; //var to check if a chip is currently open
var chipStateAdd; //makes a copy of the id to close
var confirmationFinish = false; //to confirm if you want to finish
var deleteVariable; //var to delete chips
var checkForParameters; //Var to stop closeElements() from failing with if statement
var confirmDelete; //var to confirm the delete of a chip
var makeMoreParameters = true; //boolean to enable the parameters to appear when you click a chip
var clickedColor; //var to change color if chip has been clicked
var clickedColorCheck = false; //Var to check if a chip has been selected
var clickedColorRemove; //var to store the id of a chip you wanted to remove the color from
var counterVariable; //var to stop you from hovering over chips and coloring them
var clickedCheckArray = [];
var testFirstTime = true; 
var colorChange;
var resp; //this is a test, please ignore
var upload; //var to upload chips

for (i = 0; i<101 ;i++){
  var testHome = new Aufgaben(i,'testNum'+i,'11.11.2000',true,1)
  aufgabenArray[i]=testHome;
  if(i==100){showTodos()}
}

var navbar = document.getElementsByName('navbar');
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky){
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}


function changeColorIn(this_id) {
  if (chipFinished[this_id] != true) {
    getColor = document.getElementById(this_id);
    getColor.style.backgroundColor = "#00ccff";
  } else {
    getColor = document.getElementById(this_id);
    getColor.style.backgroundColor = "#00ffae";
  }
}
//change color on hover

function changeColorOut(this_id) {
  if (aufgabenArray[this_id-1].erledigt != true) {
    if (clickedCheckArray[this_id] != true) {
      getColor = document.getElementById(this_id);
      getColor.style.backgroundColor = "#e5e5e5";
    } else {
      getColor = document.getElementById(this_id);
      getColor.style.backgroundColor = "#ffff80";
      clickedColorCheck = false;
    }
  } else if (clickedCheckArray[this_id] == true){
    getColor = document.getElementById(this_id);
    getColor.style.backgroundColor = "#ffff80";
    clickedColorCheck = false;
    } else {
       getColor = document.getElementById(this_id);
       getColor.style.backgroundColor = "#00ff00";
      }
}
//change color on (not)hover

function changeColorGreen(this_id) {
  getColor = document.getElementById(this_id+1);
  getColor.style.backgroundColor = "#00ff00";
}
//change color to green when confirmed

function showElements() {
  
  showElement = document.getElementById("userIDHtml"); //var for showing Chip
  showElement.style.display = "";
  showElement = document.getElementById('zielHtml');
  showElement.style.display = "";
  showElement = document.getElementById('datumHtml');
  showElement.style.display = "";
  showElement = document.getElementById('labelDatum');
  showElement.style.display = "";
  showElement = document.getElementById('labelZiel');
  showElement.style.display = "";
  showElement = document.getElementById('labelUserID');
  showElement.style.display = "";
  showElement = document.getElementById('buttonChip');
  showElement.style.display = "";
  showElement = document.getElementById('buttonClose');
  showElement.style.display = "";
  closeElement = document.getElementById('buttonShow');
  closeElement.style.display = "none";
}



function showTodos() {
/*   fetch('http://dev-01.fida.local:9099/unsecured/TODO')
  .then(response => response.json())
  .then(httpResponse => {
      aufgabenArray = httpResponse; */
  
  const element = document.getElementById('div1');
  chipArray = [];
  element.innerHTML = "";
    for (i = 0; i < aufgabenArray.length; i++) {
      chipArray.push(document.createElement('div'));
      var chipArrayLength = chipArray.length - 1; //Array length von chipArray
      chipArray[chipArrayLength].classList.add("chip");
      const node = document.createTextNode(aufgabenArray[i].beschreibung);
      chipArray[chipArrayLength].appendChild(node);
      const child = document.getElementById('c1');
      chipArray[chipArrayLength].setAttribute("id", chipArray.length);
      chipArray[chipArrayLength].setAttribute("onclick", 'chipClick(' + chipArray.length + ')');
      chipArray[chipArrayLength].setAttribute("onmouseover", 'changeColorIn(' + chipArray.length + ')');
      chipArray[chipArrayLength].setAttribute("onmouseout", 'changeColorOut(' + chipArray.length + ')');
      element.insertBefore(chipArray[chipArrayLength], child);
      firstTime = false;
    
    if (aufgabenArray[chipArrayLength].erledigt != true) {
      getColor = document.getElementById(chipArray.length);
      getColor.style.backgroundColor = "#e5e5e5";
     } else {
        getColor = document.getElementById(chipArray.length);
        getColor.style.backgroundColor = "#00ff00";
      }
    }
  }

//show input elements on button click

function addParameters() {
  var userID = userIDHtml.value;
  var aufgabe = zielHtml.value;
  var datum = datumHtml.value;
  var id = null;
  if (userID != '' && aufgabe != '' && datum != '') {
    if (aufgabe.length < 101 && aufgabe.length > 3) {
      aufgabenArray.push(new Aufgaben(id, aufgabe, datum, 'false', userID));
      var aufgabenTotal = aufgabenArray.length - 1; //Array length von aufgabenAnzahl  
    } if (userID == '') { console.log('invalid title') }
    if (aufgabe == null || aufgabe.length > 100 || aufgabe.length < 4) { console.log('invalid ziel') }
  };

  //give aufgaben to array 

  if (userID != '' && aufgabe != '' && aufgabe.length < 101 && aufgabe.length > 3) {
    var confirmation = confirm('bist du sicher, dass du ein Chip mit diesen Eigenschaften erstellen willst? , aufgabe: ' + aufgabenArray[aufgabenTotal].Ziel +
     ', Datum: ' + aufgabenArray[aufgabenTotal].Datum + 'UserID: ' + aufgabenArray[aufgabenTotal].userID);
    if (confirmation == true) {
      /*chipArray.push(document.createElement('div'));
      let chipArrayLength = chipArray.length-1; //Array length von chipArray
      chipArray[chipArrayLength].classList.add("chip");
      const node = document.createTextNode(aufgabenArray[aufgabenTotal].Titel);
      chipArray[chipArrayLength].appendChild(node);
      const element = document.getElementById('div1');
      const child = document.getElementById('c1');
      chipArray[chipArrayLength].setAttribute("id",chipArrayLength);
      chipArray[chipArrayLength].setAttribute("onclick",'chipClick(this.id)');
      chipArray[chipArrayLength].setAttribute("onmouseover","changeColorBlue(this.id)");
      chipArray[chipArrayLength].setAttribute("onmouseout","changeColorWhite(this.id)")
      chipInformation[chipArrayLength] = aufgabenArray[chipArrayLength];
      element.insertBefore(chipArray[chipArrayLength],child); */
      showTodos();

      //'http://dev-01.fida.local:9099/unsecured/TODO'
/*         console.log(aufgabenArray[aufgabenArray.length-1]);
        fetch('http://dev-01.fida.local:9099/unsecured/TODO/', {
          method: "post", 
          headers: {
              'Content-type': 'application/json'
          },
          body: JSON.stringify(aufgabenArray[aufgabenArray.length-1])
            {
              "beschreibung": aufgabenArray[aufgabenArray.length-1].beschreibung,
              "erledigungsdatum": aufgabenArray[aufgabenArray.length-1].erledigungsdatum,
              "erledigt": aufgabenArray[aufgabenArray.length-1].erledigt,
              "userID": aufgabenArray[aufgabenArray.length-1].userID
            } 
          )
      }).then((resp) => {
        //var J = resp.json();
        //aufgabenArray[aufgabenArray.length-1].id = J.id;
        showTodos();
      }); */

      //create and give attributes to chips

      closeElement = document.getElementById("userIDHtml");
      closeElement.style.display = "none";
      closeElement = document.getElementById('zielHtml');
      closeElement.style.display = "none";
      closeElement = document.getElementById('datumHtml');
      closeElement.style.display = "none";
      closeElement = document.getElementById('labelDatum');
      closeElement.style.display = "none";
      closeElement = document.getElementById('labelZiel');
      closeElement.style.display = "none";
      closeElement = document.getElementById('labelUserID');
      closeElement.style.display = "none";
      closeElement = document.getElementById('buttonChip');
      closeElement.style.display = "none";
      closeElement = document.getElementById('buttonClose');
      closeElement.style.display = "none";
      showElement = document.getElementById('buttonShow');
      showElement.style.display = "";
      var removeValue = document.getElementById('userIDHtml');
      removeValue.value = '';
      removeValue = document.getElementById('zielHtml');
      removeValue.value = '';
      removeValue = document.getElementById('datumHtml');
      removeValue.value = '';

      //deletes input and labels

    } else {
      alert('Chip successfully deleted');
    }
  }
}

//assign aufgaben to Chips & show chip

var clickedColorCounter = true; //"counter" for clickedColor

function chipClick(this_id) {
  checkForParameters = 1;
  if (clickedColorCounter == true) {
    clickedColorCounter = false;
    chipClicked = false;
  }
  //if (chipClicked != true){ 
  if (makeMoreParameters == true) {
    const para = document.createElement("p1");
    para.classList.add('inputClick');
    para.setAttribute('style', "display:''");
    para.setAttribute('id', 'parametersId');
    var node3 = document.createTextNode("Beschreibung: " + aufgabenArray[this_id-1].beschreibung);
    var node4 = document.createTextNode(", Erledigungsdatum: " + aufgabenArray[this_id-1].erledigungsdatum);
    var node5 = document.createTextNode(", Erledigt: " + aufgabenArray[this_id-1].erledigt);
    var node6 = document.createTextNode(", UserID: " + aufgabenArray[this_id-1].userID);
    para.appendChild(node3);
    para.appendChild(node4);
    para.appendChild(node5);
    para.appendChild(node6);
    const element2 = document.getElementById("div2");
    const child2 = document.getElementById("p1");
    element2.insertBefore(para, child2);
    makeMoreParameters = false;
  } else {
    document.getElementById('parametersId').innerHTML = ('Beschreibung: ' + aufgabenArray[this_id-1].beschreibung +
      ', Erledigungsdatum: ' + aufgabenArray[this_id-1].erledigungsdatum + ', Erledigt: ' + aufgabenArray[this_id-1].erledigt 
      + ', UserID: ' + aufgabenArray[this_id-1].userID);  

    showElement = document.getElementById('parametersId');
    showElement.style.display = "";
  }
  chipClicked = true;
  chipOpen = true;
  showElement = document.getElementById('buttonClose');
  showElement.style.display = "";
  oneClick = true;
  deleteVariable = this_id-1;
  chipStateAdd = this_id-1;
  chipClicked = true;

  showElement = document.getElementById(this_id);
  showElement.style.backgroundColor = '#ffff80';
  clickedColor = true;
  clickedCheckArray = [];
  clickedColorCheck = true;
  clickedCheckArray[this_id]=true;
  

 if (testFirstTime != true){
  if (this_id != counterVariable) {
    if (aufgabenArray[counterVariable].erledigt == true){
     getColor = document.getElementById(counterVariable);
     getColor.style.backgroundColor = "#00ff00";
    } else {
       getColor = document.getElementById(counterVariable);
       getColor.style.backgroundColor = "#e5e5e5";
     }
   }
  }
 if(counterVariable != this_id){
     counterVariable = this_id;
 }
 
  if (aufgabenArray[this_id-1].erledigt == true) {
    showElement = document.getElementById('buttonDelete');
    showElement.style.display = "";
    closeElement = document.getElementById('buttonErledigt');
    closeElement.style.display = "none";
  } else {
    showElement = document.getElementById('buttonErledigt');
    showElement.style.display = '';
    closeElement = document.getElementById('buttonDelete');
    closeElement.style.display = "none";
  }

  clickedColorRemove = this_id-1; 
  testFirstTime = false;
  
  //Show parameters onclick
}
function chipDelete() {
  confirmDelete = false;
  confirmDelete = confirm('bist du sicher, dass du dieses Chip löschen willst?');
  if (confirmDelete == true) {
    closeElement = document.getElementById(deleteVariable+1);
    closeElement.style.display = "none";
    closeElement = document.getElementById("buttonDelete");
    closeElement.style.display = "none";
    closeElement = document.getElementById("parametersId");
    closeElement.style.display = "none";
    closeElement = document.getElementById("buttonClose");
    closeElement.style.display = "none";
  }}
/*     console.log(counterVariable)
    upload = aufgabenArray[counterVariable-1].id;
    console.log(upload)
      fetch('http://dev-01.fida.local:9099/unsecured/TODO/'+aufgabenArray[counterVariable-1].id, {
      method: 'delete',
      headers: {'Content-Type': 'application/json'}
    }
    )
  }
} */
//deletes the chip that is selected 



function finishChip(this_id) {
  confirmationFinish = false;
  if (chipFinished[this_id] != true) {
    confirmationFinish = confirm('bist du sicher, dass du mit dieser Aufgabe fertig bist?')
    if (confirmationFinish == true) {

      aufgabenArray[counterVariable-1].erledigt = true;

      fetch('http://dev-01.fida.local:9099/unsecured/TODO/'+aufgabenArray[counterVariable-1].id, {
        method: "PUT", 
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(
          {
            "beschreibung": aufgabenArray[counterVariable-1].beschreibung,
            "erledigungsdatum": aufgabenArray[counterVariable-1].erledigungsdatum,
            "erledigt": aufgabenArray[counterVariable-1].erledigt,
            "userID": aufgabenArray[counterVariable-1].userID
          }
        )
    });
      

      console.log(counterVariable);

      showElement = document.getElementById('buttonErledigt');
      showElement.style.display = "none";
      showElement = document.getElementById('buttonClose');
      showElement.style.display = "none";
      closeElement = document.getElementById('parametersId');
      closeElement.style.display = "none";
      aufgabenArray[counterVariable-1].Erledigt = 'Erledigt';
      changeColorGreen(counterVariable-1);
      clickedColor = false;
      getColor = document.getElementById(counterVariable-1);
      getColor.style.display = "#e5e5e5";
      chipClicked = false;
    }
  }
}
//ask if task is finished

function closeElements(this_id) {
  closeElement = document.getElementById("userIDHtml");
  closeElement.style.display = "none";
  closeElement = document.getElementById('zielHtml');
  closeElement.style.display = "none";
  closeElement = document.getElementById('datumHtml');
  closeElement.style.display = "none";
  closeElement = document.getElementById('labelDatum');
  closeElement.style.display = "none";
  closeElement = document.getElementById('labelZiel');
  closeElement.style.display = "none";
  closeElement = document.getElementById('labelUserID');
  closeElement.style.display = "none";
  closeElement = document.getElementById('buttonChip');
  closeElement.style.display = "none";
  closeElement = document.getElementById('buttonClose');
  closeElement.style.display = "none";
  showElement = document.getElementById('buttonShow');
  showElement.style.display = "";
  closeElement = document.getElementById('buttonClose');
  closeElement.style.display = "none";
  closeElement = document.getElementById('buttonDelete');
  closeElement.style.display = "none";
  removeValue = document.getElementById('userIDHtml');
  removeValue.value = '';
  removeValue = document.getElementById('zielHtml');
  removeValue.value = '';
  removeValue = document.getElementById('datumHtml');
  removeValue.value = '';
  if (aufgabenArray[counterVariable-1].erledigt != true){
    getColor = document.getElementById(counterVariable);
    getColor.style.backgroundColor = "#e5e5e5";
    } else {
      getColor = document.getElementById(counterVariable);
      getColor.style.backgroundColor = "#00ff00";
    }
    clickedCheckArray = [];
  if (checkForParameters != null) {
    checkForParameters = "";
    closeElement = document.getElementById('parametersId');
    closeElement.style.display = "none";
  }
  closeElement = document.getElementById('buttonErledigt');
  closeElement.style.display = "none";
  chipOpen = false;
  chipClicked = 'false';
  clickedColor = false;
}

//hide input space on button click

function onlyNumberKey(evt) {

  var ASCIICode = (evt.which) ? evt.which : evt.keyCode
  if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
    return false;
  return true;
}

//Only ASCII character in that range allowed
var httpResponse;
var para;
var node2;
var element2;
var child2; 


window.onscroll = function() {mzFunction()};
//when scroll do myFunction
