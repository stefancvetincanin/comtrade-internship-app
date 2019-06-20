$('.tab-item').click(function () {
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
      document.getElementById('hotel-image-2').alt = `${res[0].ime}`;
      document.getElementById('hotel-image-3').alt = `${res[0].ime}`;
      document.getElementById('hotel-image-4').alt = `${res[0].ime}`;
      document.getElementById('hotel-image-5').alt = `${res[0].ime}`;
      document.getElementById('hotel-image-6').alt = `${res[0].ime}`;

      fetch(`/hotel-images/${idHotel}`)
        .then(res => res.json())
        .then(
          res => {
            console.log(res)
            document.getElementById('hotel-image-2').src = `${res[0].url_slike}`;
            document.getElementById('hotel-image-3').src = `${res[1].url_slike}`;
            document.getElementById('hotel-image-4').src = `${res[2].url_slike}`;
            document.getElementById('hotel-image-5').src = `${res[3].url_slike}`;
            document.getElementById('hotel-image-6').src = `${res[4].url_slike}`;
          })
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
                <div id="starsAccomod" class="float-right align-items-center">*****</div>
              </div>
              <p id="descriptionAccomod" class="text-left pl-4">${element.opis}</p>
            </div> 
          </div>
        </a>
      </li>`;
      document.getElementById("topAccomodations").innerHTML = display;
    });
  });

let feedbackArray = []
// dobavljanje komentara
fetch(`/feedback-hotel/${idHotel}`)
  .then(res => res.json())
  .then(res => {
    console.log(res)
    feedbackArray = res
    let feedbackDisplay = ''
    feedbackArray.forEach((feedback, index) => {
      feedbackDisplay += `
      <div class="carousel-item ${index === 0 ? "active" : null}">
        <div class="card col-lg-12 bg-light mb-4 px-4 py-3">
          <div class="row card-body">
            <div class="col-4">
              <img src="${feedback.slika}" class="rounded-circle" height="75px" alt=""/>
            </div>
            <div class="col-8">
              <h4>${feedback.ime} ${feedback.prezime}</h4>
              <div class="">
                <span class=""><i class="text-warning fa fa-star"></i></span>
                <span class=""><i class="text-warning fa fa-star"></i></span>
                <span class=""><i class="text-warning fa fa-star"></i></span>
                <span class=""><i class="text-warning fa fa-star"></i></span>
                <span class=""><i class="text-warning fa fa-star"></i></span>
              </div>
            </div>
          </div>
          <div class="row">
            <p>
              ${feedback.opis}
            </p>
            <small>${feedback.datum.substring(0, 10)} ${feedback.datum.substring(11, 19)}</small>
          </div>
          <div class="row justify-content-center">
            <div class="w-50">
              <button class="prikazi-modal btn btn-warning btn-block text-white" data-feedback-id=${feedback.id} type="button" data-toggle="modal" data-target="#modalFeedback">
                More
              </button>
            </div>
          </div>
        </div>
      </div>
      `
    })
    // console.log(feedbackDisplay)
    document.getElementById('feedback-display').innerHTML = feedbackDisplay
    $('.prikazi-modal').on('click', function () {
      prikaziFeedback($(this).attr('data-feedback-id'))
    })
  })

function prikaziFeedback(id) {
  let filtriranFeedback = feedbackArray.filter(element => element.id === Number(id))
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
              <div class="">
                <span class=""
                  ><i class="text-warning fa fa-star"></i
                ></span>
                <span class=""
                  ><i class="text-warning fa fa-star"></i
                ></span>
                <span class=""
                  ><i class="text-warning fa fa-star"></i
                ></span>
                <span class=""
                  ><i class="text-warning fa fa-star"></i
                ></span>
                <span class=""
                  ><i class="text-warning fa fa-star"></i
                ></span>
              </div>
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
          <div class="clearfix mb-4">
            <button id="btnFooterToggle" type="button" class="btn btn-primary float-right">
              Toggle comment
            </button>
          </div>
          <div class="commentGroup">
            <form class="w-100 p-0" id="forma-comment">
              <div class="form-group justify-content-center">
                <label for="comment">Message</label>
                <textarea class="form-control" id="comment" rows="3"></textarea>
              </div>
              <div class="clearfix">
                <button type="button" class="btn btn-primary float-right">
                  Send comment
                </button>
              </div>
            </form>
            <ul class="list-group mb-1" id="commentList">
              <li class="list-group-item list-group-item-warning clearfix">
                <div class="div">
                  <div
                    class="d-inline-block w-25 bg-primary text-white text-center mb-2 float-left"
                  >
                    Username
                  </div>
                  <div class="float-right">
                    Date
                  </div>
                </div>
                <div class="d-inline-block w-100 text-dark">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Recusandae nesciunt harum, omnis accusamus neque quia
                  obcaecati et. Vitae, tempora reprehenderit?
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    `
  $('#btnFooterToggle').on('click', function() {
    $('#forma-comment').slideToggle()
  })
}
