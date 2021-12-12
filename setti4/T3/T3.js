// Haetaan tiedot jsonista

async function getNimet() {
  let url = 'nimet.json';
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
async function renderNimet() {
  let nimi = await getNimet();
  console.log(nimi);
  // luodaan nimistä li elementti htmlssä olevaan ul elementtiin
  let nimetUL = document.getElementById('myUL');

  nimi.forEach((a) => {
    nimikontti = document.createElement('li');
    nimikontti.className = 'selected';
    let name = document.createElement('p');

    name.innerHTML = a;
    nimikontti.appendChild(name);
    nimetUL.appendChild(nimikontti);
  });
}

renderNimet();

// haku jiiässää
function myFunction() {
  // Declare variables
  let input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('haku');
  filter = input.value.toUpperCase();
  ul = document.getElementById('myUL');
  li = ul.getElementsByTagName('li');

  const inputDisplay = input.value.length > 0 ? 'block' : 'none';
  ul.style.display = inputDisplay;
  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    p = li[i].getElementsByTagName('p')[0];
    txtValue = p.textContent || p.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = '';
    } else {
      li[i].style.display = 'none';
    }
  }
}
// haun tyhjennys

function onkeypressed(evt, input) {
  let code = evt.charCode || evt.keyCode;
  if (code == 27) {
    input.value = '';
  }
}
