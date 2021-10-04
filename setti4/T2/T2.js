async function getHouses() {
  let url = 'houses.json';
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
async function renderHouses() {
  let houses = await getHouses();
  console.log(houses);

  let housediv = document.getElementById('talot');

  houses.forEach((house) => {
    housecontainer = document.createElement('div');
    housecontainer.style.display = 'block';
    housecontainer.className = 'houseContainer';
    housecontainer.id = 'houseContainer';

    let image = document.createElement('img');
    image.src = house.image;
    image.className = 'houseImage';

    /*
           Ohjelmoi tähän toiminnallisuus, jossa luodaan p-elementit
           myös talon koon, tekstikuvauksen ja hinnan näyttämiselle
           Hinnan voit muotoilla tuhaterottimia käyttävään suomalaiseen
           muotoon esim:
        let numberstr = new Intl.NumberFormat('fi-FI').format(house.price);
      */

    let name = document.createElement('p');
    name.className = 'name';
    name.innerHTML = house.name;

    let header = document.createElement('p');
    header.className = 'header';
    header.innerHTML = house.address;

    let size = document.createElement('p');
    size.className = 'size';
    size.innerHTML = house.size + 'm²';

    let text = document.createElement('p');
    text.className = 'text';
    text.innerHTML = house.text;

    let price = document.createElement('p');
    price.className = 'price';
    price.innerHTML = new Intl.NumberFormat('fi-FI').format(house.price) + '€';

    housecontainer.appendChild(image);
    housecontainer.appendChild(header);

    /* Ohjelmoi tähän toiminnallisuus, jossa liität edellä
                  luomasi p-elementit myös housecontaineriin
              */
    housecontainer.appendChild(name);
    housecontainer.appendChild(size);
    housecontainer.appendChild(text);
    housecontainer.appendChild(price);

    housediv.appendChild(housecontainer);
  });
}

renderHouses();

async function filterPrice() {
  let houses = await getHouses();

  function etsiHinta(arr, prop) {
    let hinta = [];
    for (let i = 0; i < arr.length; i++) {
      hinta.push(arr[i][prop]);
    }
    return hinta;
  }
  let price = etsiHinta(houses, 'price');

  let check2 = document.getElementById('cbox2');
  let housec = document.getElementsByClassName('houseContainer');

  for (let i = 0; i < price.length; i++) {
    if (price[i] > 1000000 && check2.checked == true) {
      housec[i].style.display = 'none';
    } else {
      housec[i].style.display = 'block';
    }
  }
}

async function filterSize() {
  let houses = await getHouses();

  function etsiKoko(arr, prop) {
    let size = [];
    for (let i = 0; i < arr.length; i++) {
      size.push(arr[i][prop]);
    }
    return size;
  }
  let size = etsiKoko(houses, 'size');
  console.log(size);

  let check1 = document.getElementById('cbox1');
  let housec = document.getElementsByClassName('houseContainer');

  for (let i = 0; i < size.length; i++) {
    if (size[i] > 200 && check1.checked == true) {
      housec[i].style.display = 'none';
    } else {
      housec[i].style.display = 'block';
    }
  }
}
