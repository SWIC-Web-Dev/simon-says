import { gameButtons, INITIAL_GAME_DELAY, lightButtons } from "./lib";

const sequence = [...gameButtons];

setTimeout(() => {
  lightButtons(sequence);
}, INITIAL_GAME_DELAY);
