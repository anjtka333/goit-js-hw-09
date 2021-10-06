import { Notify } from 'notiflix/build/notiflix-notify-aio';
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
    }, delay);
  });
}
const form = document.querySelector('.form');
const inputDelay = form.elements['delay'];
const inputStep = form.elements['step'];
const inputAmount = form.elements['amount'];
form.addEventListener('submit', e => {
  e.preventDefault();
  let sumMin = parseInt(inputDelay.value);
  for (let i = 1; i <= inputAmount.value; i++) {
    console.log(sumMin);
    createPromise(i, sumMin)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    sumMin += parseInt(inputStep.value);
  }
});
