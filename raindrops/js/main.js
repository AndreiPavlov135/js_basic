const numbers = document.querySelectorAll('.number'),
    start = document.querySelector('.start'),
    howToPlay = document.querySelector('.how_to_play'),
    ball = document.querySelector('.activ_ball'),
    clearBtn = document.querySelector('.operator'),
    resultBtn = document.getElementById('result'),
    scoreBoard = document.querySelector('.score'),
    deleteBtn = document.getElementById('delete'),
    display = document.getElementById('display'),
    leftTop = document.querySelector('.left_top'),
    continueBtn = document.querySelector('.btn-continue');
let falseCounter = 0,
    score = 0,
    bonus = 9,
    firstNumber,
    secondNumber,
    timer;
   
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

window.addEventListener('keydown', event => {
    if ((event.key).match(/[0-9]/)) numPress(event.key);
    if ((event.key).match(/Delete/)) display.value = '0';
})

deleteBtn.addEventListener('click', e => display.value = '0');

function backspaceBtn() {
    display.value = display.value.substring(0, display.value.length - 1);
    if (display.value === '') display.value = '0';
}

document.addEventListener('keydown', event => {
    if ((event.code).match(/Backspace/)) backspaceBtn();
})
clearBtn.addEventListener('click', backspaceBtn)

// Get random numbers
function testNumber () {
    firstNumber = Math.ceil(Math.random() * 100);
    secondNumber = Math.ceil(Math.random()*10);
    if (secondNumber >= firstNumber) return testNumber();
    return ball.textContent = `${firstNumber} - ${secondNumber}`;
}

// Start and stop the movement element 
function startBall() {
    testNumber();
    let start = Date.now();
    timer = setInterval(function() {
        let timePassed = Date.now() - start;
        ball.style.top = timePassed / 20 + 'px';
        if (!falseCounter && ball.offsetTop >= 400) {
            falseCounter++;
            leftTop.style.height = '75%';
            clearInterval(timer);
            startBall();
        } else if (falseCounter === 1 && ball.offsetTop >= 360) {
            falseCounter++;
            leftTop.style.height = '70%';
            clearInterval(timer);
            startBall();
        } else if (falseCounter === 2 && ball.offsetTop >= 340) {
            falseCounter++;
            clearInterval(timer);
            document.querySelector('.total_score').textContent = score;
            document.querySelector('.last_place').style.visibility = 'visible';
        }
    }, 
    20)
} 

// Start game
start.addEventListener('click', startBall);
start.addEventListener('click', () => document.querySelector('.first-place').style.display = 'none')
continueBtn.addEventListener('click', () => location.reload());
// No ideas yet
howToPlay.addEventListener('click', () => alert('Как-нибудь!'));

// Check the answer and get score counter 
function operation() {
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
        scoreBoard.textContent -= bonus + 1;
        if (scoreBoard.textContent <= 0) {
            scoreBoard.textContent = 0;
            score = 0;
        } else score = +scoreBoard.textContent;
    }
}

// Start operation function on click and keydown
resultBtn.addEventListener('click', operation);

document.addEventListener('keydown', event => {
    if ((event.code).match(/Enter/)) {
        event.preventDefault();
        operation();
    }
})


