const audioContext = new (window.AudioContext || window.webkitAudioContext)();

export function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

export function playSound(frequency, duration) {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = "sine";
  oscillator.frequency.value = frequency;

  gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.01,
    audioContext.currentTime + duration,
  );

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
}
