// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
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
    let timeleftMS = selectedDates.getTime() - Date.now();
    let timeLeft = convertMs(selectedDates.getTime() - Date.now());
    if (timeleftMS < 0) {
      window.alert('Please choose a date in the future');
    } else if (timeleftMS >= 0) {
      startBtn.disabled = false;
      return [
        (days.innerHTML = addLeadingZero(timeLeft.days)),
        (hours.innerHTML = addLeadingZero(timeLeft.hours)),
        (minutes.innerHTML = addLeadingZero(timeLeft.minutes)),
        (seconds.innerHTML = addLeadingZero(timeLeft.seconds)),
      ];
    }
  },
  onStart([days, hours, minutes, seconds]) {
    setInterval(() => {
      options.onClose();
      console.log(this.onClose());
    }, 1000);
  },
  //   maxDate: new Date().fp_incr(14),
  //   getDifDate(date) {
  //     new Date().fp_incr(date);
  //   },
};
const myInput = document.querySelector('#date-selector');
flatpickr(myInput, options);
const fp = flatpickr(myInput, {});
const calendars = flatpickr('.calendar', {});
myInput.addEventListener('change', function (e) {
  console.log(e.target.value);
  //   console.log(options.defaultDate);
  options.onClose(new Date(e.target.value));
  //   console.log(options.maxDate);
});
function convertMs(ms) {
  // Number of milliseconds per unit of time
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
}
startBtn.addEventListener('click', () => {});
