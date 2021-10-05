const fs = require('fs');
// haetaan lista numeroista txt tiedostosta.
fs.readFile('H0503.txt', (error, data) => {
  if (error) {
    console.error(error);
    return;
  }
  // console.log(data.toString()); näyttää stringinä txt filun sisällön
  // muutetaan datatostring taulukoksi
  let numerot = data.toString().split(',');
  // kokeillaa menikö numerot taulukkoon console.log(numerot)
  // nyt on taulukko numeroita stringinä, konvertoidaan numeroksi parseInt
  // ja lasketaan yhteen funktiolla arr.reduce((a, b) => a + b)
  let sum = numerot.reduce(function (a, b) {
    return parseInt(a) + parseInt(b);
  });

  console.log(sum);
});
// huomaa viimeinen rivi koodia keritään tulostaa ennen kuin callback funktio on valmis.
console.log('Reading file and calculate a sum...');
