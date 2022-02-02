import { createGame } from './game';
import './style.css';
import './modal.css';

const logo = document.querySelector<HTMLButtonElement>('.logo-button')!;
logo.addEventListener('click', () => {
  startGame();
});

var bg = document.querySelector<HTMLDivElement>('.game-bg')!;

bg.addEventListener('click', () => {
  // bg.classList.remove('show');
  // document.body.classList.remove('game-open');
});

function startGame() {
  bg.classList.add('show');
  document.body.classList.add('game-open');
  createGame(bg);
}
