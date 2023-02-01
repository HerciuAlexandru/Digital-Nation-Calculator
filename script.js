class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    // cream o clasa care contine functiile si inputurile pt calc
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear(); // de fiecare data cand cream un nou calc se sterge cel prev
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined; // pt ca nu treb sa fie nici o op selectata la inceput
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1); // taie ultima cifra adaugata
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return; // . il adaugam o singura data ... return opreste functia
    this.currentOperand = this.currentOperand.toString() + number.toString(); // pt ca trebuie sa facem append la string si nu sa il calc
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return; // daca currrent este empty atunci return pt ca nu are ce calc
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;

      case "-":
        computation = prev - current;
        break;

      case "*":
        computation = prev * current;
        break;

      case "÷":
        computation = prev / current;
        break;

      case "x^":
        computation = Math.pow(prev, current);
        break;

      case "%":
        computation = (prev / 100) * current;
        break;

      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]); // trebuie sa separam nr in decimal si int pt a putea utilza .05 s
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        // cand vrem sa adunam un nr il trece pe cel care vrem sa il adunam sus
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
); //init

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
