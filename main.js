let isTheOperatorHighlighted = true;
let LastHighlightedOperator = "";
let firstNum = "";
let operationSymbol = "";
let secondNum = "";
let isSecondNumberShown = false; 

window.onload = function() {
  setResult(0);
  cleanDisplay();
};

function setResult(displayVal) {
  let display = "";
  display = display + displayVal;
  document.getElementById("displayid").innerHTML = display.replace(".", ",");

  let result = getResult();
  if (result.includes(',') || result.includes('.')) {
      disableButtons("btn-point");
  }
}

function getResult() {
  return document.getElementById("displayid").innerHTML;
}

function addNumbersToDisplay(clickedNum) {
  if (isSecondNumberShown) {
      setResult(0);
      isSecondNumberShown = false;
      enableButtons("btn-changesign");
  }
  let result = getResult();
  if (result.includes(',') && result.includes('-') ) {
    if (result.length < 12) {
      setResult(result + clickedNum);
    }
  } else if (result.includes(',') || result.includes('-') ) {
    if (result.length < 11) {
      setResult(result + clickedNum);
    }
  } else {
    if (result.length < 10) {
      if (result != "0" || isNaN(clickedNum)){
        setResult(result + clickedNum);
      } else{
        setResult(clickedNum);
      }
    }
  }
   if (result.length > 8 ||(result.lastIndexOf(",") >= 9 && result.length > 10)) {
     disableButtons("number");
     disableButtons("btn-point");
  }
}

function cleanDisplay() {
  unhighlightOperator(LastHighlightedOperator);
  setResult(0);

  disableButtons("btn-0");
  enableButtons("number");
  enableButtons("operator");
  enableEqual();
  enableButtons("btn-changesign");
  enableButtons("btn-point");
}

function changeNumberSign() {
  let displayNumbers = "";
  displayNumbers = getResult();
  if (displayNumbers.charAt(displayNumbers.length - 1) == ",") {
    displayNumbers = -displayNumbers.replace(",", ".") + ",";             // adds a comma to the negative number
  } else {
    displayNumbers = -displayNumbers.replace(",", ".");
  }
  setResult(displayNumbers);
}

function highlightOperator(ClickedOperator) {
  unhighlightOperator(LastHighlightedOperator);
  if (isTheOperatorHighlighted == true) {
    isTheOperatorHighlighted = false;
    switch (ClickedOperator) {
      case "multiply":
        multiply.style.background = "#5b7aa1";
        LastHighlightedOperator = ClickedOperator;
        break;
      case "divide":
        divide.style.background = "#5b7aa1";
        LastHighlightedOperator = ClickedOperator;
        break;
      case "sum":
        sum.style.background = "#5b7aa1";
        LastHighlightedOperator = ClickedOperator;
        break;
      case "substract":
        substract.style.background = "#5b7aa1";
        LastHighlightedOperator = ClickedOperator;
        break;
      default:
        break;
    }
  }
}

function unhighlightOperator(ClickedOperator) {
  if (isTheOperatorHighlighted == false) {
    isTheOperatorHighlighted = true;
    switch (ClickedOperator) {
      case "multiply":
        multiply.style.background = "#013668";
        break;
      case "divide":
        divide.style.background = "#013668";
        break;
      case "sum":
        sum.style.background = "#013668";
        break;
      case "substract":
        substract.style.background = "#013668";
        break;
      default:
        break;
    }
  }
}

function getFirstNum(ClickedOperator){
  isSecondNumberShown = true;
    operationSymbol = ClickedOperator;
    firstNum = getResult();
    firstNum = firstNum.replace(",",".");

    disableButtons("btn-0");
    disableButtons("btn-changesign");
    enableButtons("number");
    enableButtons("btn-point");
}

function getSecondNum(){
  if (isSecondNumberShown == true) {
    setResult("");
  }
    secondNum = getResult();
    secondNum = secondNum.replace(",",".");
}

function equalBtn() {
  switch (operationSymbol) {
    case "+":
      result = Number((parseFloat(firstNum) + parseFloat(secondNum)).toFixed(9));
      break;
    case "-":
      result = Number((parseFloat(firstNum) - parseFloat(secondNum)).toFixed(9));
      break;
    case "*":
      result = Number((parseFloat(firstNum) * parseFloat(secondNum)).toFixed(9));
      break;
    case "/":
      result = Number((parseFloat(firstNum) / parseFloat(secondNum)).toFixed(9));
      break;
    default:
      break;
  }
  secondNum = 0;
  firstNum = 0;
  setResult(result);
  showErrorMessage();
  isSecondNumberShown = true;
}

function showErrorMessage(){
    let result = "";
    result = getResult();
    if (result == "Infinity" || result == "NaN" || result == "-Infinity" || result.length > 10) {
      setResult("ERROR");

      disableButtons("btn-0");
      disableButtons("number");
      disableButtons("operator");
      disableButtons("btn-equal");
      disableButtons("btn-point");
      disableButtons("btn-changesign");
    }
}

// disabling buttons

function disableButtons(className){
  let idResult = document.getElementsByClassName(className);
  for (let index = 0; index < idResult.length; index++) {
    let idButton = document.getElementsByClassName(className);
    idButton[index].style.backgroundColor = "#525f6a";
    idButton[index].style.cursor = "not-allowed";
    idButton[index].disabled= true;
  }
}

// enabling buttons

function enableButtons(className){
  let idResult = document.getElementsByClassName(className);
  for (let index = 0; index < idResult.length; index++) {
    let idButton = document.getElementsByClassName(className);
    idButton[index].style.backgroundColor = "#013668";
    idButton[index].style.cursor = "default";
    idButton[index].disabled= false;
  }
}

// function to enable just the equal button-

function enableEqual(){
  document.getElementById("equal").style.backgroundColor = "#bad8f8";
  document.getElementById("equal").style.cursor = "default";
  document.getElementById("equal").disabled= false;
}

//keyboard

function doKey(event) {
  event.preventDefault();
  let keyValue = event.key;
  console.log("keyValue: " + keyValue);
  switch (keyValue) {
    case "Enter":
      equalBtn();
      break;
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      add(keyValue);
      break;
    case "0":
      let result = "";
      result = getResult();
      if (result.includes("0")) {
        setResult(result);
      } else {
        add(keyValue)
      }
      break;
    case ",":
      add(keyValue);
      break;
    case "Escape":
      cleanDisplay();
      break;
    case "Control":
      changeNumberSign();
      break;
    case checkOperatorkeys(keyValue) == true:
      operator(keyValue);
      highlightOperator(ClickedOperator);
      break;
    default:
      console.log("vacio");
      break;
  }
}

function checkOperatorkeys(keyPressed) {
  if (keyPressed == "*" || "-" || "+" || "/") {
    return true;
  } else {
    return false;
  }
}