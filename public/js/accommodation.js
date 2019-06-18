$('.tab-item').click(function() {
  $('.collapse').collapse('hide');
});

$('.carousel').carousel({
  interval: 10000
});

function getParameter(paramName) {
  let searchString = window.location.search.substring(1),
    i,
    val,
    params = searchString.split('&');

  for (i = 0; i < params.length; i++) {
    val = params[i].split('=');
    if (val[0] == paramName) {
      return val[1];
    }
  }
  return null;
}
let idGrada = getParameter('grad-id');
let idHotel = getParameter('hotel-id');

// prikaz imena grada
fetch(`/city/${idGrada}`)
  .then(res => res.json())
  .then(res => document.getElementById('city-name').innerHTML = `${res[0].ime}`);

// prikaz imena hotela i opisa
fetch(`/hotel/${idHotel}`)
.then(res => res.json())
.then(
  res => {
    document.getElementById('hotel-description').innerHTML = 
    `<h1 class='h-25'>${res[0].ime}</h1>
    <div id='starsAccomod' class='align-items-center'>*****</div>
    <p class='h-75 pr-3'>${res[0].opis}</p>
    <button class='btn btn-primary d-inline-block mb-3' type='button' data-toggle='modal' data-target='#addFeed'>Dodaj feed...</button>`;

    document.getElementById('hotel-image-1').src = `${res[0].url_slike}`;
    document.getElementById('hotel-image-1').alt = `${res[0].ime}`;
    document.getElementById('hotel-image-2').src = `${res[0].url_slike}`;
    document.getElementById('hotel-image-2').alt = `${res[0].ime}`;
    document.getElementById('hotel-image-3').src = `${res[0].url_slike}`;
    document.getElementById('hotel-image-3').alt = `${res[0].ime}`;
    document.getElementById('hotel-image-4').src = `${res[0].url_slike}`;
    document.getElementById('hotel-image-4').alt = `${res[0].ime}`;
    document.getElementById('hotel-image-5').src = `${res[0].url_slike}`;
    document.getElementById('hotel-image-5').alt = `${res[0].ime}`;
  }
);

// prikaz hotela u tom gradu

let display = "";
fetch(`/hotels/${idGrada}`)
  .then(res => res.json())
  .then(res => {
    let mapiraniHoteli = [...res];
    mapiraniHoteli.length = 3;
    mapiraniHoteli.forEach(element => {
      display += `<li class="list-group-item list-group-item-primary mb-1">
        <a href="accommodation.html?hotel-id=${element.id}&grad-id=${idGrada}">
          <div class="row align-items-center text-center">
            <div class="col-lg-2 col-md-3 col-sm-4 mb-3">
              <img class="d-block mx-auto" src="${
                element.url_slike
              }" height="100px" alt="${element.ime}">
            </div>
            <div class="col-lg-9 col-md-8 ml-3 col-sm-7">
              <div class="clearfix pl-4">
                <h1 id="nameAccomod" class="float-left">${element.ime}</h1>
                <div id="starsAccomod" class="float-right align-items-center">*****</div>
              </div>
              <p id="descriptionAccomod" class="text-left pl-4">${
                element.opis
              }</p>
            </div> 
          </div>
        </a>
      </li>`;
      document.getElementById("topAccomodations").innerHTML = display;
    });
});