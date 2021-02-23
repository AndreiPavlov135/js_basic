var numbers = document.querySelectorAll(".number"),
    operations = document.querySelectorAll(".operator"),
    clearBtns = document.querySelectorAll(".clear-btn"),
    decimalBtn = document.getElementById("decimal"),
    result = document.getElementById("result"),
    display = document.getElementById("display"),
    MemoryCurrentNumber = 0,
    MemoryNewNumber = false,
    MemoryPendingOperation = "";



for(var i = 0; i < numbers.length; i++) {
    var number = numbers[i];
    number.addEventListener("click", function(e){
        numberPress(e.target.textContent);
    });
};

for(var i = 0; i < operations.length; i++) {
    var operationBtn = operations[i];
        operationBtn.addEventListener("click", function(e){
            operationPress(e.target.textContent);
        });
    };

for(var i = 0; i < clearBtns.length; i++) {
    var clearBtn = clearBtns[i];
        clearBtn.addEventListener("click", function(e){
        clear(e.target.textContent);
        });
    };

decimalBtn.addEventListener("click", decimal);

result.addEventListener("click", function(e){
    console.log("Клик по result")
});

    function numberPress(number) {
        if(MemoryNewNumber) {
            display.value = number;
            MemoryNewNumber = false;
        } else {
            if(display.value === "0") {
                display.value = number;
            } else {
                display.value += number;
            };
        };
    };

function operationPress(op) {
        localOperationMemory = display.value;
        
        if(MemoryNewNumber && MemoryPendingOperation !== "=") {
            display.value = MemoryCurrentNumber;
        } else {
            MemoryNewNumber = true;
            if (MemoryPendingOperation === "+") {
                MemoryCurrentNumber += +localOperationMemory;  
            } else if (MemoryPendingOperation === "-") {
                MemoryCurrentNumber -= +localOperationMemory;  
            } else if (MemoryPendingOperation === "*") {
                MemoryCurrentNumber *= +localOperationMemory;  
            } else if (MemoryPendingOperation === "/") {
                MemoryCurrentNumber /= +localOperationMemory;  
            } else {
                MemoryCurrentNumber = +localOperationMemory;  
            }
            display.value = MemoryCurrentNumber;
            MemoryPendingOperation = op;
        };
        
      }

    function decimal(argument) {
        var localDecimalMemory = display.value;
        
        if(MemoryNewNumber) {
            localDecimalMemory = "0.";
            MemoryNewNumber = false;
        } else {
            if(localDecimalMemory.indexOf(".") === -1) {
                localDecimalMemory += "."
            }
        };
        display.value = localDecimalMemory;
        console.log("Клик по " )
    };

    function clear(id) {
        if(id === "ce") {
            display.value = "0" // здесь строка? или число?
            MemoryNewNumber = true;
        } else if(id === "c") {
            display.value = "0" 
            MemoryNewNumber = true;
            MemoryCurrentNumber = 0,
            MemoryPendingOperation = "";
        }
    };

