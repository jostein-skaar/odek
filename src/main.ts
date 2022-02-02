import { createGame, destroyGame } from './game';
import './style.css';

const logo = document.querySelector<HTMLButtonElement>('.logo-button')!;
logo.addEventListener('click', () => {
  startGame();
});

// var bg = document.querySelector<HTMLDivElement>('.game-container')!;
var headerElement = document.querySelector<HTMLElement>('header')!;
var mainElement = document.querySelector<HTMLElement>('main')!;

// bg.addEventListener('click', () => {
//   // bg.classList.remove('show');
//   // document.body.classList.remove('game-open');
// });

function startGame() {
  headerElement.classList.add('hide');
  mainElement.classList.add('hide');
  setTimeout(() => {
    headerElement.classList.add('remove');
    mainElement.classList.add('remove');
    document.body.classList.add('game-open');
    const gameElement = createGame(document.body);
    setTimeout(() => {
      // Need to wait to the canvas is added to the dom to be able to have transition.
      gameElement.classList.add('show-canvas');
      var closeButton = document.createElement('button');
      closeButton.classList.add('close-button');
      closeButton.innerText = 'X';
      document.body.appendChild(closeButton);
      closeButton.addEventListener('click', () => {
        document.body.removeChild(closeButton);
        headerElement.classList.remove('remove', 'hide');
        mainElement.classList.remove('remove', 'hide');
        document.body.classList.remove('game-open');
        gameElement.classList.remove('show-canvas');
        setTimeout(() => {
          destroyGame();
        }, 500);
      });
    }, 50);
  }, 500);

  // bg.classList.add('show');
  // document.body.classList.add('game-open');
  // createGame(bg);
}
