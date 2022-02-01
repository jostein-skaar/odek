import './style.css';

const logo = document.querySelector<HTMLButtonElement>('.logo-button')!;
logo.addEventListener('click', () => {
  startGame();
});

var bg = document.querySelector<HTMLDivElement>('.game-bg')!;
var h1 = document.querySelector<HTMLDivElement>('.game-bg h1')!;

bg.addEventListener('click', () => {
  bg.classList.remove('show-bg');
  h1.classList.remove('show-h1');
});

function startGame() {
  console.log('klika');
  bg.classList.add('show-bg');
  h1.classList.add('show-h1');
}
