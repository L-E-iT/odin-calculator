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

let previousValue = 0;

orperands.forEach((orperand) => {
    orperand.addEventListener('click', (e) => {
        if (screen.innerHTML === '0') {
            screen.innerHTML = e.target.value;
        } else {
            screen.innerHTML += e.target.value;
        }
    });
});

clear.addEventListener('click', () => {
    screen.innerHTML = '0';
    previousValue = 0;
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