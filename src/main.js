import { INITIAL_GAME_DELAY, lightButtons } from "./lib";

setTimeout(() => {
  // Pass in an initial sequence or nothing to start a new game.
  lightButtons();
}, INITIAL_GAME_DELAY);
