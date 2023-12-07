let selectedBox = document.querySelectorAll(".lines")
let message = document.getElementById("message")
let playAgain = document.getElementById("button")
let resultBox = document.getElementById("result")

let xAttempts = []
let oAttempts = []
let wonGame = 0;
let click = 0;

let winningTerms = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

selectedBox.forEach(box => {
    console.log(box)
    box.onclick= handleClick
});

function handleClick(event) {
    let i = event.target.getAttribute('Id')   
    let p = document.createElement('p')
    p.setAttribute('id', 'text')
    selectedBox[i-1].appendChild(p)

    if (click % 2 == 0) {
        xAttempts.push(i - 1)
        p.innerHTML = 'x'
        console.log(xAttempts)
        p.style.color = '#FAB201';
        checkResult(winningTerms, xAttempts, "X");
    }
    else {
        oAttempts.push(i - 1)
        p.innerHTML = 'o'
        console.log(oAttempts)
        p.style.color = '#FAB201';
        checkResult(winningTerms, oAttempts, "O");
    }
    click++;

    if (click == 9 && wonGame == 0) {
        resultBox.style.visibility = 'visible';
        message.innerHTML = " It's a tie!"
    }
}

function checkResult(winningTerms, attempts, playerName) {
    let flag = 0;
    let checker = [];

    for (let i = 0; i < winningTerms.length; i++) {
        console.log(winningTerms[i])
        if (Array.isArray(winningTerms[i])) {
            checkResult(winningTerms[i], attempts, playerName);
        }

        else {
            if (attempts.includes(winningTerms[i])) {
                checker.push(true)
                flag++;
            }
            else {
                checker.push(false);
            }
        }
        if (checker.every(check => check === true) && flag > 2) {
            resultBox.style.visibility = 'visible';
            message.innerHTML = " " + playerName + " " + "Won the game!";
            wonGame = 1;
        }
    }
}

playAgain.onclick = () => {
    history.go(0)
}


