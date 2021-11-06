const startScene = document.getElementById('startScene');
const numbers = document.getElementById('numbers');
const button = document.querySelector('#startScene button');
const timer = document.querySelector('#timer span');

// Variable
let countNum;
let cardArray;
let time;
let intervalId;

// Function
function init() {

    countNum = 1;
    cardArray = [];
    time = 0;

    for(let i = 0; i <= 24; i++) {
        cardArray.push(i);
    }

    for(let i = 0; i <= 24; i++) {
        let tmpNum = cardArray[i];
        let r = Math.floor(Math.random() * cardArray.length);
        cardArray[i] = cardArray[r];
        cardArray[r] = tmpNum;
    }

    numbers.innerHTML = '';

    for(let i = 0; i <= 24; i++) {
        let cardNum = cardArray[i] + 1;
        const div = document.createElement('div');
        div.innerHTML = cardNum;
        numbers.prepend(div);
    }
}

function start() {

    startScene.style.display = 'none';

    const cards = document.querySelectorAll('#numbers div');
    cards.forEach(function(card) {
        card.addEventListener('click', countUp);
    });

    timerFunc();
    intervalId = setInterval(timerFunc, 10);
}

function countUp(e) {

    const el = e.target;
    let num = el.innerHTML;
    if(num == countNum) {
        el.classList.add('hit');
        countNum++;

        if(countNum === 26) {
            clearInterval(intervalId);

            const record = document.querySelector('#startScene p');
            const recentRecord = document.querySelector('#timer span');
            const bestRecord = document.querySelector('#record span');
            record.innerHTML = `Your Record : ${recentRecord.innerHTML}`;
            if(bestRecord.innerHTML - recentRecord.innerHTML > 0 || bestRecord.innerHTML == 0) {
                bestRecord.innerHTML = recentRecord.innerHTML;
            }
            
            button.innerHTML = `PLAY AGAIN`;
            startScene.style.display = 'block';

            init();
        }
    }
}

function timerFunc() {
    time++;
    timer.innerHTML = time;
}

// Run
init();

// Event {
button.addEventListener('click', start);