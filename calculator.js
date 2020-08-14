class Calculator {
    constructor(previousOutputText, currentOutputText) {
      this.previousOutputText = previousOutputText;
      this.currentOutputText = currentOutputText;
      this.clear();
    }
  
    clear() {
      this.currentOutput = '';
      this.previousOutput = '';
      this.operation = undefined;
    }
  
    delete() {
      this.currentOutput = this.currentOutput.toString().slice(0, -1);
    }
  
    appendNumber(number) {
      if (number === '.' && this.currentOutput.includes('.')) return;
      this.currentOutput = this.currentOutput.toString() + number.toString();
    }
  
    chooseOperation(operation) {
      if (this.currentOutput === '') return;
      if (this.previousOutput !== '') {
        this.calculate();
      }
      this.operation = operation;
      this.previousOutput = this.currentOutput;
      this.currentOutput = '';
    }
  
    calculate() {
      let calculation;
      const prev = parseFloat(this.previousOutput);
      const current = parseFloat(this.currentOutput);
      if (isNaN(prev) || isNaN(current)) return
      switch (this.operation) {
        case '+':
          calculation = prev + current;
          break;
        case '-':
          calculation = prev - current;
          break;
        case 'x':
          calculation = prev * current;
          break;
        case '÷':
          calculation = prev / current;
          break;
        default:
          return;
      }
      this.currentOutput = calculation;
      this.operation = undefined;
      this.previousOutput = '';
    }
  
    getDisplayNumber(number) {
      const stringNumber = number.toString();
      const integerDigits = parseFloat(stringNumber.split('.')[0]);
      const decimalDigits = stringNumber.split('.')[1];
      let integerDisplay;
      if (isNaN(integerDigits)) {
        integerDisplay = '';
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`;
      } else {
        return integerDisplay;
      }
    }
  
    updateDisplay() {
      this.currentOutputText.innerText =
        this.getDisplayNumber(this.currentOutput);
      if (this.operation != null) {
        this.previousOutputText.innerText =
          `${this.getDisplayNumber(this.previousOutput)} ${this.operation}`;
      } else {
        this.previousOutputText.innerText = '';
      }
    }
  }
  
  
  const numButtons = document.querySelectorAll('[data-number]');
  const operationButtons = document.querySelectorAll('[data-operation]');
  const equalsButton = document.querySelector('[data-equals]');
  const deleteButton = document.querySelector('[data-delete]');
  const allClearButton = document.querySelector('[data-all-clear]');
  const previousOutputText = document.querySelector('[data-previous-output]');
  const currentOutputText = document.querySelector('[data-current-output]');
  
  const calculator = new Calculator(previousOutputText, currentOutputText);
  
  numButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    });
  });
  
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    });
  });
  
  equalsButton.addEventListener('click', button => {
    calculator.calculate();
    calculator.updateDisplay();
  });
  
  allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
  });
  
  deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
  });