let isHighlighted = true;
let vLastHighlighted;
let firstNum = "";
let operationSymbol = "";
let secondNum = "";
let showSecondNum = false;

window.onload = function (vSymbol) {
  setResult(0);

};

function setResult(displayVal) {
  let display = "";
  display = display + displayVal;
  document.getElementById("displayid").innerHTML = display.replace(".", ",");
}

function getResult() {
  return document.getElementById("displayid").innerHTML;
}

function add(key) {
    if (showSecondNum) {
        setResult(0);
        showSecondNum = false;
    }
    let result = getResult();
    if (result.length < 10 ||(result.lastIndexOf(",") <= 9 && result.length < 11)) {
      if (result != "0" || isNaN(key)){
        setResult(result + key);
      }else{
        setResult(key);
      }
    }
    if (result.length > 10 ||(result.lastIndexOf(",") >= 9 && result.length > 11)) {
      disableButtons("number");
      disableButtons("btn-point");
    }
}

function clean(vSymbol) {
  unhighlightOperators(vLastHighlighted);
  setResult(0);

  disableButtons("btn-0");
  enableButtons("number");
  disableButtons("btn-changesign");
  enableClear();
  enableEqual();
  enableButtons("operator");
  enableButtons("btn-point");
}

function equalUnhighlight() {
  unhighlightOperators(vLastHighlighted);
}

function changeSign() {
  let number = "";
  number = getResult();
  let negative = "";
  negative = negative + number.replace(",", ".");
  setResult(-negative);
}

function highlightOperators(vSymbol) {
  unhighlightOperators(vLastHighlighted);
  if (isHighlighted == true) {
    isHighlighted = false;
    switch (vSymbol) {
      case "multiply":
        multiply.style.background = "#5b7aa1";
        vLastHighlighted = vSymbol;
        break;
      case "divide":
        divide.style.background = "#5b7aa1";
        vLastHighlighted = vSymbol;
        break;
      case "sum":
        sum.style.background = "#5b7aa1";
        vLastHighlighted = vSymbol;
        break;
      case "substract":
        substract.style.background = "#5b7aa1";
        vLastHighlighted = vSymbol;
        break;
      default:
        break;
    }
  }
}

function unhighlightOperators(vSymbol) {
  if (isHighlighted == false) {
    isHighlighted = true;
    switch (vSymbol) {
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
    enableButtons("operator");
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
  setResult(result);
  moreThanTenNums();
  showErrorMessage();
  firstNum = 0;
  secondNum = 0;
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
    if (result == "Infinity" || result == "NaN") {
      setResult("ERROR");
      disableButtons("number");
      disableButtons("operator");
      disableButtons("btn-changesign");
      disableButtons("btn-point");
      disableButtons("btn-equal");
    }
}

function checkKeyOperators(keyPressed){
  if (keyPressed == "*" || "-" || "+" || "/"){
    return true;
  }else{
    return false;
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

