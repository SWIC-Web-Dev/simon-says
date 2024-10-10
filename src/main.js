import { createSimonGame, gameOverButton } from "./lib";

const INITIAL_GAME_DELAY = 1500;

setTimeout(() => {
  const simonGame = createSimonGame();
  simonGame.lightButtons();
}, INITIAL_GAME_DELAY);

gameOverButton.addEventListener("click", () => {
  location.reload();
});
