import { Notify } from 'notiflix/build/notiflix-notify-aio';
import * as bootstrap from 'bootstrap';
import * as Popper from '@popperjs/core';
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        res({ position, delay });
      } else {
        // Reject
        rej({ position, delay });
      }
    }, delay * position);
  });
}

const form = document.querySelector('.form');
const inputDelay = form.elements['delay'];
const inputStep = form.elements['step'];
const inputAmount = form.elements['amount'];
form.addEventListener('submit', e => {
  e.preventDefault();
  setTimeout(() => {
    for (let i = 1; i <= inputAmount.value; i++) {
      createPromise(i, inputStep.value)
        .then(({ position, delay }) => {
          console.log();
          Notify.success(`✅ Fulfilled promise ${position} in ${position * delay}ms`);
        })
        .catch(({ position, delay }) => {
          console.log();
          Notify.failure(`❌ Rejected promise ${position} in ${position * delay}ms`);
        });
    }
  }, inputDelay.value);
});
