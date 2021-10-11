console.log(process.argv);

const fs = require('fs');
const path = require('path');

if (
  process.argv.length <= 3 ||
  isNaN(process.argv[2]) ||
  isNaN(process.argv[3]) ||
  isNaN(process.argv[4])
) {
  console.log(
    `Usage: ${path.basename(
      __filename
    )} INT_NUMBER_ONE INT_NUMBER_TWO INT_NUMBER_THREE`
  );
  process.exit(-1);
}

const maara = process.argv[2];
const min = process.argv[3];
const max = process.argv[4];
let numerot = Array.from(
  { length: maara },
  () =>
    Math.floor(Math.random() * (parseInt(max) + 1 - parseInt(min))) +
    parseInt(min)
);

console.log(`numerot ovat ${numerot}.`);
