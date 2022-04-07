// Get the operators working
// Get the equals working
// Get Keys working

const orperands = document.querySelectorAll('.operand');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear');
const sign = document.querySelector('.sign');
const percent = document.querySelector('.percent');
const decimal = document.querySelector('.decimal');
const screen = document.querySelector('#screen-value');

let previousOperand = 0;
let currentOperand = 0;
let previousResult = 0;
let operation = null;
let justOperated = false;

orperands.forEach((orperand) => {
    orperand.addEventListener('click', (e) => {
        if (justOperated) {
            screen.innerHTML = e.target.value
            justOperated = false;
            return;
        }

        if (screen.innerHTML === '0') {
            screen.innerHTML = e.target.value;
        } else {
            screen.innerHTML += e.target.value;
        }
        currentOperand = screen.innerHTML;
    });
});

clear.addEventListener('click', () => {
    screen.innerHTML = '0';
    previousResult = 0;
    previousOperand = 0;
    currentOperand = 0;
    justOperated = false;
    operation = null;
});

sign.addEventListener('click', () => {
    if (screen.innerHTML === '0') {
        screen.innerHTML = '-';
    } else if (screen.innerHTML === '-') {
        screen.innerHTML = '0';
    } else {
        screen.innerHTML = screen.innerHTML * -1;
    }
});

percent.addEventListener('click', () => {
    screen.innerHTML = screen.innerHTML / 100;
});

decimal.addEventListener('click', () => {
    if (screen.innerHTML.includes('.')) {
        return;
    }
    screen.innerHTML += '.';
});

operators.forEach((operator) => {
    operator.addEventListener('click', (e) => {
        if (justOperated) {
            return;
        }
        if (operation != null) {
            // Figure this garbage out...
            return;
        }
        switch (e.target.value) {
            case '+':
                previousOperand = parseFloat(screen.innerHTML);
                operation = '+';
                break;
            case '-':
                previousOperand = parseFloat(screen.innerHTML);
                operation = '-';
                break;
            case '*':
                previousOperand = parseFloat(screen.innerHTML);
                operation = '*';
                break;
            case '/':
                previousOperand = parseFloat(screen.innerHTML);
                operation = '/';
                break;
        }
        screen.innerHTML = '0';
    });
});

equals.addEventListener('click', () => {
    calculate(previousOperand, currentOperand);
});

function calculate(firstNumber, secondNumber) {
    let newValue = 0;
    firstNumber = parseFloat(firstNumber);
    secondNumber = parseFloat(secondNumber);

    switch (operation) {
        case '+':
            newValue = parseFloat((firstNumber + secondNumber).toFixed(10));
            break;
        case '-':
            if (justOperated) {
                newValue = parseFloat((secondNumber - firstNumber).toFixed(10));
            } else {
                newValue = parseFloat((firstNumber - secondNumber).toFixed(10));
            }
            break;
        case '*':
            newValue = parseFloat((firstNumber * secondNumber).toFixed(10));
            break;
        case '/':
            if (secondNumber === 0) {
                newValue = 'Error';
                break;
            }
            if (justOperated) {
                newValue = parseFloat((secondNumber / firstNumber).toFixed(10));
            } else {
                newValue = parseFloat((firstNumber / secondNumber).toFixed(10));
            }
            break;
    }
    if (!justOperated) {
        previousOperand = currentOperand;
    }

    justOperated = true;
    screen.innerHTML = newValue;
    currentOperand = newValue;
}