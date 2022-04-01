'use strict';

// selecting elements
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// FRO GLOBAL SCOPING OUT SIDE THE INIT FUNCTION WE DECLARE THE INIT STATE and reassign their values in the function
let scores, currentScore, activePlayer, playing;
// this makes them accessible everywhere due to global scoping 


const playSound = function (sound) {
    let soundEffect = new Audio(sound);
    soundEffect.play();
}
const stopSound = function () {
    let stopSound = new Audio('clap.wav');
    stopSound.pause();
    stopSound.currentTime = 0;
}

// starting conditions
// RESET TO INITIALIZATION STATE 
const init = function () {
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    scores = [0, 0]; //store the scores of both player
    currentScore = 0;
    activePlayer = 0;
    playing = true; // a variable to hold the state of the game 

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}
// run the function so the function is initialized on page load
init();

const switchPlayer = function () {
    // Switch to the next player if number 1 is rolled

    // switch to 0 upon active player change
    document.getElementById(`current--${activePlayer}`).textContent = 0;

    // if active player is player 1 then switch to player 2 else leave as P1
    currentScore = 0; // reset to 0 upon active player change

    // switching th active player. active becomes the current one 
    activePlayer = activePlayer === 0 ? 1 : 0;

    // toggle the class if its there if its Notification, add it. remeber you have it added in the html for P1
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};


// rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (playing) { //since playing is already a boolean, no need to check if its === true

        // 1. Generating a random dice roll 
        // note Math.random() generates a number between 0 - 999999 not up to 1. Math trunc removes the integers. The times 6 returns 5 which is one lesser than the original number then we add 1 to get us to the intended value
        const dice = Math.trunc(Math.random() * 6) + 1;
        // 2. Display dice and bing src to dice random number
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
        playSound('click-sound.wav');


        // 3. Check for a rolled dice number 1. If true, switch to next player
        if (dice !== 1) {
            // Add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            // Switch to the next player if number 1 is rolled
            switchPlayer();
        }
    }
})


// hold active player score and add to total score 
btnHold.addEventListener('click', function () {
    if (playing) {
        // 1. add current score to active player's score 
        scores[activePlayer] += currentScore;
        // scores[activePlayer] = scores[activePlayer] + currentScore

        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        diceEl.classList.add('hidden');
        playSound('hold-sound.wav');

        // 2. check if player's score is >= 100
        if (scores[activePlayer] >= 100) {
            playing = false;
            diceEl.classList.add('hidden');
            // Finish the game
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            playSound('clap.wav');

        } else {
            // Switch to the next player
            switchPlayer();
        }
    }
})


// RESET VALUES ON CLICK FOR NEW GAME 
btnNew.addEventListener('click', init);
