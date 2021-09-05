let bill = document.getElementsByTagName("input")[0];
let custom = document.getElementsByTagName("input")[1];
let people = document.getElementsByTagName("input")[2];
let headings = document.getElementsByTagName("h3");
let buttons = document.getElementsByTagName("button");
let billPiece = 0;
let peoplePiece = 0;

//Bill input:
bill.addEventListener("click", function () {
  bill.style.color = "hsl(186, 14%, 43%)";
  bill.style.borderColor = "hsl(172, 67%, 45%)";
  people.style.borderColor = "hsl(0, 0%, 100%)";
  headings[1].style.display = "none";
  headings[4].style.display = "none";
  document.onkeyup = function () {
    let keyPressed = bill.value;
    let last = keyPressed[keyPressed.length - 1];
    last = parseInt(last);
    if (Number.isInteger(last) == false && keyPressed.includes(".") == false) {
      billPiece = parseInt(keyPressed.slice(0, -1));
    } else if (Number.isInteger(last) || keyPressed.includes(".")) {
      billPiece = keyPressed;
    }
    bill.value = billPiece;
    if (isNaN(bill.value)) {
      bill.value = 0;
    } else if (bill.value.startsWith(0)) {
      bill.value = bill.value.substr(1);
    }
    if (bill.value.length > 0) {
      buttons[6].style.opacity = 1;
    } else {
      buttons[6].style.opacity = 0.4;
    }
  };
});

//Button input:
buttons[0].onclick = function () {TipCalc(1.05);};
buttons[1].onclick = function () {TipCalc(1.10);};
buttons[2].onclick = function () {TipCalc(1.15);};
buttons[3].onclick = function () {TipCalc(1.25);};
buttons[4].onclick = function () {TipCalc(1.50);};
buttons[5].onkeyup = function () {TipCalc(1 + (custom.value / 100));}

//People input:
people.addEventListener("click", function () {
  people.style.color = "hsl(186, 14%, 43%)";
  people.style.borderColor = "hsl(172, 67%, 45%)";
  bill.style.borderColor = "hsl(0, 0%, 100%)";
  headings[1].style.display = "none";
  headings[4].style.display = "none";
  document.onkeyup = function () {
    let keyPressed = people.value;
    let last = keyPressed[keyPressed.length - 1];
    last = parseInt(last);
    if (Number.isInteger(last) == false) {
      peoplePiece = parseInt(keyPressed.slice(0, -1));
    } else {
      peoplePiece = parseInt(keyPressed);
    }
    people.value = peoplePiece;
    if (isNaN(people.value)) {
      people.value = 0;
    } else if (people.value.startsWith(0)) {
      people.value = people.value.substr(1);
    }
    if (people.value.length > 0) {
      buttons[6].style.opacity = 1;
    } else {
      buttons[6].style.opacity = 0.4;
    }
  };
});

//Reset Button:
buttons[6].onclick = function () {
  if (buttons[6].style.opacity == 1) {
    bill.value = "";
    billPiece = 0;
    people.value = "";
    peoplePiece = 0;
    document.getElementsByTagName("p")[1].innerHTML = "$0.00";
    document.getElementsByTagName("p")[3].innerHTML = "$0.00";
    buttons[6].style.opacity = 0.4;
  }
};

//Function for tip:
function TipCalc(tip) {
  let total = billPiece * tip;
  let totalPerson = total / peoplePiece;
  let totalTip = (total - billPiece) / peoplePiece;
  if (bill.value == 0 && people.value == 0) {
    headings[1].style.display = "block";
    headings[4].style.display = "block";
    bill.style.borderColor = "hsl(0, 100%, 50%)";
    people.style.borderColor = "hsl(0, 100%, 50%)";
  } else if (bill.value == 0) {
    headings[1].style.display = "block";
    bill.style.borderColor = "hsl(0, 100%, 50%)";
  } else if (people.value == 0) {
    headings[4].style.display = "block";
    people.style.borderColor = "hsl(0, 100%, 50%)";
  } else {
    document.getElementsByTagName("p")[1].innerHTML = "$" + totalTip.toFixed(2);
    document.getElementsByTagName("p")[3].innerHTML = "$" + totalPerson.toFixed(2);
  }
}
