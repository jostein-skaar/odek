import { createGame, destroyGame } from './game';
import './style.css';

const logo = document.querySelector<HTMLButtonElement>('.logo-button')!;
logo.addEventListener('click', () => {
  startGame();
});

function startGame() {
  document.body.classList.add('game-open');
  const gameElement = createGame(document.body);
  setTimeout(() => {
    // Need to wait to the canvas is added to the dom to be able to have transition.
    // TODO: Listen to an event instead?
    gameElement.classList.add('show-canvas');
    var closeButton = document.createElement('button');
    closeButton.classList.add('close-button');
    closeButton.innerText = 'X';
    document.body.appendChild(closeButton);
    closeButton.addEventListener('click', () => {
      document.body.removeChild(closeButton);
      document.body.classList.remove('game-open');
      gameElement.classList.remove('show-canvas');
      setTimeout(() => {
        // Need to wait for the css transitions to be done before cleaning up.
        // TODO: Prevent destroying if opening game again really fast.
        destroyGame();
      }, 500);
    });
  }, 50);
}
