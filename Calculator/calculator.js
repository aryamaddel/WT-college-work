let display = document.getElementById('result');
let currentInput = '';
let operator = '';
let previousInput = '';
let shouldResetDisplay = false;

function appendToDisplay(value) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }
    
    if (['+', '-', '*', '/'].includes(value)) {
        if (currentInput === '' && previousInput === '') return;
        
        if (currentInput === '' && previousInput !== '') {
            operator = value;
            updateDisplay(previousInput + ' ' + operator + ' ');
            return;
        }
        
        if (previousInput !== '' && currentInput !== '' && operator !== '') {
            calculate();
        }
        
        operator = value;
        previousInput = currentInput;
        currentInput = '';
        updateDisplay(previousInput + ' ' + operator + ' ');
    } else {
        if (value === '.' && currentInput.includes('.')) return;
        
        currentInput += value;
        
        if (operator === '') {
            updateDisplay(currentInput);
        } else {
            updateDisplay(previousInput + ' ' + operator + ' ' + currentInput);
        }
    }
}

function updateDisplay(value) {
    display.value = value;
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateDisplay('');
}

function clearEntry() {
    currentInput = '';
    if (operator === '') {
        updateDisplay('');
    } else {
        updateDisplay(previousInput + ' ' + operator + ' ');
    }
}

function deleteLast() {
    if (currentInput !== '') {
        currentInput = currentInput.slice(0, -1);
        if (operator === '') {
            updateDisplay(currentInput);
        } else {
            updateDisplay(previousInput + ' ' + operator + ' ' + currentInput);
        }
    } else if (operator !== '') {
        operator = '';
        currentInput = previousInput;
        previousInput = '';
        updateDisplay(currentInput);
    }
}

function calculate() {
    if (previousInput === '' || currentInput === '' || operator === '') return;
    
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                updateDisplay('Error');
                resetCalculator();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    
    result = Math.round((result + Number.EPSILON) * 100000000) / 100000000;
    
    updateDisplay(result.toString());
    currentInput = result.toString();
    previousInput = '';
    operator = '';
    shouldResetDisplay = true;
}

function resetCalculator() {
    setTimeout(() => {
        clearDisplay();
    }, 1500);
}

document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9' || key === '.') {
        appendToDisplay(key);
    } else if (key === '+' || key === '-') {
        appendToDisplay(key);
    } else if (key === '*') {
        appendToDisplay('*');
    } else if (key === '/') {
        event.preventDefault();
        appendToDisplay('/');
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    }
});

updateDisplay('');
