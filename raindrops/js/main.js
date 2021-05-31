const numbers = document.querySelectorAll('.number'),
    start = document.querySelector('.start'),
    ball = document.querySelector('.activ_ball'),
    clearBtn = document.querySelector('.operator'),
    resultBtn = document.getElementById('result'),
    scoreBoard = document.querySelector('.score'),
    deleteBtn = document.getElementById('delete');
let score = 0;
let bonus = 9;
let firstNumber;
let secondNumber;
let timer;
   
// Get button data
const numPress = (num) => {
    display.value === '0' ? display.value = num : display.value += num;
}

for(let i = 0; i < numbers.length; i++ ){
    const number = numbers[i];
    number.addEventListener('click', (e) => {
        numPress(e.target.textContent);
    });
}

clearBtn.addEventListener('click', e => location.reload());
deleteBtn.addEventListener('click', e => display.value = '0');

// Get random numbers
function testNumber () {
    firstNumber = Math.ceil(Math.random()*10);
    secondNumber = Math.ceil(Math.random()*10);
    if(secondNumber >= firstNumber) return testNumber ();
    return ball.textContent = `${firstNumber} - ${secondNumber}`;
}

// Start the movement element 
function startBall () {
    testNumber(); 
    ball.style.visibility = 'visible';
    let start = Date.now();
    timer = setInterval(function() {
        let timePassed = Date.now() - start;
        ball.style.top = timePassed / 20 + 'px';
        if(ball.offsetTop >= 400) clearInterval(timer);
    }, 
    20)
} 

start.addEventListener('click', startBall);

// Check the answer and get score counter 
function operation (){
    let result = firstNumber - secondNumber;
    if(+display.value === result){
        display.value = '0';
        bonus++;
        score += bonus;
        scoreBoard.textContent = score;
        clearInterval(timer);
        startBall();
    } else {
        display.value = ' ';
        scoreBoard.textContent -= bonus +1;
       // console.log(`${bonus + 1}`);
        if(scoreBoard.textContent <= 0) {
            scoreBoard.textContent = 0;
            score = 0;
        } else score = +scoreBoard.textContent;
    }
}

resultBtn.addEventListener('click', operation);


