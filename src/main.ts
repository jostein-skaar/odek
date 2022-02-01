import './style.css';

const logo = document.querySelector<HTMLButtonElement>('.logo-button')!;
logo.addEventListener('click', (e) => {
  //startGame();
});

var bg = document.querySelector<HTMLDivElement>('.game-bg')!;
bg.addEventListener('click', (e) => {
  // bg.classList.remove('show');
});

function startGame() {
  console.log('klika');
  bg.classList.add('show');
}
