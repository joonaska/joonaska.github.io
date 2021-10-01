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
    housecontainer.className = 'houseContainer';

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
