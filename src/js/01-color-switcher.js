const refs = {
  buttonStart: document.querySelector('button[data-start]'),
  buttonStop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};
const {buttonStart, buttonStop, body} = refs;

let intervalId = null;
buttonStart.addEventListener('click', onBtnStartClick);
buttonStop.addEventListener('click', onBtnStopClick);

function onBtnStartClick(e) {
  intervalId = setInterval(() => {
    const randomColor = getRandomHexColor();
    body.style.backgroundColor = randomColor;
  }, 1000);
buttonStart.disabled = true;
  buttonStop.disabled = false;
}

function onBtnStopClick(e) {
  clearInterval(intervalId);
  buttonStop.disabled = true;
  buttonStart.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
