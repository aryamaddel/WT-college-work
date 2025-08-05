class Calculator {
    constructor() {
        this.display = document.getElementById('result');
        this.historyDisplay = document.getElementById('history');
        this.currentInput = '';
        this.operator = '';
        this.previousInput = '';
        this.shouldResetDisplay = false;
        this.memory = 0;
        this.history = [];
        this.lastResult = null;
        
        this.init();
    }

    init() {
        this.updateDisplay('0');
        this.updateHistory('');
        this.setupKeyboardEvents();
    }

    // Display management
    updateDisplay(value) {
        if (value.toString().length > 12) {
            if (parseFloat(value) !== 0) {
                this.display.value = parseFloat(value).toExponential(6);
            } else {
                this.display.value = '0';
            }
        } else {
            this.display.value = value;
        }
    }

    updateHistory(text) {
        this.historyDisplay.textContent = text;
    }

    showError(message = 'Error') {
        this.display.classList.add('error');
        this.updateDisplay(message);
        setTimeout(() => {
            this.display.classList.remove('error');
            this.clearDisplay();
        }, 2000);
    }

    // Input handling
    appendToDisplay(value) {
        if (this.shouldResetDisplay) {
            this.currentInput = '';
            this.shouldResetDisplay = false;
        }

        if (['+', '-', '*', '/'].includes(value)) {
            this.handleOperator(value);
        } else {
            this.handleNumber(value);
        }
    }

    handleNumber(value) {
        // Prevent multiple decimal points
        if (value === '.' && this.currentInput.includes('.')) return;
        
        // Limit input length
        if (this.currentInput.length >= 10) return;

        this.currentInput += value;

        if (this.operator === '') {
            this.updateDisplay(this.currentInput);
        } else {
            this.updateHistory(`${this.previousInput} ${this.operator} ${this.currentInput}`);
            this.updateDisplay(this.currentInput);
        }
    }

    handleOperator(value) {
        if (this.currentInput === '' && this.previousInput === '') return;

        if (this.currentInput === '' && this.previousInput !== '') {
            this.operator = value;
            this.updateHistory(`${this.previousInput} ${value}`);
            return;
        }

        if (this.previousInput !== '' && this.currentInput !== '' && this.operator !== '') {
            this.calculate(false);
        }

        this.operator = value;
        this.previousInput = this.currentInput || this.previousInput;
        this.currentInput = '';
        this.updateHistory(`${this.previousInput} ${value}`);
    }

    // Scientific functions
    calculateFunction(func) {
        let input = this.currentInput || this.display.value;
        if (input === '' || input === '0') input = '0';
        
        const num = parseFloat(input);
        if (isNaN(num)) {
            this.showError('Invalid Input');
            return;
        }

        let result;
        let historyText = '';

        try {
            switch (func) {
                case 'sqrt':
                    if (num < 0) {
                        this.showError('Math Error');
                        return;
                    }
                    result = Math.sqrt(num);
                    historyText = `√(${num})`;
                    break;
                case 'square':
                    result = num * num;
                    historyText = `${num}²`;
                    break;
                case 'reciprocal':
                    if (num === 0) {
                        this.showError('Cannot divide by zero');
                        return;
                    }
                    result = 1 / num;
                    historyText = `1/(${num})`;
                    break;
                case 'percent':
                    result = num / 100;
                    historyText = `${num}%`;
                    break;
                default:
                    return;
            }

            result = this.formatResult(result);
            this.addToHistory(`${historyText} = ${result}`);
            this.updateDisplay(result);
            this.updateHistory(`${historyText} = ${result}`);
            this.currentInput = result.toString();
            this.shouldResetDisplay = true;
            this.lastResult = result;

        } catch (error) {
            this.showError('Math Error');
        }
    }

    // Sign toggle
    toggleSign() {
        if (this.currentInput === '' || this.currentInput === '0') return;
        
        if (this.currentInput.startsWith('-')) {
            this.currentInput = this.currentInput.substring(1);
        } else {
            this.currentInput = '-' + this.currentInput;
        }
        
        this.updateDisplay(this.currentInput);
    }

    // Memory functions
    memoryClear() {
        this.memory = 0;
        this.updateMemoryButtons();
    }

    memoryRecall() {
        this.currentInput = this.memory.toString();
        this.updateDisplay(this.currentInput);
        this.shouldResetDisplay = true;
    }

    memoryAdd() {
        const current = parseFloat(this.display.value) || 0;
        this.memory += current;
        this.updateMemoryButtons();
    }

    memorySubtract() {
        const current = parseFloat(this.display.value) || 0;
        this.memory -= current;
        this.updateMemoryButtons();
    }

    updateMemoryButtons() {
        const memoryButtons = document.querySelectorAll('.memory');
        memoryButtons.forEach(btn => {
            if (btn.textContent === 'MR') {
                btn.disabled = this.memory === 0;
            }
        });
    }

    // Calculation
    calculate(addToHistory = true) {
        if (this.previousInput === '' || this.currentInput === '' || this.operator === '') return;

        const prev = parseFloat(this.previousInput);
        const current = parseFloat(this.currentInput);

        if (isNaN(prev) || isNaN(current)) {
            this.showError('Invalid Input');
            return;
        }

        let result;
        const expression = `${this.previousInput} ${this.operator} ${this.currentInput}`;

        try {
            switch (this.operator) {
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
                        this.showError('Cannot divide by zero');
                        return;
                    }
                    result = prev / current;
                    break;
                default:
                    return;
            }

            result = this.formatResult(result);
            
            if (addToHistory) {
                this.addToHistory(`${expression} = ${result}`);
                this.updateHistory(`${expression} = ${result}`);
            }

            this.updateDisplay(result);
            this.currentInput = result.toString();
            this.previousInput = '';
            this.operator = '';
            this.shouldResetDisplay = true;
            this.lastResult = result;

        } catch (error) {
            this.showError('Math Error');
        }
    }

    // Utility functions
    formatResult(result) {
        // Handle floating point precision
        if (result % 1 !== 0) {
            const rounded = Math.round((result + Number.EPSILON) * 1000000000) / 1000000000;
            return parseFloat(rounded.toPrecision(12));
        }
        return result;
    }

    clearDisplay() {
        this.currentInput = '';
        this.previousInput = '';
        this.operator = '';
        this.shouldResetDisplay = false;
        this.updateDisplay('0');
        this.updateHistory('');
    }

    clearEntry() {
        this.currentInput = '';
        if (this.operator === '') {
            this.updateDisplay('0');
            this.updateHistory('');
        } else {
            this.updateDisplay('0');
            this.updateHistory(`${this.previousInput} ${this.operator}`);
        }
    }

    deleteLast() {
        if (this.currentInput !== '') {
            this.currentInput = this.currentInput.slice(0, -1);
            if (this.currentInput === '') {
                this.updateDisplay('0');
            } else {
                this.updateDisplay(this.currentInput);
            }
            
            if (this.operator !== '') {
                const historyText = this.currentInput ? 
                    `${this.previousInput} ${this.operator} ${this.currentInput}` :
                    `${this.previousInput} ${this.operator}`;
                this.updateHistory(historyText);
            }
        } else if (this.operator !== '') {
            this.operator = '';
            this.currentInput = this.previousInput;
            this.previousInput = '';
            this.updateDisplay(this.currentInput);
            this.updateHistory('');
        }
    }

    // History management
    addToHistory(expression) {
        this.history.unshift(expression);
        if (this.history.length > 50) {
            this.history.pop();
        }
    }

    // Keyboard events
    setupKeyboardEvents() {
        document.addEventListener('keydown', (event) => {
            event.preventDefault();
            const key = event.key;

            if (key >= '0' && key <= '9' || key === '.') {
                this.appendToDisplay(key);
            } else if (['+', '-', '*', '/'].includes(key)) {
                this.appendToDisplay(key);
            } else if (key === 'Enter' || key === '=') {
                this.calculate();
            } else if (key === 'Escape' || key.toLowerCase() === 'c') {
                this.clearDisplay();
            } else if (key === 'Backspace' || key === 'Delete') {
                this.deleteLast();
            } else if (key.toLowerCase() === 'r') {
                this.calculateFunction('reciprocal');
            } else if (key === '%') {
                this.calculateFunction('percent');
            } else if (key.toLowerCase() === 's') {
                this.calculateFunction('sqrt');
            } else if (key === 'F2') {
                this.calculateFunction('square');
            } else if (key === 'F5') {
                this.memoryRecall();
            } else if (key === 'F6') {
                this.memoryAdd();
            } else if (key === 'F7') {
                this.memorySubtract();
            } else if (key === 'F8') {
                this.memoryClear();
            }
        });
    }
}

// Initialize calculator
const calculator = new Calculator();

// Expose functions to global scope for HTML onclick handlers
function appendToDisplay(value) { calculator.appendToDisplay(value); }
function calculate() { calculator.calculate(); }
function clearDisplay() { calculator.clearDisplay(); }
function clearEntry() { calculator.clearEntry(); }
function deleteLast() { calculator.deleteLast(); }
function calculateFunction(func) { calculator.calculateFunction(func); }
function toggleSign() { calculator.toggleSign(); }
function memoryClear() { calculator.memoryClear(); }
function memoryRecall() { calculator.memoryRecall(); }
function memoryAdd() { calculator.memoryAdd(); }
function memorySubtract() { calculator.memorySubtract(); }
