let isHighlighted = true;
let vLastHighlighted;
let firstNum = "";
let operationSymbol = "";
let secondNum = "";
let showSecondNum = false;

window.onload = function(Symbol) {
  setResult(0);
  clean(Symbol);
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

function add(key) {
  if (showSecondNum) {
      setResult(0);
      showSecondNum = false;
      enableButtons("btn-changesign");
  }
  let result = getResult();
  if (result.includes(',') && result.includes('-') ) {
    if (result.length < 12) {
      setResult(result + key);
    }
  } else if (result.includes(',') || result.includes('-') ) {
    if (result.length < 11) {
      setResult(result + key);
    }
  } else {
    if (result.length < 10) {
      if (result != "0" || isNaN(key)){
        setResult(result + key);
      } else{
        setResult(key);
      }
    }
  }
   if (result.length > 8 ||(result.lastIndexOf(",") >= 9 && result.length > 10)) {
     disableButtons("number");
     disableButtons("btn-point");
  }
}

function clean() {
  unhighlightOperators(vLastHighlighted);
  setResult(0);

  disableButtons("btn-0");
  enableButtons("number");
  enableButtons("operator");
  enableEqual();
  enableButtons("btn-changesign");
  enableButtons("btn-point");
}

function equalUnhighlight() {
  unhighlightOperators(vLastHighlighted);
}

function changeSign() {
  let numbersDisplay = "";
  numbersDisplay = getResult();
  if (numbersDisplay.charAt(numbersDisplay.length - 1) == ",") {
    numbersDisplay = -numbersDisplay.replace(",", ".") + ",";
  } else {
    numbersDisplay = -numbersDisplay.replace(",", ".");
  }
  setResult(numbersDisplay);
}

function highlightOperators(Symbol) {
  unhighlightOperators(vLastHighlighted);
  if (isHighlighted == true) {
    isHighlighted = false;
    switch (Symbol) {
      case "multiply":
        multiply.style.background = "#5b7aa1";
        vLastHighlighted = Symbol;
        break;
      case "divide":
        divide.style.background = "#5b7aa1";
        vLastHighlighted = Symbol;
        break;
      case "sum":
        sum.style.background = "#5b7aa1";
        vLastHighlighted = Symbol;
        break;
      case "substract":
        substract.style.background = "#5b7aa1";
        vLastHighlighted = Symbol;
        break;
      default:
        break;
    }
  }
}

function unhighlightOperators(Symbol) {
  if (isHighlighted == false) {
    isHighlighted = true;
    switch (Symbol) {
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

function getFirstNum(op){
    showSecondNum = true;
    operationSymbol = op;
    firstNum = getResult();
    firstNum = firstNum.replace(",",".");

    disableButtons("btn-0");
    disableButtons("btn-changesign");
    enableButtons("number");
    enableButtons("btn-point");
}

function getSecondNum(){
  if (showSecondNum == true) {
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
  moreThanTenNums();
  showErrorMessage();
  showSecondNum = true;
}

function moreThanTenNums(){
  let result = getResult();
  if (result.length > 10 ) {
    setResult("ERROR");
  }
}

function showErrorMessage(){
    let result = "";
    result = getResult();
    if (result == "Infinity" || result == "NaN" || result == "-Infinity") {
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

// functions to enable just the clear button and the equal

function enableClear(){
  document.getElementById("clear").style.backgroundColor = "#bad8f8";
  document.getElementById("clear").style.cursor = "default";
  document.getElementById("clear").disabled= false;
}

function enableEqual(){
  document.getElementById("equal").style.backgroundColor = "#bad8f8";
  document.getElementById("equal").style.cursor = "default";
  document.getElementById("equal").disabled= false;
}

//keyboard

document.addEventListener("keydown", (event) => {
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
      clean();
      break;
    case "Control":
      changeSign();
      break;
    case checkOperatorkeys(keyValue) == true:
      operator(keyValue);
      highlightOperators(Symbol);
      break;
    default:
      console.log("vacio");
      break;
  }
});

function checkOperatorkeys(keyPressed) {
  if (keyPressed == "*" || "-" || "+" || "/") {
    return true;
  } else {
    return false;
  }
}
