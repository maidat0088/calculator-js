/* == Class == */
class Calculator {
  constructor(previousDisplayNumberHTMLElement, currentOperandTextElement) {
    this._previousNumberHTMLElement = previousDisplayNumberHTMLElement;
    this._currentNumberHTMLElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this._currentNumber = "";
    this._previousNumber = "";
    this._operation = undefined;
    this._isNewOperation = true;
  }

  setNewOperation() {
    this._isNewOperation = true;
  }

  appendNumber(inputNumber) {
    if (inputNumber === "+-") {
      this.compute();
      let currentParseFloatNumber = parseFloat(this._currentNumber) * -1;
      this._currentNumber = currentParseFloatNumber.toString();
      return;
    }

    if (this._isNewOperation) {
      this.clear();
      this._isNewOperation = false;
    }

    if (inputNumber === "." && this._currentNumber.includes(".")) return;
    if (inputNumber === "%" && this._currentNumber.includes("%")) return;

    this._currentNumber = `${this._currentNumber}${inputNumber}`;
  }

  chooseOperation(inputOperation) {
    if (this._currentNumber === "") {
      if (this._operation != undefined && this._operation != inputOperation) {
        this._operation = inputOperation;
      }
      return;
    }

    if (this._previousNumber !== "") {
      this.compute();
    }
    this._operation = inputOperation;
    this._previousNumber = this._currentNumber;
    this._currentNumber = "";
    this._isNewOperation = false;
  }

  delete() {
    this._currentNumber = this._currentNumber.toString().slice(0, -1);
  }

  compute() {
    let computation;

    if (this._previousNumber.toString().includes("%")) {
      this._previousNumber = parseFloat(this._previousNumber) * 0.01;
    }

    if (this._currentNumber.toString().includes("%")) {
      this._currentNumber = parseFloat(this._currentNumber) * 0.01;

      if (this._previousNumber === "") {
        this._previousNumber = 1;
      }
    }

    const previousParseFloatNumber = parseFloat(this._previousNumber);
    const currentParseFloatNumber = parseFloat(this._currentNumber);

    if (isNaN(previousParseFloatNumber) || isNaN(currentParseFloatNumber))
      return;

    switch (this._operation) {
      case "+":
        computation = previousParseFloatNumber + currentParseFloatNumber;
        break;
      case "-":
        computation = previousParseFloatNumber - currentParseFloatNumber;
        break;
      case "*":
        computation = previousParseFloatNumber * currentParseFloatNumber;
        break;
      case "/":
        computation = previousParseFloatNumber / currentParseFloatNumber;
        break;
      default:
        return;
    }
    const resultRegex = /(0+$|\.$)/ig;
    this._currentNumber = computation.toFixed(15).toString().replaceAll(resultRegex,'').replaceAll(resultRegex,'');
    this._operation = undefined;
    this._previousNumber = "";

    console.log("COMPUTE");
    console.log(this);
  }

  console() {
    console.log(this);
  }

  updateDisplay() {

    
    this._currentNumberHTMLElement.innerText = this._currentNumber;

    if (this._operation != undefined) {
      this._previousNumberHTMLElement.innerText = `${this._previousNumber} ${this._operation}`;
    } else {
      this._previousNumberHTMLElement.innerText = "";
    }

    this.console();
  }
 
}
/* == Class == */

/* == DOM Element == */
const numberButtons = document.querySelectorAll(
  ".calculator__keys--number"
);
const operationButtons = document.querySelectorAll(
  ".calculator__keys--operation"
);
const previousDisplay = document.querySelector(
  ".calculator__display__previous"
);
const currentDisplay = document.querySelector(
  ".calculator__display__current"
);
/* == DOM Element == */


/* == DOM Events == */
 
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.getAttribute("value"));
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.getAttribute("value"));
    calculator.updateDisplay();
  });
});

const clearDisplay = () => {
  previousDisplay.innerText = "";
  currentDisplay.innerText = "0";
  calculator.clear();
};

const compute = () => {
  calculator.compute();
  calculator.updateDisplay();
  calculator.setNewOperation();
};

document.addEventListener("keydown", function (event) {
  console.log(event.key);

  const patternForNumbers = /^[0-9]/g;
  const patternForOperators = /[+\-*\/]/g;

  if (event.key.match(patternForNumbers)) {
    event.preventDefault();
    calculator.appendNumber(event.key);
    calculator.updateDisplay();
  }
  if (event.key === ".") {
    event.preventDefault();
    calculator.appendNumber(event.key);
    calculator.updateDisplay();
  }
  if (event.key === "%") {
    event.preventDefault();
    calculator.appendNumber(event.key);
    calculator.updateDisplay();
  }
  if (event.key.match(patternForOperators)) {
    event.preventDefault();
    calculator.chooseOperation(event.key);
    calculator.updateDisplay();
  }
  if (event.key === "Enter" || event.key === "=") {
    event.preventDefault();
    calculator.compute();
    calculator.setNewOperation();
    calculator.updateDisplay();
  }
  if (event.key === "Backspace") {
    event.preventDefault();
    calculator.delete();
    calculator.updateDisplay();
  }
  if (event.key == "Delete") {
    event.preventDefault();
    calculator.clear();
    calculator.updateDisplay();
  }
});

/* == DOM Events == */

/* == Main Script */
const calculator = new Calculator(previousDisplay, currentDisplay);
calculator.console() ;
