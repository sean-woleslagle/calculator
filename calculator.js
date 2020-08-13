class Calculator {
    constructor(previousOutput, currentOutput) {
        this.previousOutput = previousOutput;
        this.currentOutput = currentOutput;
        this.allClear();
    }

    allClear() {
        this.previousOutput = '';
        this.currentOutput = '';
        this.operation = undefined;
    }

    delete() {

    }

    appendNumber(number) {

    }

    chooseOperation(operation) {

    }

    calculate() {

    }

    updateDisplay() {

    }
}


const previousOutput = document.querySelector('[data-previous-output]');
const currentOutput = document.querySelector('[data-current-output]');
const numButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const delButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');

const calculator = new Calculator(previousOutput, currentOutput);

numButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay()
    });
});