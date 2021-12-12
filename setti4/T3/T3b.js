fetch('nimet.json')
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error('Virhe haettaessa tietoa');
    }
  })
  .then((data) => console.log(data));

let hakusana = [];
const input = document.getElementById('haku');
let syote = input.value;

document.onkeypress = function (evt) {
  evt = evt || window.event;
  let key = typeof evt.which == 'number' ? evt.which : evt.keyCode;
  if (key) {
    hakusana.push(String.fromCharCode(key));
  }
};
