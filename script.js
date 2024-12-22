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