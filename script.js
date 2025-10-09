console.log("Hello World");

// Variables and constants
let firstNumber = "";
let operator = "";
let secondNumber = "";
let fullEquationString = "";
let currentPhase = 1
let finishEquation = false;

const mathOperatorList = ["+", "-", "x", "÷"]
const buttonClassList = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "equal", "add", "subtract", "multiply", "divide", "decimal-point"]
const keyPressList = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "=", "+", "-", "*", "/", "."]
const buttonReturnList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "=", "+", "-", "x", "÷", "."]

// DOM References
let regularButtons = document.querySelectorAll(".row > button")
let displayResults = document.querySelector(".results")
let clearButton = document.querySelector(".clear")
let backspaceButton = document.querySelector(".backspace")
let displayDiv = document.querySelector(".display")

// Logic Functions

function add(firstNum, secondNum) {
    let results = (firstNum + secondNum)
    return results = Math.round(results * 100) / 100
}

function subtract(firstNum, secondNum) {
    let results = (firstNum - secondNum)
    return results = Math.round(results * 100) / 100
}

function multiply(firstNum, secondNum) {
    let results = (firstNum * secondNum)
    return results = Math.round(results * 100) / 100
}

function divide(firstNum, secondNum) {
    if (secondNum == 0) {
        return "Are you playing me??"
    }
    let results = (firstNum / secondNum)
    return results = Math.round(results * 100) / 100
}

function operate(operator, firstNum, secondNum) {
    console.log(secondNum)
    let results;
    if (operator == "+") {
        results = add(firstNum, secondNum)

    } else if (operator == "-") {
        results = subtract(firstNum, secondNum)
    } else if (operator == "x") {
        results = multiply(firstNum, secondNum)
    } else if (operator == "÷") {
        results = divide(firstNum, secondNum)
    } else {
        return firstNum
    }
    console.log(results)
    return results
}

function phaseChecker(fullEquation) {
    for (let i = 0; i < 4; i++) {
        if (fullEquation.includes(mathOperatorList[i])) {
            return 2;
        }
    }
    return 1;
}

function operatorCountChecker(clickable) {
    for (let i = 0; i < 4; i++) {
        if (mathOperatorList.includes(operator) && mathOperatorList.includes(clickable)) {
            return true
        }
    }
    return false;
}

function evaluateEquation() {
    let result = operate(operator, Number(firstNumber), Number(secondNumber))
    updateDisplay(result);
    firstNumber = result;
    operator = ""
    secondNumber = ""
    finishEquation = true;
}

function duplicateTrue() {
    if (currentPhase == 1) {

    } else if (currentPhase == 2) {
        evaluateEquation();
    }
}

function duplicateFalse(character) {
    currentPhase = phaseChecker(fullEquationString)
    if (mathOperatorList.includes(character)) {
        fullEquationString += " " + character + " ";
        operator = character;
    } else if (currentPhase == 1) {
        if (character == ".") {
            if (firstNumber.includes(".")) {
                return 0
            }
        }
        firstNumber += character
        fullEquationString += character
    } else if (currentPhase == 2) {
        if (character == ".") {
            if (secondNumber.includes(".")) {
                return 0
            }
        }
        secondNumber += character
        fullEquationString += character
    }
    updateDisplay(fullEquationString);
}


// UI Update Functions

function updateDisplay(fullEquation) {
    displayResults.textContent = fullEquation
}

// Event Listeners
document.addEventListener("keydown", (event) => {
    keyDownFunction(event);
})

regularButtons.forEach((button) => {
    button.addEventListener("click", () => {
        buttonClickListener(button)
    })
})

backspaceButton.addEventListener(("click"), () => {
    backspaceFunction();
})

clearButton.addEventListener(("click"), () => { // Reset equation statistics.
    fullEquationString = ""
    firstNumber = ""
    secondNumber = ""
    finishEquation = false;
    updateDisplay(0)
})


// Listener Functions
function keyDownFunction(event) {
    let pressedKey = event.key
    if (pressedKey == "Enter") {
        pressedKey = "="
    }

    if (pressedKey == "Backspace") {
        backspaceFunction();
        return 0;
    }

    if (!keyPressList.includes(pressedKey)) {
        return 0
    }

    let index = keyPressList.indexOf(pressedKey)
    let character = buttonReturnList[index];
    console.log(character)
    if (character == "=") {
        evaluateEquation()
        return 0
    }
    finishEquationCheck(character)

    let duplicateOperator = operatorCountChecker(character);
    if (duplicateOperator == false) {
        duplicateFalse(character);
    }
    else {
        duplicateTrue();
    }
}

function buttonClickListener(button) {
    if (button.className == "equal") {
        evaluateEquation();
        return 0
    }
    let classString = button.className;
    let index = buttonClassList.indexOf(classString)
    let clickable = buttonReturnList[index];

    finishEquationCheck(clickable);

    let duplicateOperator = operatorCountChecker(clickable);
    if (duplicateOperator == false) {
        duplicateFalse(clickable);
    }
    else {
        duplicateTrue();
    }

}


function finishEquationCheck(character) {
    if (finishEquation === true) {
        if (mathOperatorList.includes(character)) {
            fullEquationString = firstNumber.toString()
            finishEquation = false;
        } else {
            fullEquationString = ""
            firstNumber = ""
            finishEquation = false;
        }
    }
}


function backspaceFunction() {
    if (finishEquation == true) { // If equation is finished, this will bring equation back to new equation, to prevent equation-wipe
        firstNumber = firstNumber.toString().slice(0, -1)
        fullEquationString = firstNumber;
        updateDisplay(firstNumber)
        finishEquation = false
    } else {
        if (operator != 0 && fullEquationString.slice(-1) != " ") {
            secondNumber = secondNumber.slice(0, -1)
        } else if (operator == 0) {
            firstNumber = firstNumber.slice(0, -1)
        } else {
            operator = ""
            fullEquationString = fullEquationString.slice(0, -2)
        }
        fullEquationString = fullEquationString.slice(0, -1)
        console.log(fullEquationString)
        updateDisplay(fullEquationString)
    }
}

// Change backspace formatting: FEQ should be combined 3 variables, backspace should remove based on variable presence.
// Things like conditions I can also store it in functions/variables