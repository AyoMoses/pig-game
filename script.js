'use strict';

// const score0 = document.getElementById('score--0');
// const score1 = document.getElementById('score--1');

// selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');


// starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
