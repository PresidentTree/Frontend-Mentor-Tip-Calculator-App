let bill = document.getElementsByTagName("p")[0];
let custom = document.getElementById("custom");
let people = document.getElementsByTagName("p")[2];
let buttons = document.getElementsByTagName("button");
let headings = document.getElementsByTagName("h3");
let billNumArr = [];
let customNumArr = [];
let peopleNumArr = [];
let billNum = 0;
let newIndex = 0;
let customNum = 0;
let peopleNum = 0;
let total = 0;
let tipNum = 0;
let totalNum = 0;

//Bill input:
bill.addEventListener("click", function () {
  bill.style.color = "hsl(186, 14%, 43%)";
  bill.style.borderColor = "hsl(172, 67%, 45%)";
  people.style.borderColor = "hsl(0, 0%, 100%)";
  headings[1].style.display = "none";
  headings[4].style.display = "none";
  //Creates an array of numbers:
  document.onkeydown = function (event) {
    let keyPressed = event.key;
    keyPressed = parseInt(keyPressed);
      if (Number.isInteger(keyPressed)) {
        billNumArr.push(keyPressed);
      }
      //Adds and keeps decimal point:
      if (billNumArr.length > 2 && billNumArr.includes(".") == false) {
        billNumArr.splice(billNumArr.length - 2, 0, ".");
      }
      if (billNumArr.indexOf(".") != billNumArr.length - 2 && billNumArr.includes(".") == true) {
        newIndex = billNumArr.indexOf(".");
        billNumArr.splice(newIndex, 1);
        billNumArr.splice(billNumArr.length - 2, 0, ".");
      }
      billNum = billNumArr.join("");
      document.getElementsByTagName("p")[0].innerHTML = billNum;
    }
});

//Custom tip:
custom.addEventListener("click", function () {
  document.getElementsByTagName("p")[1].innerHTML = 0;
  //Creates an array of numbers:
  document.onkeydown = function (event) {
    let keyPressed = event.key;
    keyPressed = parseInt(keyPressed);
      if (Number.isInteger(keyPressed)) {
        customNumArr.push(keyPressed);
      }
      customNum = customNumArr.join("");
      document.getElementsByTagName("p")[1].innerHTML = customNum;
      customNum = (customNum / 100) + 1;
      tipCalc(customNum);
    }
});

//People input:
people.addEventListener("click", function () {
  people.style.color = "hsl(186, 14%, 43%)";
  people.style.borderColor = "hsl(172, 67%, 45%)";
  bill.style.borderColor = "hsl(0, 0%, 100%)";
  headings[1].style.display = "none";
  headings[4].style.display = "none";
  //Creates an array of numbers:
  document.onkeydown = function (event) {
    let keyPressed = event.key;
    keyPressed = parseInt(keyPressed);
      if (Number.isInteger(keyPressed)) {
        peopleNumArr.push(keyPressed);
      }
      peopleNum = peopleNumArr.join("");
      document.getElementsByTagName("p")[2].innerHTML = peopleNum;
    }
});

//Gets tip:
buttons[0].onclick = function () {tipCalc(1.05);}
buttons[1].onclick = function () {tipCalc(1.10);}
buttons[2].onclick = function () {tipCalc(1.15);}
buttons[3].onclick = function () {tipCalc(1.25);}
buttons[4].onclick = function () {tipCalc(1.50);}

function tipCalc(tip) {
  if (billNum == "0" && peopleNum == "0") {
    headings[1].style.display = "block";
    bill.style.borderColor = "hsl(0, 100%, 50%)";
    headings[4].style.display = "block";
    people.style.borderColor = "hsl(0, 100%, 50%)";
  } else if (billNum == "0") {
    headings[1].style.display = "block";
    bill.style.borderColor = "hsl(0, 100%, 50%)";
  } else if (peopleNum == "0") {
    headings[4].style.display = "block";
    people.style.borderColor = "hsl(0, 100%, 50%)";
  } else if (tip > 0) {
    total = billNum * tip;
    totalNum = total / peopleNum;
    tipNum = (total - billNum) / peopleNum;
    document.getElementsByTagName("p")[6].innerHTML = "$" + totalNum.toFixed(2);
    document.getElementsByTagName("p")[4].innerHTML = "$" + tipNum.toFixed(2);
    buttons[6].style.opacity = 1;
  }
}

//Activates reset button:
buttons[6].onclick = function () {
  if (totalNum != 0 && tipNum != 0) {
    document.getElementsByTagName("p")[0].innerHTML = 0;
    document.getElementsByTagName("p")[2].innerHTML = 0;
    document.getElementsByTagName("p")[6].innerHTML = "$0.00";
    document.getElementsByTagName("p")[4].innerHTML = "$0.00";
    buttons[6].style.opacity = 0.4;
    bill.style.borderColor = "hsl(0, 0%, 100%)";
    people.style.borderColor = "hsl(0, 0%, 100%)";
    billNum = 0;
    peopleNum = 0;
    customNum = 0;
    billNumArr = [];
    peopleNumArr = [];
    customNumArr = [];
    tipNum = 0;
    totalNum = 0;
  }
}
