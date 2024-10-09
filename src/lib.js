import { getRandomIntInclusive } from "./utils";

const BUTTON_LIT_TIME = 500;
const BUTTON_LIT_INTERVAL = 1000;

// TODO: Refactor to use a generator function
let buttonPressIndex = 0;
let score = 0;
const scoreSpan = document.querySelector("#score");

// Allow time for initial animation to complete
export const INITIAL_GAME_DELAY = 1500;

export const gameButtons = document.querySelectorAll("main button");
export const gameOverP = document.querySelector("#game-over");
export const main = document.querySelector("main");

export function activateButtons(sequence) {
  gameButtons.forEach((button) => {
    button.disabled = false;

    // * Re-adding listeners causes clicks to be 'doubled,' breaking the game.
    if (!button.hasClickListener) {
      button.addEventListener("click", (e) => {
        pressButton(e, sequence);
      });

      button.hasClickListener = true;
    }
  });
}

export function lightAButton(button) {
  button.classList.add("lit");

  setTimeout(() => {
    button.classList.remove("lit");
  }, BUTTON_LIT_TIME);
}

export function lightButtons(sequence) {
  removeButtonListeners();

  sequence.forEach((button, index) => {
    setTimeout(() => {
      lightAButton(button);
    }, BUTTON_LIT_INTERVAL * index);
  });

  setTimeout(() => {
    const selectedGameButton =
      gameButtons[getRandomIntInclusive(0, gameButtons.length - 1)];

    lightAButton(selectedGameButton);

    sequence.push(selectedGameButton);

    setTimeout(() => {
      activateButtons(sequence);
    }, BUTTON_LIT_INTERVAL);
  }, BUTTON_LIT_INTERVAL * sequence.length);
}

export function pressButton(event, sequence) {
  const button = event.target;

  // If it's the correct button...
  if (button === sequence[buttonPressIndex]) {
    button.classList.add("lit");
    scoreSpan.textContent = ++score;
    buttonPressIndex++;

    setTimeout(() => {
      button.classList.remove("lit");
    }, BUTTON_LIT_TIME);
  } else {
    gameOverP.classList.remove("invisible");
    removeButtonListeners();
  }

  // If the player has pressed all the buttons in the sequence,  move on...
  if (buttonPressIndex === sequence.length) {
    buttonPressIndex = 0;

    setTimeout(() => {
      lightButtons(sequence);
    }, BUTTON_LIT_INTERVAL);
  }
}

export function removeButtonListeners() {
  gameButtons.forEach((button) => {
    button.disabled = true;
  });
}
