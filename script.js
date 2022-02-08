// calculator app

let firstOperand = "";
let secondOperand = "";
let currentOperation = null;
let shouldResetScreen = false;

const numberButtons = document.querySelectorAll(
  ".calc-buttons > [data-type='number']"
);
const operatorButtons = document.querySelectorAll(
  ".calc-buttons > [data-type='operator']"
);
const clearBtn = document.getElementById("clear");
const allclearBtn = document.getElementById("allclear");
const decimalBtn = document.getElementById("decimal");
const equalsBtn = document.getElementById("equals");
const userInput = document.getElementById("user-input");
const result = document.getElementById("result");

// keyboard support
window.addEventListener("keydown", handleKeyboardInput);

equalsBtn.addEventListener("click", evaluate);
clearBtn.addEventListener("click", clear);
allclearBtn.addEventListener("click", allClear);
decimalBtn.addEventListener("click", appendDecimal);

numberButtons.forEach((btn) =>
  btn.addEventListener("click", () => appendNumber(btn.textContent))
);

operatorButtons.forEach((btn) =>
  btn.addEventListener("click", () => setOperation(btn.textContent))
);

// appends a number to the screen
function appendNumber(num) {
  if (result.textContent === "0" || shouldResetScreen) {
    resetScreen();
  }
  result.textContent += num;
}

// resets display
function resetScreen() {
  result.textContent = "";
  shouldResetScreen = false;
}

// allclear function to clear calc
function allClear() {
  result.textContent = "0";
  userInput.textContent = " ";
  firstOperand = "";
  secondOperand = "";
  currentOperation = null;
  shouldResetScreen = false;
}

// appends decimal
function appendDecimal() {
  if (shouldResetScreen) resetScreen();
  if (result.textContent === "") result.textContent = "0";
  if (result.textContent.includes(".")) return;
  result.textContent += ".";
}

// clear button
function clear() {
  if (result.textContent === "0") return;
  result.textContent = result.textContent.toString().slice(0, -1);
}

// set operation
function setOperation(operator) {
  if (currentOperation !== null) evaluate();
  firstOperand = result.textContent;
  currentOperation = operator;
  userInput.textContent = `${firstOperand} ${currentOperation}`;
  shouldResetScreen = true;
}

// evaluate
function evaluate() {
  if (currentOperation === null || shouldResetScreen) return;
  if (currentOperation === "÷" && result.textContent === "0") {
    alert("You can't divide by 0!");
    return;
  }
  secondOperand = result.textContent;
  result.textContent = roundResult(
    operate(currentOperation, firstOperand, secondOperand)
  );
  userInput.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
  currentOperation = null;
}

// rounding to 3 decimal places
function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

// add
function add(x, y) {
  return x + y;
}

// subtract
function subtract(x, y) {
  return x - y;
}

// multiply
function multiply(x, y) {
  return x * y;
}

// divide
function divide(x, y) {
  return x / y;
}

// modulus
function mod(x, y) {
  return x % y;
}

// operate
function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "×":
      return multiply(a, b);
    case "÷":
      if (b === 0) return null;
      else return divide(a, b);
    case "%":
      if (b === 0) return null;
      else return mod(a, b);
    default:
      return null;
  }
}

// keyboard input handling
function convertOperator(keyboardOperator) {
  if (keyboardOperator === "/") return "÷";
  if (keyboardOperator === "*") return "×";
  if (keyboardOperator === "-") return "-";
  if (keyboardOperator === "+") return "+";
  if (keyboardOperator === "%") return "%";
}

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) {
    appendNumber(e.key);
    return;
  }
  if (e.key === ".") {
    appendDecimal();
    return;
  }
  if (e.key === "=" || e.key === "Enter") {
    evaluate();
    return;
  }
  if (e.key === "Backspace") {
    clear();
    return;
  }
  if (e.key === "Escape") {
    allClear();
    return;
  }
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    setOperation(convertOperator(e.key));
    return;
  }
}
