// Access DOM elements of the calculator
const inputBox = document.getElementById('input');
const expressionDiv = document.getElementById('expression');
const resultDiv = document.getElementById('result');

// Define expression and result variable
let expression = '';
let result = '';

// Define event handler for button clicks

function buttonClick(event){
    // Get values from clicked button
    const target = event.target;
    const action = target.dataset.action;
    const value = target.dataset.value;

    // Switch case to control the calculator
    switch(action)
    {
        case 'number':
            addValue(value);
            break;
        case 'clear':
            clear();
            break;
        case 'backspace':
            backspace();
            break;
        // Add the result to expression as a starting point if expression is empty
        case 'addition':
        case 'subtraction':
        case 'multiplication':
        case 'division':
            if(expression === '' && result !== '') {
                startFromResult(value);
            }
            else if(expression !== '' && !isLastCharOperator()) {
                addValue(value);
            }
            break;
        case 'submit':
            submit();
            break;
        case 'negate':
            negate();
            break;
        case 'mod':
            percentage();
            break;
    }

    updateDisplay(expression, result);
}

inputBox.addEventListener('click',buttonClick);

function addValue(value){
    expression += value;

}

function updateDisplay(expression, result){
    expressionDiv.textContent = expression;
    resultDiv.textContent = result;
}

function clear(){
    expression='';
    result='';
}

function backspace(){
    expression = expression.slice(0,-1);
}

function isLastCharOperator() {
    return isNaN(parseInt(expression.slice(-1)));
}

function startFromResult(value) {
    expression += result + value;
}

function submit() {
    result = evaluateExpression();
    expression = '';
}

function evaluateExpression() {
    const evalResult = eval(expression);
    // check if evalResult isNaN or Infinite, if it is, return a space character ' '
    return isNaN(evalResult) || !isFinite(evalResult) ? ' '
    :evalResult < 1 ? parseFloat(evalResult.toFixed(10))
    : parseFloat(evalResult.toFixed(2));
}

function negate() {
    //Negate the result if the expression is empty and result is present
    if(expression === '' && result !== '') {
        result = -result;
    }
    // If the expression is not empty toggle the sign of the expression to negative if it is not negative.
    else if(!expression.startsWith('-') && expression !== '') {
        expression = '-'+expression;
    }
    // Remove the negative sign if it is already negative.
    else if(expression.startsWith('-')) {
        expression = expression.slice(1);
    }
}

function percentage() {
    //Evaluate the expression before finding its percentagef
    if(expression !== '') {
        result = evaluateExpression();
        expression = '';
        if(!isNaN(result) && isFinite(result)) {
            result /= 100;
        }
        else {
            result = '';
        }
    } else if (result !== '') {
        // If expression is empty but result is not empty then divide the result by 100
        result = parseFloat(result) / 100;
    }
}