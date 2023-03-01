'use strict';

//Buttons
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const dice = document.querySelector('.dice');

// Score
const score_0 = document.getElementById('score--0');
const score_1 = document.getElementById('score--1');
const currentscore_0 = document.getElementById('current--0');
const currentscore_1 = document.getElementById('current--1');

//Players
const player_0 = document.querySelector('.player--0');
const player_1 = document.querySelector('.player--1');
const player__winner = document.querySelector('.player-winner');

let scores, currentScore, activePlayer, playing;
const audio = document.getElementById('myAudio');

//Intialization
const initialValues = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score_0.textContent = 0;
  score_1.textContent = 0;
  currentscore_0.textContent = 0;
  currentscore_1.textContent = 0;

  dice.classList.add('hidden');
  player_0.classList.remove('player--winner');
  player_1.classList.remove('player--winner');
  player_0.classList.add('player--active');
  player_1.classList.remove('player--active');
  player__winner.textContent = '';
};

initialValues();

//Rolling the dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    const randomDice = Math.trunc(Math.random() * 6) + 1;
    dice.src = `dice-${randomDice}.png`;

    if (randomDice !== 1) {
      currentScore += randomDice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

//Switching players
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player_0.classList.toggle('player--active');
  player_1.classList.toggle('player--active');
};

//Hold Scores
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      player__winner.textContent = `Player ${activePlayer + 1} Wins!`;
      // dice.classList.add('hidden');
      audio.play();
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

//New game
btnNew.addEventListener('click', initialValues);
