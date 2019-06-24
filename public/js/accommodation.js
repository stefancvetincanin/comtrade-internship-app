let idGrada = getParameter('grad-id');
let idHotel = getParameter('hotel-id');
let display = '';
let feedbackArray = []
let rating = ''
let mapiraniHoteli = []
let showMore = false
let map;

// funkcija za izvlacenje parametara iz adrese browsera
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

// pocetno prikazivanje feedbacka na stranici
function nabaviFeedback() {
  fetch(`/feedback-hotel/${idHotel}`)
  .then(res => res.json())
  .then(res => {
    feedbackArray = res
    let feedbackDisplay = ''
    feedbackArray.forEach((feedback, index) => {
      let rating = Math.round(feedback.rating)
      let stringZvezdice = ''
      while(rating > 0) {
        stringZvezdice += `<i class="text-warning fa fa-star"></i>`
        rating--
      }
      if(!stringZvezdice)
        stringZvezdice = 'Nema ocena'
        feedbackDisplay += `
          <div class="carousel-item ${index === 0 ? "active" : null}">
            <div class="card col-lg-12 bg-light mb-4 px-4 py-3 mx-auto">
              <div class="row card-body">
                <div class="col-md-4">
                  <img src="${feedback.slika}" class="rounded-circle" height="75px" alt=""/>
                </div>
                <div class="col-8">
                  <h4>Username</h4>
                  <div>
                    ${stringZvezdice}
                  </div>
                </div>
              </div>
              <div>
                <p class="mb-0">
                  ${feedback.opis}
                </p>
              </div>
              <div class="row justify-content-center">
                <div class="w-50">
                  <button class="prikazi-modal btn btn-warning btn-block text-white mt-1" data-feedback-id=${feedback.id} type="button" data-toggle="modal" data-target="#modalFeedback">
                    More
                  </button>
                </div>
              </div>
            </div>
          </div>
          `
      })
    document.getElementById('feedback-display').innerHTML = feedbackDisplay
    $('.prikazi-modal').on('click', function () {
      prikaziFeedbackModal($(this).attr('data-feedback-id'))
    })
  })
}

// funkcija ispisuje feedback u modalu
function prikaziFeedbackModal(id) {
  let filtriranFeedback = feedbackArray.filter(element => element.id === Number(id))
  let rating = Math.round(filtriranFeedback[0].rating)
      let stringZvezdice = ''
      while(rating > 0) {
        stringZvezdice += `<i class="text-warning fa fa-star"></i>`
        rating--
      }
      if(!stringZvezdice)
        stringZvezdice = 'Nema ocena'
  document.getElementById('modalFeedback').innerHTML = `
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <div class="row card-body">
            <div class="col-4">
              <img src="${filtriranFeedback[0].slika}" class="rounded-circle" height="100px" alt="user"/>
            </div>
            <div class="col-8">
              <h4>${filtriranFeedback[0].ime} ${filtriranFeedback[0].prezime}</h4>
              <div>${stringZvezdice}</div>
              <small>${filtriranFeedback[0].datum.substring(0, 10)} ${filtriranFeedback[0].datum.substring(11, 19)}</small>
            </div>
          </div>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <p>
            ${filtriranFeedback[0].opis}
            </p>
          </div>
          <div class="clearfix mb-3">
            <button id="btnFooterToggle" type="button" class="btn btn-primary float-right">
              Toggle comment
            </button>
          </div>
          <div class="commentGroup">
            <form class="w-100 p-0 mb-3 id="forma-comment">
              <div class="form-group justify-content-center">
                <label for="comment">Message</label>
                <textarea class="form-control" id="comment-on-feedback" rows="3" required minlength="20" maxlength="300"></textarea>
              </div>
              <div class="clearfix">
                <button type="submit" class="btn btn-primary float-right">
                  Send comment
                </button>
              </div>
            </form>
            <ul class="list-group mb-1" id="commentList">
            </ul>
          </div>
        </div>
      </div>
    </div>
    `
  $('#btnFooterToggle').on('click', function() {
    $('#forma-comment').slideToggle()
  })

  // forma za ostavljanje komentara na feedback
  $('#forma-comment').on('submit', function(e){
    e.preventDefault()
    const commentBody = {
      feedbackId: Number(id),
      text: $('#comment-on-feedback').val(),
      korisniciId: Math.floor(Math.random() * (5 - 1)) + 1
    }
    const commentOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(commentBody)
    }
    $('#comment-on-feedback').val('')
    fetch('/post-comment-hotel', commentOptions)
      .then(res => res.json())
      .then(res => {
        if(res.poslato)
        nabaviSpisakKomentara(id)
      })
  })
  nabaviSpisakKomentara(id)
}

