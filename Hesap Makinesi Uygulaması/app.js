const resultDisplay = document.getElementById("result-display");
const historyDisplay = document.getElementById("history-display");
const keys = document.querySelector(".calculator-keys");

let currentInput = "0";
let previousInput = "";
let operator = null;
let history = "";
let shouldReset = false;

updateDisplay();

function updateDisplay() {
    resultDisplay.value = currentInput;
    historyDisplay.textContent = history;
}

keys.addEventListener("click", function (e) {
    const element = e.target;
    const value = element.value;

    if (!element.matches("button")) return;

    switch (value) {
        case "clear":
            clearAll();
            break;
        case "ce":
            clearEntry();
            break;
        case "backspace":
            backspace();
            break;
        case "+":
        case "-":
        case "*":
        case "/":
            handleOperator(value);
            break;
        case "=":
            calculate();
            break;
        case ".":
            inputDecimal();
            break;
        case "%":
            handlePercent();
            break;
        case "1/x":
            handleReciprocal();
            break;
        case "x^2":
            handleSquare();
            break;
        case "sqrt":
            handleSquareRoot();
            break;
        case "+/-":
            handleSign();
            break;
        default:
            inputNumber(value);
    }

    updateDisplay();
});

document.addEventListener("keydown", function (e) {
    const key = e.key;

    if (/[0-9]/.test(key)) {
        inputNumber(key);
    } else if (key === ".") {
        inputDecimal();
    } else if (["+", "-", "*", "/"].includes(key)) {
        handleOperator(key);
    } else if (key === "Enter" || key === "=") {
        calculate();
    } else if (key === "Backspace") {
        backspace();
    } else if (key.toLowerCase() === "c") {
        clearAll();
    } else if (key.toLowerCase() === "e") {
        clearEntry();
    }

    updateDisplay();
});

function inputNumber(num) {
    if (shouldReset) {
        currentInput = num;
        shouldReset = false;
    } else {
        currentInput = currentInput === "0" ? num : currentInput + num;
    }
}

function inputDecimal() {
    if (shouldReset) {
        currentInput = "0.";
        shouldReset = false;
    } else if (!currentInput.includes(".")) {
        currentInput += ".";
    }
}

function handleOperator(nextOperator) {
    if (operator && !shouldReset) {
        calculate();
    }
    previousInput = currentInput;
    operator = nextOperator;
    history = `${previousInput} ${displayOperator(operator)} `;
    shouldReset = true;
}

function calculate() {
    if (!operator || !previousInput) return;

    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);

    if (isNaN(num1) || isNaN(num2)) {
        alert("Geçersiz giriş!");
        clearAll();
        return;
    }

    let result;
    switch (operator) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            if (num2 === 0) {
                alert("Hata: Sıfıra bölme!");
                clearAll();
                return;
            }
            result = num1 / num2;
            break;
        default:
            return;
    }

    currentInput = parseFloat(result.toFixed(7)).toString();
    history = `${previousInput} ${displayOperator(operator)} ${num2} =`;
    operator = null;
    previousInput = "";
    shouldReset = true;
}

function handlePercent() {
    const num = parseFloat(currentInput);
    if (isNaN(num)) {
        alert("Geçersiz giriş!");
        return;
    }
    currentInput = (num / 100).toString();
    history = `${num} % =`;
    shouldReset = true;
}

function handleReciprocal() {
    const num = parseFloat(currentInput);
    if (isNaN(num)) {
        alert("Geçersiz giriş!");
        return;
    }
    if (num === 0) {
        alert("Hata: Sıfıra bölme!");
        return;
    }
    currentInput = (1 / num).toString();
    history = `1/${num} =`;
    shouldReset = true;
}

function handleSquare() {
    const num = parseFloat(currentInput);
    if (isNaN(num)) {
        alert("Geçersiz giriş!");
        return;
    }
    currentInput = (num * num).toString();
    history = `${num}² =`;
    shouldReset = true;
}

function handleSquareRoot() {
    const num = parseFloat(currentInput);
    if (isNaN(num)) {
        alert("Geçersiz giriş!");
        return;
    }
    if (num < 0) {
        alert("Hata: Negatif sayının karekökü alınamaz!");
        return;
    }
    currentInput = Math.sqrt(num).toString();
    history = `√${num} =`;
    shouldReset = true;
}

function handleSign() {
    const num = parseFloat(currentInput);
    if (isNaN(num)) {
        alert("Geçersiz giriş!");
        return;
    }
    currentInput = (-num).toString();
    history = `+/- ${num} =`;
    shouldReset = true;
}

function clearAll() {
    currentInput = "0";
    previousInput = "";
    operator = null;
    history = "";
    shouldReset = false;
}

function clearEntry() {
    currentInput = "0";
    shouldReset = false;
}

function backspace() {
    currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : "0";
    shouldReset = false;
}

function displayOperator(op) {
    return op === "*" ? "×" : op === "/" ? "÷" : op;
}