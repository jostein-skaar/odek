import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createGame, destroyGame } from './game';
import { polyfill } from 'mobile-drag-drop';
import 'mobile-drag-drop/default.css';

polyfill();
window.addEventListener('touchmove', function () {}, { passive: false });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

const startGameButtons = document.querySelectorAll<HTMLButtonElement>('.button-start-game')!;
startGameButtons.forEach((button) => {
  button.addEventListener('click', () => {
    startGame();
  });
});

function startGame() {
  document.body.classList.add('game-open');

  const viewportmeta = document.querySelector('meta[name=viewport]')!;
  viewportmeta.setAttribute('content', 'initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0');

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