// funkcija nabavlja spisak komentara iz baze i prikazuje ih u modalu
function nabaviSpisakKomentara(id) {
  fetch(`/komentar-hotel/${id}`)
  .then(res => res.json())
  .then(res => {
    let displayComments = ''
    res.forEach(comment => {
      displayComments += `
        <li class="list-group-item list-group-item-warning clearfix d-flex">
          <div class="mr-3 align-self-center">
            <img class="rounded-circle " src="${comment.slika}" alt="${comment.ime}" width="90px"/>
          </div>
          <div class="d-block w-100">
            <div>
              <div class="d-inline-block w-25 bg-primary text-white text-center mb-2 float-left">
                ${comment.ime} ${comment.prezime}
              </div>
              <div class="float-right">
                <small>${comment.datum.substring(0, 10)} ${comment.datum.substring(11, 19)}</small>
              </div>
            </div>
            <div class="d-inline-block w-100 text-dark">
              ${comment.text}
            </div>
          </div>
        </li>
      `
    })
    document.getElementById('commentList').innerHTML = displayComments
  })
}

function izlistajHotele(mapiraniHoteli, limit) {
  mapiraniHoteli = [...mapiraniHoteli]
  mapiraniHoteli.length = limit
  display = ''
  mapiraniHoteli.forEach(element => {
    let rating = Math.round(element['AVG(feedback_hotel.rating)'])
    let stringZvezdice = ''
    while(rating > 0) {
      stringZvezdice += `<i class="text-warning fa fa-star"></i>`
      rating--
    }
    if(!stringZvezdice)
      stringZvezdice = 'Nema ocena'
    display += 
    `<li class="list-group-item list-group-item-primary mb-1">
      <a href="accommodation.html?hotel-id=${element.id}&grad-id=${idGrada}">
        <div class="row align-items-center text-center">
          <div class="col-lg-2 col-md-3 col-sm-4 mb-3">
            <img class="d-block mx-auto" src="${element.url_slike}" height="100px" alt="${element.ime}">
          </div>
          <div class="col-lg-9 col-md-8 ml-3 col-sm-7">
            <div class="clearfix pl-4">
              <h1 id="nameAccomod" class="float-left">${element.ime}</h1>
              <div id="starsAccomod" class="float-right align-items-center">${stringZvezdice}</div>
            </div>
            <p id="descriptionAccomod" class="text-left pl-4">${element.opis}</p>
          </div> 
        </div>
      </a>
    </li>`;
    document.getElementById("topAccomodations").innerHTML = display;
  });
}

// sakrivanje tabova
$('.tab-item').click(function() {
  $('.collapse').collapse('hide');
});

// interval smena slika u slideru
$('.carousel').carousel({
  interval: 10000
});

// show more/show less hotels dugme
// dugme proverava globalnu promenljivu showMore, i zavisno od stanja prikazuje vise ili manje hotela
$('#show-more-hotels').on('click', function() {
  if(!showMore) {
    izlistajHotele(mapiraniHoteli, 10)
    showMore = true
    $(this).html('Show less...')
  }
  else {
    izlistajHotele(mapiraniHoteli, 3)
    showMore = false
    $(this).html('Show more...')
  }
})

nabaviFeedback()

// prikazi ime grada
fetch(`/city/${idGrada}`)
  .then(res => res.json())
  .then(res => document.getElementById('city-name').innerHTML = `<a href="city.html?grad-id=${idGrada}">${res[0].ime}</a>`);

