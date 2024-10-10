import { getRandomIntInclusive, playSound } from "./utils";

const BUTTON_LIT_TIME = 500;
const BUTTON_LIT_INTERVAL = 1000;
const BUTTON_SOUNDS = [
  { frequency: 261.6, duration: 0.5 }, // C4
  { frequency: 329.6, duration: 0.5 }, // E4
  { frequency: 392.0, duration: 0.5 }, // G4
  { frequency: 523.3, duration: 0.5 }, // C5
];
const CSS_LIT_CLASS = "lit";

function playGameOverSound() {
  // Play a descending tone for game over
  playSound(440, 0.1); // A4
  setTimeout(() => playSound(349.2, 0.1), 100); // F4
  setTimeout(() => playSound(261.6, 0.3), 200); // C4
}

export const gameButtons = document.querySelectorAll("main button");
export const gameOverButton = document.querySelector("footer button");
export const gameOverP = document.querySelector("#game-over");
export const scoreSpan = document.querySelector("#score");

export function createSimonGame() {
  let buttonPressIndex = 0;
  let score = 0;
  const sequence = [];

  const activateButtons = () => {
    gameButtons.forEach((button) => {
      button.disabled = false;

      // * Add click listener only once per button
      if (!button.hasClickListener) {
        button.addEventListener("click", handleButtonClick);
        button.hasClickListener = true;
      }
    });
  };

  const addRandomButtonToSequence = () => {
    setTimeout(() => {
      const selectedGameButton =
        gameButtons[getRandomIntInclusive(0, gameButtons.length - 1)];

      lightAButton(selectedGameButton);

      sequence.push(selectedGameButton);

      setTimeout(() => {
        activateButtons();
      }, BUTTON_LIT_INTERVAL);
    }, BUTTON_LIT_INTERVAL * sequence.length);
  };

  const disableButtons = () => {
    gameButtons.forEach((button) => {
      button.disabled = true;
    });
  };

  const lightAButton = (button) => {
    button.classList.add(CSS_LIT_CLASS);
    playButtonSound(button);

    setTimeout(() => {
      button.classList.remove(CSS_LIT_CLASS);
    }, BUTTON_LIT_TIME);
  };

  const lightButtons = () => {
    disableButtons();

    sequence.forEach((button, index) => {
      setTimeout(() => {
        lightAButton(button);
      }, BUTTON_LIT_INTERVAL * index);
    });

    addRandomButtonToSequence();
  };

  const handleButtonClick = (event) => {
    pressButton(event.target);
  };

  const playButtonSound = (button) => {
    const sound = BUTTON_SOUNDS[Array.from(gameButtons).indexOf(button)];
    playSound(sound.frequency, sound.duration);
  };

  const pressButton = (button) => {
    if (button === sequence[buttonPressIndex]) {
      button.classList.add(CSS_LIT_CLASS);
      playButtonSound(button);
      scoreSpan.textContent = ++score;
      buttonPressIndex++;

      setTimeout(() => {
        button.classList.remove(CSS_LIT_CLASS);
      }, BUTTON_LIT_TIME);
    } else {
      gameOverP.classList.remove("invisible");
      playGameOverSound();
      disableButtons();
    }

    if (buttonPressIndex === sequence.length) {
      buttonPressIndex = 0;

      setTimeout(() => {
        lightButtons();
      }, BUTTON_LIT_INTERVAL);
    }
  };

  return {
    lightButtons,
  };
}
