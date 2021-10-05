// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix';

const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');
const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;
const addLeadingZero = function (value) {
  return value.toString().padStart(2, '0');
};
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates < 0) {
      Report.warning('Please choose a date in the future');
      return false;
    } else if (selectedDates >= 0) {
      startBtn.disabled = false;
      return selectedDates;
    }
  },
};
const myInput = document.querySelector('#datetime-picker');
flatpickr(myInput, options);
let pickedTime;
myInput.addEventListener('change', function (e) {
  pickedTime = new Date(e.target.value).getTime() - Date.now();
  options.onClose(pickedTime);
});
const convertMs = function (ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};
startBtn.addEventListener('click', e => {
  if (options.onClose(pickedTime)) {
    let timeToDate;
    setInterval(() => {
      pickedTime -= 1000;
      if (pickedTime <= 0) return;
      timeToDate = convertMs(pickedTime);
      days.innerHTML = addLeadingZero(timeToDate.days);
      hours.innerHTML = addLeadingZero(timeToDate.hours);
      minutes.innerHTML = addLeadingZero(timeToDate.minutes);
      seconds.innerHTML = addLeadingZero(timeToDate.seconds);
    }, 1000);
  }
  startBtn.disabled = true;
});