// prikaz imena hotela i opisa pri load-u stranice
fetch(`/hotel/${idHotel}`)
.then(res => res.json())
.then(
  res => {
    document.getElementById("body").style.backgroundImage = `url(${
      res[0].url_slike
    })`
    let rating = Math.round(res[0]['AVG(feedback_hotel.rating)'])
      let stringZvezdice = ''
      while(rating > 0) {
        stringZvezdice += `<i class="fa fa-star"></i>`
        rating--
      }
      if(!stringZvezdice)
        stringZvezdice = 'Nema ocena'
    document.getElementById('hotel-description').innerHTML = 
    `<h1 class='h-25'>${res[0].ime}</h1>
    <div class="current-hotel-rating">${stringZvezdice}</div>
    <p class='h-75 pr-3 mb-1'>${res[0].opis}</p>
    <a href="#" class="mb-1 d-block" data-toggle='modal' data-target='#modalZaMape'><i>Address: ${res[0].address}</i></a>
    <a href="${res[0].url_booking}" target="_blank">This hotel on booking.com</a><br>
    <button class='btn btn-primary d-inline-block mb-3 mt-1' type='button' data-toggle='modal' data-target='#addFeed'>Dodaj feed...</button>`;

    document.getElementById('hotel-image-1').src = `${res[0].url_slike}`;
    document.getElementById('hotel-image-1').alt = `${res[0].ime}`;
    document.getElementById('hotel-image-2').alt = `${res[0].ime}`;
    document.getElementById('hotel-image-3').alt = `${res[0].ime}`;
    document.getElementById('hotel-image-4').alt = `${res[0].ime}`;
    document.getElementById('hotel-image-5').alt = `${res[0].ime}`;
    document.getElementById('hotel-image-6').alt = `${res[0].ime}`; 
    

    document.getElementById('modalMapeHeader').innerHTML = `
        <div class="card-body">     
            <h4>${res[0].ime}</h4>
            <p>${res[0].address}</p>
        </div>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
    `

    prikaziMapu(res[0].longitude, res[0].latitude) 

    fetch(`/hotel-images/${idHotel}`)
    .then(res => res.json())
    .then(
      res => {
        document.getElementById('hotel-image-2').src = `${res[0].url_slike}`;   
        document.getElementById('hotel-image-3').src = `${res[1].url_slike}`;
        document.getElementById('hotel-image-4').src = `${res[2].url_slike}`;
        document.getElementById('hotel-image-5').src = `${res[3].url_slike}`;
        document.getElementById('hotel-image-6').src = `${res[4].url_slike}`;
      })
  }
);

// prikaz hotela u tom gradu
fetch(`/hotels/${idGrada}`)
  .then(res => res.json())
  .then(res => {
    mapiraniHoteli = [...res];
    // mapiraniHoteli.length = 3;
    izlistajHotele(mapiraniHoteli, 3)
});

// Forma za ostavljanje feedbacka za hotel
$('#form-hotel-feedback input[type=radio]').on('change', function() {
  rating = ($('input[name=rate]:checked').val())
})

$('#form-hotel-feedback').on('submit', function(e) {
  e.preventDefault()
  // Slanje feedbacka za hotel:
  const feedbackBody = {
    hotelId: idHotel,
    korisniciId: Math.floor(Math.random() * (5 - 1)) + 1,
    rating: rating,
    naziv: $('#naziv-feedback-hotel').val(),
    opis: $('#comment-feedback').val()
  }
  const feedbackOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(feedbackBody)
  }
  fetch('/post-feedback-hotel', feedbackOptions)
    .then(res => res.json())
    .then(res => {
      if(res.poslato)
        $('#addFeed').modal('hide')
        nabaviFeedback()
    })
})

function prikaziMapu(lng, lat) {
  mapboxgl.accessToken = 'pk.eyJ1IjoibGF6YXJ2dHN0IiwiYSI6ImNqeGE0em1rbDB1djkzbnAzaXZqZGdxanYifQ.2E8B6mI5FO53BV1hGxJiTg';
  map = new mapboxgl.Map({
  container: 'map', 
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [lng, lat], 
  zoom: 15
  });

  map.addControl(new mapboxgl.NavigationControl());

  var marker = new mapboxgl.Marker({color: '#ada074'});

  marker.setLngLat([
    lng,
    lat
  ]);

  marker.addTo(map);

  var layerList = document.getElementById('map-menu');
  var inputs = layerList.getElementsByTagName('input');
  
  function switchLayer(layer) {
  var layerId = layer.target.id;
  map.setStyle('mapbox://styles/mapbox/' + layerId);
  }
  
  for (var i = 0; i < inputs.length; i++) {
  inputs[i].onclick = switchLayer;
  }
}

function MapModal() {
  $('#modalZaMape').modal();
}
  
function MapResize() {
  map.resize(); // We will use the map.resize() function, to resize the MapBox map  once the modal has finished loading.
}
  
  // Given that your modal has the id #modal
  // and your map is under the variable map. The ‘shown.bs.modal’ event handler is an in-built event handler for Bootstrap Modals.
$('#modalZaMape').on('shown.bs.modal', function () {
  map.resize();
});





