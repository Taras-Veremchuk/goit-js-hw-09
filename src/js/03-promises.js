import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
};
const {form, delay, step, amount} = refs;

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const valueDelay = +delay.value;
  const valueStep = +step.value;
  const valueAmount = +amount.value;

for (let i = 1; i <= valueAmount; i++) {
createPromise(i, valueDelay + (i-1)* valueStep)
.then(({ position, valueDelay }) => {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${valueDelay}ms`);
})
.catch(({ position, valueDelay }) => {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${valueDelay}ms`);
}
);
}
});

function createPromise(position, valueDelay) {
  return new Promise((resolve, reject) => {
  const shouldResolve = Math.random() > 0.3;
  setTimeout(() => {
    if (shouldResolve) {
      resolve({ position, valueDelay });
    } else {
      reject({ position, valueDelay });
    }
  }, valueDelay);
});
}

