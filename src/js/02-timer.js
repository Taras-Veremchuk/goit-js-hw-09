// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  dateDay: document.querySelector('.value[data-days]'),
  dateHours: document.querySelector('.value[data-hours]'),
  dateMinutes: document.querySelector('.value[data-minutes]'),
  dateSeconds: document.querySelector('.value[data-seconds]'),
  btnStart: document.querySelector('button[data-start]'),
  input: document.querySelector('input#datetime-picker'),
};
const { dateDay, dateHours, dateMinutes, dateSeconds, btnStart, input } = refs;

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selecedTime = selectedDates[0] - options.defaultDate;
    if (selecedTime < 0) {
      btnStart.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    } else {
      btnStart.disabled = false;
    }
  },
};

flatpickr(input, options);

btnStart.addEventListener('click', onBtnStartClick);
let intervalId = null;

function onBtnStartClick() {
  // console.log(input.value);
  intervalId = setInterval(() => {
    const deltaTime = new Date(input.value) - Date.now();
    if (deltaTime > 0) {
      successfulResult(deltaTime);
    } else {
      unSuccessfulResult();
      return;
    }
  }, 1000);
}
function successfulResult(value) {
  const { days, hours, minutes, seconds } = convertMs(value);
  setTimeComponents({ days, hours, minutes, seconds });
}
function unSuccessfulResult() {
  clearInterval(intervalId);
  // Notiflix.Notify.success('Let`s start');
  return;
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function setTimeComponents({ days, hours, minutes, seconds }) {
  dateDay.textContent = days;
  dateHours.textContent = hours;
  dateMinutes.textContent = minutes;
  dateSeconds.textContent = seconds;
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}