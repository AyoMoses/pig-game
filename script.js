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

// starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0]; //store the scores of both player
let currentScore = 0;
let activePlayer = 0;


// rolling dice functionality
btnRoll.addEventListener('click', function () {
    // 1. Generating a random dice roll 
    // note Math.random() generates a number between 0 - 999999 not up to 1. Math trunc removes the integers. The times 6 returns 5 which is one lesser than the original number then we add 1 to get us to the intended value
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice and bing src to dice random number
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    console.log(dice);


    // 3. Check for a rolled dice number 1. If true, switch to next player
    if (dice !== 1) {
        // Add dice to current score
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
        // Switch to the next player if number 1 is rolled

        // switch to 0 upon active player change
        document.getElementById(`current--${activePlayer}`).textContent = 0;

        // if active player is player 1 then switch to player 2 else leave as P1
        currentScore = 0; // switch to 0 upon active player change
        activePlayer = activePlayer === 0 ? 1 : 0;

        // toggle the class if its there if its Notification, add it. remeber you have it added in the html for P1
        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');
    }
})
