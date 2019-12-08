import { Day } from './day';

test('Part 1 small', () => {
  let h = 2;
  let w = 3;
  let size = w * h; // 150
  let line = '123456789012';

  let nLayers = line.length / size;

  let minZero = Infinity;
  let minLayer = Infinity;
  let ones = Infinity;
  let dues = Infinity;
  for (let i = 0; i < nLayers; i++) {
    let image = line.substr(i * size, i * size + size);
    console.log(image);

    let zeros = 0;
    let one = 0,
      due = 0;
    for (let j = 0; j < image.length; j++) {
      if (parseInt(image[j]) == 0) {
        zeros++;
      }

      if (parseInt(image[j]) == 1) {
        one++;
      }

      if (parseInt(image[j]) == 2) {
        due++;
      }
    }

    if (minZero > zeros) {
      minZero = zeros;
      minLayer = i;
      ones = one;
      dues = due;
    }
  }

  expect(ones * dues).toEqual(1);
});

test('Part 1 small', () => {
  let h = 2;
  let w = 3;
  let size = w * h; // 150
  let line = '003456789012';

  let nLayers = line.length / size;

  let minZero = Infinity;
  let minLayer = Infinity;
  let ones = Infinity;
  let dues = Infinity;
  for (let i = 0; i < nLayers; i++) {
    let image = line.substr(i * size, i * size + size);
    console.log(image);

    let zeros = 0;
    let one = 0,
      due = 0;
    for (let j = 0; j < image.length; j++) {
      if (parseInt(image[j]) == 0) {
        zeros++;
      }

      if (parseInt(image[j]) == 1) {
        one++;
      }

      if (parseInt(image[j]) == 2) {
        due++;
      }
    }

    if (minZero > zeros) {
      minZero = zeros;
      minLayer = i;
      ones = one;
      dues = due;
    }
  }

  expect(ones * dues).toEqual(1);
});
