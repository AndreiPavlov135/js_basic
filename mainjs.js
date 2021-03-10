
let numbers = document.querySelectorAll('.number'),
    operations = document.querySelectorAll('.operator'),
    resultBtn = document.getElementById('result'),
    decimalDot = document.getElementById('decimal'),
    clearBtns = document.querySelectorAll('.clear-btn'),
    display = document.getElementById('display'),
    memoryCurrentNumber = 0,
    memoryNewNumber = false,
    memoryPendingOperation = '';

// The main function of the calculator, does operations (+ - / * =) with numbers
function operation(oper) {
    let localOperationMemory = display.value;
    if (memoryNewNumber && memoryPendingOperation !== '=') {
        display.value = memoryCurrentNumber;
    } else {
        memoryNewNumber = true;
        if (memoryPendingOperation === "+") {
            memoryCurrentNumber += parseFloat(localOperationMemory);
        } else if (memoryPendingOperation === "-") {
            memoryCurrentNumber -= parseFloat(localOperationMemory);
        } else if (memoryPendingOperation === "*") {
            memoryCurrentNumber *= parseFloat(localOperationMemory);
        } else if (memoryPendingOperation === "/") {
            memoryCurrentNumber /= parseFloat(localOperationMemory);
        } else { memoryCurrentNumber = parseFloat(localOperationMemory) };
        display.value = memoryCurrentNumber;
        memoryPendingOperation = oper;
        } 
};
// Function displays number that user enters
let numberPress = (number) => {
    if (memoryNewNumber) {
        display.value = number;
        memoryNewNumber = false;
    } else {
        if (display.value === '0') {
            display.value = number;
        } else { display.value += number; };
    }
};
// Function adds a decimal point to the number
let decimal = () => {
    let localDotMemory = display.value;
    if (memoryNewNumber) {
        localDotMemory = '0.';
        localDotMemory = false; 
    } else {
        if(localDotMemory.indexOf('.') === -1) {
        localDotMemory += '.'; 
        };
    };
    display.value = localDotMemory;
};
// Function clears number field if the user clicks 'ce' or 'c'
let clear = (id) => {
    if (id === 'ce') {
        display.value = '0';
        memoryNewNumber = true;
    } else if (id === 'c') {
        display.value = '0';
        memoryNewNumber = true;
        memoryCurrentNumber = '0';
        memoryPendingOperation = '';
    };
};
// Cycle iterates over the array values ​​after 'document.querySelectorAll'
for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i];
    number.addEventListener('click', (e) => {
        numberPress(e.target.textContent);
    });
}
for (let i = 0; i < operations.length; i++) {
    const operationBtn = operations[i];
    operationBtn.addEventListener('click', (e) => {
        operation(e.target.textContent);
    });
}
for (let i = 0; i < clearBtns.length; i++) {
    const clearBtn = clearBtns[i];
    clearBtn.addEventListener('click', (e) => {
        clear(e.srcElement.id);
    })
}

decimalDot.addEventListener('click', decimal);




