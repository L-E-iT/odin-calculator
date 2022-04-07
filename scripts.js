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

let operation = null;
let justOperated = false;

window.addEventListener('keydown', function (e) {
    const key = this.document.querySelector(`button[data-key="${e.keyCode}"]`);
    key.click();
});


orperands.forEach((orperand) => {
    orperand.addEventListener('click', (e) => {
        if (justOperated) {
            screen.innerHTML = e.target.value;
            justOperated = false;
            return;
        }

        if (screen.innerHTML === '0') {
            screen.innerHTML = e.target.value;
        } else {
            screen.innerHTML += e.target.value;
        }
    });
});

clear.addEventListener('click', () => {
    screen.innerHTML = '0';
    previousOperand = null;
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
        if (operation != null) {
            newValue = calculate(previousOperand, screen.innerHTML);
            screen.innerHTML = newValue;
            previousOperand = newValue;
            operation = e.target.value;
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
    if (operation === null) {
        return;
    }
    newValue = calculate(previousOperand, screen.innerHTML);
    operation = null;
    screen.innerHTML = newValue;
});

function calculate(firstNumber, secondNumber) {
    let newValue = 0;
    firstNumber = parseFloat(firstNumber);
    secondNumber = parseFloat(secondNumber);

    switch (operation) {
        case '+':
            newValue = parseFloat(add(firstNumber, secondNumber).toFixed(10));
            break;
        case '-':
            newValue = parseFloat(subtract(firstNumber, secondNumber).toFixed(10));
            break;
        case '*':
            newValue = parseFloat(multiply(firstNumber, secondNumber).toFixed(10));
            break;
        case '/':
            newValue = parseFloat(divide(firstNumber, secondNumber).toFixed(10));
            break;
    }
    justOperated = true;
    return newValue;
}

// Operations

function add(firstNumber, secondNumber) {
    return firstNumber + secondNumber;
}

function subtract(firstNumber, secondNumber) {
    return firstNumber - secondNumber;
}

function multiply(firstNumber, secondNumber) {
    return firstNumber * secondNumber;
}

function divide(firstNumber, secondNumber) {
    if (secondNumber === 0) {
        return 'Error';
    }
    return firstNumber / secondNumber;
}