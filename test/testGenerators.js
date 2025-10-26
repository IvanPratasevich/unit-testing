import { random, shuffle } from 'lodash-es';

const randomArray = (min = 1, max = 20, length = 5) => {
  const arr = Array(length).fill(0);
  for (let i = 0; i < length; i++) {
    arr[i] = random(min, max);
  }

  return arr;
};
const randomPositiveArray = (length = 5) => randomArray(1, 100, length);
const randomNegativeArray = (length = 5) => randomArray(-100, -1, length);
const randomMixedArray = () =>
  shuffle(
    randomPositiveArray().concat(randomNegativeArray(), randomDecimalArray()),
  );
const randomDecimalArray = (length = 5) => randomArray(-1.2, -5.2, length);

const randomLetter = (uppercase = false) => {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const index = random(0, letters.length - 1);
  return uppercase ? letters[index].toUpperCase() : letters[index];
};
const randomStringArray = (length = 5, withUppercase = false) => {
  const arr = Array(length).fill(0);
  for (let i = 0; i < length; i++) {
    arr[i] = randomLetter(withUppercase);
  }
  return arr;
};

const generators = {
  positive: randomPositiveArray,
  negative: randomNegativeArray,
  mixed: randomMixedArray,
  decimal: randomDecimalArray,
  string: randomStringArray,
};

export {
  randomArray,
  randomPositiveArray,
  randomNegativeArray,
  randomDecimalArray,
  randomMixedArray,
  randomLetter,
  randomStringArray,
  generators,
};
