let display = document.querySelector('.display');
let buttons = document.querySelectorAll('.calculator-buttons');
let operator = '';
let val1 = null;
let val2 = null;
let lastBtn = null;


/* Create a new function operate that takes an operator and 2 numbers and then calls one of the above functions on the numbers. */
const operate = (operator, a, b) => {
    switch (operator) {
        case '+':
            return math.add(a, b);
            break;
        case '-':
            return math.subtract(a, b); 
            break;
        case '/':
            return math.divide(a, b);
            break;
        case '*':
            return math.multiply(a, b);
            break;
        default:
            return 'INVALID!';
    }
}


/*Your calculator is going to contain functions for all of the basic math operators you typically find on simple calculators,
so start by creating functions for the following items and testing them in your browser’s console.
add
subtract
multiply
divide */
const math = {
    add: (a, b) => {
        return a + b;
    },
    subtract: (a, b) => {
        return a - b;
    },
    divide: (a, b) => {
        return a / b;
    },
    multiply: (a, b) => {
        return a * b;
    }
}

const nullify = () => {
    val1 = null;
    val2 = null;

}

/* Create the functions that populate the display when you click the number buttons… 
you should be storing the ‘display value’ in a variable somewhere for use in the next step. */



buttons.forEach(button => button.addEventListener('click', getDisplay));

let getDisplay = (e) =>  {
    let btnVal = e.target.textContent;

    if (!isNaN(btnVal)) {
        if (lastBtn === null || !isNaN(lastBtn) || lastBtn === '.') {
            display.append(btnVal);
        } else {
            display.textContent = btnVal;
        }
    } else {
        if (display.textContent.length > 0) {
            if (btnVal === '.') {
                if (!display.textContent.includes('.')) display.append(btnVal);
            } else if (btnVal === 'DEL') {
                display.textContent = display.textContent.slice(0, -1);
            } else if (btnVal === 'AC') {
                display.textContent = null;
                restartValues();
            } else {
                if (btnVal != '=') {
                    if (val1 === null) {
                        val1 = +display.textContent;
                        operator = btnVal;
                    } else {
                        if (val2 === null) {
                            val2 = +display.textContent;
                            let result = operate(operator, val1, val2);
                            display.textContent = format(result);
                            val1 = result;
                            val2 = null;
                            operator = btnVal;
                        }
                    }
                } else {
                    if (operator.length > 0 && val1 != null && !isNaN(display.textContent)) {
                        val2 = +display.textContent;
                        let result = operate(operator, val1, val2);
                        display.textContent = format(result);
                        restartValues();
                    }
                }
            }
        } 
    }
    lastBtn = btnVal;
}


const restartValues = () => {
    num1 = null;
    num2 = null;
    op = '';
}

const format = (val) => {
    return countDecimals(val) < 9 ? val : val.toFixed(9);
}

const countDecimals = (val) => {
    if(Math.floor(val) === val) return 0;
    return val.toString().split(".")[1].length || 0; 
}