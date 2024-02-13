function redirectToGame() {
    window.location.href = 'game.html';
}

function redirectToInstructions() {
    window.location.href = 'instructions.html';
}

function redirectToHome() {
    window.location.href = 'home.html';
}

let playerName = '';


document.addEventListener("DOMContentLoaded", function() {
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    const timerValue = document.getElementById('timer-value');
    const scoreValue = document.getElementById('score-value');
    const moleImg = document.getElementById('mole');

    let timer;
    let score = 0;

    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', restartGame);

    const usernameForm = document.getElementById('username-form');
    let username = ''; // Variable to store the username

    usernameForm.addEventListener('submit', function(event) {
        event.preventDefault();
        username = document.getElementById('username').value;

        // Send username to the server using a POST request
        fetch('/submit-username', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username })
        })
        .then(response => {
            if (response.ok) {
                console.log('Username submitted successfully');
            } else {
                throw new Error('Failed to submit username');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    function startGame() {
        startBtn.disabled = true;
        restartBtn.disabled = false;
        score = 0;
        updateScore();
        showRandomMole();
        timer = setInterval(updateTimer, 1000);
    }

    function restartGame() {
        clearInterval(timer);
        clearInterval(moleTimeout);
        startBtn.disabled = false;
        restartBtn.disabled = true;
        timerValue.textContent = '30';
        score = 0;
        updateScore();
        moleImg.style.display = 'none';
        moleImg.removeEventListener('click', moleClicked);
    }    

    function updateTimer() {
        let timeLeft = parseInt(timerValue.textContent);
        timeLeft--;
        if (timeLeft < 0) {
            clearInterval(timer);
            clearInterval(moleTimeout);
            moleImg.removeEventListener('click', moleClicked);
            alert(`Game over! Ethan's score: ${score}`);
            return;
        }
        timerValue.textContent = timeLeft;
    }  

    function updateScore() {
        scoreValue.textContent = score;
    }

    function showRandomMole() {
        const moleWidth = moleImg.width;
        const moleHeight = moleImg.height;
      
        const maxX = window.innerWidth - moleWidth - 100;
        const maxY = window.innerHeight - moleHeight - 100;
    
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
    
        moleImg.style.position = 'absolute';
        moleImg.style.left = `${randomX}px`;
        moleImg.style.top = `${randomY}px`;
        moleImg.style.display = 'block';
        moleImg.addEventListener('click', moleClicked);
    }     

    function moleClicked() {
        if (parseInt(timerValue.textContent) >= 0) {
            score++;
            updateScore();
            moleImg.style.display = 'none';
            
            const randomDelay = Math.random() * (2000 - 300) + 300;
    
            moleTimeout = setTimeout(showRandomMole, randomDelay);
        }
    }
});