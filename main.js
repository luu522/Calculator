let isHighlighted = true;
let vLastHighlighted;
let firstNum = "";
let operationSymbol = "";
let secondNum = "";
let showSecondNum = false;

window.onload = function (vSymbol) {
  setResult(0);
  clean(vSymbol);
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
    if (result != "0" || isNaN(key)) setResult(result + key);
    else setResult(key);
  }
}

function clean(vSymbol) {
  unhighlightOperators(vLastHighlighted);
  setResult(0);
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
  checkError();
  operationWithoutSecondNum();
  firstNum = 0;
  secondNum = 0;
}

function moreThanTenNums(){
    let result = getResult();
    if (result.length > 10 ) {
        setResult("ERROR");
    }
}

function checkError(){
    let result = "";
    result = getResult();
    if (result == "Infinity" || result == "NaN") {
      setResult("ERROR");
    }
}

// document.addEventListener("keydown", (Event) =>{
//   var keyvalue = Event.key;
//   if (parseFloat(keyvalue)) {
//     add(keyvalue)
//   } else if (checkKeyOperators(keyvalue) == true) {
//     highlightOperators(keyvalue);
//   } else if (keyvalue == "0") {
//     add(keyvalue);
//   }else if (keyvalue == "Escape") {
//     clean();
//   }else if (keyvalue == "Control") {
//     changeSign();
//   }else if ("Enter") {
//     equalBtn();
//   }
// })

function checkKeyOperators(keyPressed){
  if (keyPressed == "*" || "-" || "+" || "/"){
    return true;
  }else{
    return false;
  }
}

function operationWithoutSecondNum(){
    
}
