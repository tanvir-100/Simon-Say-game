const buttonColors = ["green", "red","yellow", "blue"];
let gameSeq = [];
let userClickedPattern = [];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");

// Start game on any button click

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("Game started");
        started = true;
        
        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("gameflash");
    setTimeout(function() {
        btn.classList.remove("gameflash");
    }, 250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 250);

}

function levelUp() {
    userClickedPattern = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    let randbtn = document.querySelector(`.${randomChosenColor}`);
    gameSeq.push(randomChosenColor);
    console.log("Game sequence:", gameSeq);

    gameFlash(randbtn);

}

function checkAnswer(idx) {
    if(userClickedPattern[idx] === gameSeq[idx]) {
        if(userClickedPattern.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    }else {
        console.log("Wrong value");
        h2.innerHTML = `Game Over! Your Score was <b>${level}</b> <br> Press Any Key to Restart`;
        h2.style.color = "red";
        setTimeout(function() {
            h2.style.color = "#20294d";
        }, 500);
        reset();
    }    
}

function btnPress() {
    console.log("Button pressed:", this.id);
    userFlash(this);

    userColor = this.id; 
    userClickedPattern.push(userColor);

    checkAnswer(userClickedPattern.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userClickedPattern = [];
    level = 0;
    console.log("Game reset");
}