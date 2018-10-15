/*
GAME FUNCTIONS:
- Player must guess a number between min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify player of the correct answer if lose
- Let player choose to play again
*/

// Game values


// Define variables
let min = 1,
    max = 10,
    randomNumber = randomNum(min, max), // Tentative value set, will replace with random value within range
    chancesRemaining = 3;


// UI Elements
let minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message'),
    game = document.querySelector('#game');

// Set minNum & maxNum and insert values into DOM
// Min + Max numbers
minNum.textContent = min;
maxNum.textContent = max;


// Play again event listener

game.addEventListener('mousedown', function(e) {
    if(e.target.className === 'play-again') {
        document.location.reload();
    } 
});

// Listen for the guess input value
guessBtn.addEventListener('click', function() {
    let guess = parseInt(guessInput.value);

    // Validate
    if(isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please choose a number between ${min} and ${max}`, 'red');
    }

    // Check if won
    if(guess === randomNumber){
        // setMessage(`Amazing! The random number was ${randomNumber}.`, 'green');

        gameOver(true, `Amazing! The random number was ${randomNumber}.`);
    } else {

        chancesRemaining -= 1;

        if(chancesRemaining === 0) {
            gameOver(false, `Sorry, you ran out of guesses! Please play again.`);
        } else {
            setMessage(`Sorry, guess again! You have ${chancesRemaining} chances remaining.`, 'red');
        }
    }

});


// Game over function

function gameOver(won, msg) {

    let color;
    won === true ? color = 'green' : color = 'red';

    // Disable input
    guessInput.disabled = true;
    // Change border color
    guessInput.style.borderColor = color;
    // Set message
    setMessage(msg, color);
    // Play again?
    guessBtn.value = 'Play Again';
    guessBtn.className = 'play-again';
}


// Dynamic setMessage function (to support multiple cases)
function setMessage(msg, color) {
    message.textContent = msg;
    message.style.color = color;
};
// On submit, check to see if inputvalue matches with randomNumber


// Generate Random Number
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// 