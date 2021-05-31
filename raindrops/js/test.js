/* let i;
for(i = 0; i<ball.length; i++) {
    console.log(ball[i])
    function startBall() {
        testNumber();
        let start = Date.now();
         i.style.visibility = 'visible';
         let timer = setInterval(function() {
            let timePassed = Date.now() - start;
            //console.log(ball.offsetTop);
            i.style.top = timePassed / 10 + 'px';
            if(i.offsetTop >= 400) clearInterval(timer);
        }, 
        20)
    }
} 

let newDiv = document.createElement('div');
    newDiv.className = 'activ_ball';
    enterDiv.append(newDiv);
*/
