import { getRandomIntInclusive } from "./utils";

const BUTTON_LIT_TIME = 500;
const BUTTON_LIT_INTERVAL = 1000;
const CSS_LIT_CLASS = "lit";

export const gameButtons = document.querySelectorAll("main button");
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

  const pressButton = (button) => {
    if (button === sequence[buttonPressIndex]) {
      button.classList.add(CSS_LIT_CLASS);
      scoreSpan.textContent = ++score;
      buttonPressIndex++;

      setTimeout(() => {
        button.classList.remove(CSS_LIT_CLASS);
      }, BUTTON_LIT_TIME);
    } else {
      gameOverP.classList.remove("invisible");
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
