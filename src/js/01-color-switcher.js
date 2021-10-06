const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};
const TIME = 5000;
let chandgeColorByTime = null;
const getRandomHexColor = function () {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
let chandgeColor = function () {
  refs.body.style.backgroundColor = getRandomHexColor();
};
refs.startBtn.addEventListener('click', function () {
  if (!chandgeColorByTime) {
    chandgeColorByTime = setInterval(chandgeColor, TIME);
    console.log(chandgeColorByTime);
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
  }
});
refs.stopBtn.addEventListener('click', () => {
  clearInterval(chandgeColorByTime);
  refs.stopBtn.disabled = true;
  refs.startBtn.disabled = false;
  chandgeColorByTime = null;
});
