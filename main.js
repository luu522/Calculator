let MAX_DIGITS_IN_DISPLAY = 10;  
let isTheOperatorHighlighted = true;
let LastHighlightedOperator = "";
let firstNum = "";
let operationSymbol = "";
let secondNum = "";
let result = "";
let isSecondNumberShown = false; 

window.onload = function() {
  calculatorReset();
};

function setResult(displayVal) {
  let newDisplay = displayVal.toString().replace(".", ",");
  document.getElementById("displayid").innerHTML = newDisplay;

  // if (newDisplay.includes(',')) {
  //   disableButtons("btn-point");
  // }
}

function getResult() {
  return document.getElementById("displayid").innerHTML;
}

function addNumbersToDisplay(clickedNum) {
  if (isSecondNumberShown) {
      // reset ??
      setResult(0);
      isSecondNumberShown = false;
  }
  result = getResult();

  if (clickedNum.includes(",")) {
    if (disableSecondComma() && isNewDigitAllowed()) {
      setResult(result + clickedNum);
    } 
  } else if (isNewDigitAllowed()) {
    if (result != "0") {
      setResult(result + clickedNum);
    } else {
      setResult(clickedNum);
    }
  }
}

function isNewDigitAllowed(){
  MAX_DIGITS_IN_DISPLAY = 10;
  result = getResult();
  if (result.includes(',') && result.includes('-')) {
    MAX_DIGITS_IN_DISPLAY = MAX_DIGITS_IN_DISPLAY + 2;
  } else if (result.includes(',') || result.includes('-')){
    MAX_DIGITS_IN_DISPLAY = MAX_DIGITS_IN_DISPLAY + 1;
  }

  if (result.length < MAX_DIGITS_IN_DISPLAY) {
    return true;
  } else{
    return false;
  }
}

function disableSecondComma(){
  result = getResult();
  if (result.includes(",")) {
    return false;
  } else{
    return true;
  }
}

function calculatorReset() {
  unhighlightOperatorByClass(LastHighlightedOperator);
  setResult(0);
}

function changeNumberSign() {
  let displayNumbers = "";
  displayNumbers = getResult();
  displayNumbers = displayNumbers.replace(",",".");

  if (displayNumbers.charAt(displayNumbers.length - 1) == ".") {    
    displayNumbers = -displayNumbers + ".";                                 // adds a comma to the negative number
  } else {
    displayNumbers = -displayNumbers;
  }
  setResult(displayNumbers);
}

function highlightOperatorByClass(ClickedOperator) {
  unhighlightOperatorByClass(LastHighlightedOperator);
  if (isTheOperatorHighlighted == true) {
    isTheOperatorHighlighted = false;
    switch (ClickedOperator) {
      case "multiply":
        let multiplyButton = document.getElementsByClassName("multiply");
        multiplyButton[0].classList.add("highlightOperatorByClass");

        LastHighlightedOperator = ClickedOperator;
        break;
      case "divide":
        let divideButton = document.getElementsByClassName("divide");
        divideButton[0].classList.add("highlightOperatorByClass");

        LastHighlightedOperator = ClickedOperator;
        break;
      case "sum":
        let sumButton = document.getElementsByClassName("sum");
        sumButton[0].classList.add("highlightOperatorByClass");

        LastHighlightedOperator = ClickedOperator;
        break;
      case "substract":
        let substractButton = document.getElementsByClassName("substract");
        substractButton[0].classList.add("highlightOperatorByClass");

        LastHighlightedOperator = ClickedOperator;
        break;
      default:
        break;
    }
  }
}

function unhighlightOperatorByClass(ClickedOperator) {
  if (isTheOperatorHighlighted == false) {
    isTheOperatorHighlighted = true;
    switch (ClickedOperator) {
      case "multiply":
        let multiplyButton = document.getElementsByClassName("multiply");
        multiplyButton[0].classList.remove("highlightOperatorByClass");
        break;
      case "divide":
        let divideButton = document.getElementsByClassName("divide");
        divideButton[0].classList.remove("highlightOperatorByClass");
        break;
      case "sum":
        let sumButton = document.getElementsByClassName("sum");
        sumButton[0].classList.remove("highlightOperatorByClass");
        break;
      case "substract":
        let substractButton = document.getElementsByClassName("substract");
        substractButton[0].classList.remove("highlightOperatorByClass");
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
      result = Number(parseFloat(firstNum) + parseFloat(secondNum));
      break;
    case "-":
      result = Number(parseFloat(firstNum) - parseFloat(secondNum));
      break;
    case "*":
      result = Number(parseFloat(firstNum) * parseFloat(secondNum));
      break;
    case "/":
      result = Number(parseFloat(firstNum) / parseFloat(secondNum));
      break;
    default:
      break;
  }
  secondNum = 0;
  firstNum = 0;
  if (result.toString().includes(".")) {
    let decimalsLength = checkHowManyDecimalsAreAllowed();          // guardamos el numero de decimales que podemos tener
    result = parseFloat(result).toFixed(decimalsLength);
  }
  setResult(parseFloat(result));
  showErrorMessage();
  isSecondNumberShown = true;
}

function showErrorMessage(){
  let result = "";
  result = getResult();
  if (result == "Infinity" || result == "NaN" || result == "-Infinity") {
    setResult("ERROR");
  }

  MAX_DIGITS_IN_DISPLAY = 10;
  if (result.includes(',') && result.includes('-')) {
    MAX_DIGITS_IN_DISPLAY = MAX_DIGITS_IN_DISPLAY + 2;
  } else if (result.includes(',') || result.includes('-')){
    MAX_DIGITS_IN_DISPLAY = MAX_DIGITS_IN_DISPLAY + 1;
  }
  if (result.length > MAX_DIGITS_IN_DISPLAY) {
    setResult("ERROR");
  }
}

function checkHowManyDecimalsAreAllowed(){
  let numberWithDecimals = "";
  let decimalsAllowed = 10;
  numberWithDecimals = numberWithDecimals + result;
  if (numberWithDecimals.includes(".") && numberWithDecimals.includes("-")) {
    decimalsAllowed = numberWithDecimals - numberWithDecimals.indexOf(".") + 1;          // +1 por el negativo
  } else if (numberWithDecimals.includes(".")) {
    decimalsAllowed = decimalsAllowed - numberWithDecimals.indexOf(".");
  }
  return decimalsAllowed;
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
      highlightOperatorByClass(ClickedOperator);
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