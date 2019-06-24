let feedbackArray = [];
let id = getParameter("grad-id");

function getParameter(paramName) {
  let searchString = window.location.search.substring(1),
    i,
    val,
    params = searchString.split("&");

  for (i = 0; i < params.length; i++) {
    val = params[i].split("=");
    if (val[0] == paramName) {
      return val[1];
    }
  }
  return null;
}

//prikaz fotografije grada i pozadina body-a
fetch(`/city/${id}`)
  .then(res => res.json())
  .then(res => {
    document.getElementById("city-img").innerHTML = `<img src="${
      res[0].slika
    }" class="ing-fluid" alt="${res[0].ime}">`;

    document.getElementById("body").style.backgroundImage = `url(${
      res[0].slika
    })`;
  });

// prikaz imena grada i opisa, sve se odnosi na jedan grad
fetch(`/city/${id}`)
  .then(res => res.json())
  .then(res => {
    document.getElementById(
      "city-description"
    ).innerHTML = `<h1 class="cityHeadline" >${
      res[0].ime
    }</h1><p class="cityText pr-3"  id="content">${res[0].opis}</p>`;
    minimizedElements();
  });

// f-ja za show more-show less hoteli i atrakcije
let count = 0;
function moreLess(id, classname) {
  document.getElementById(id).addEventListener("click", function() {
    count++;
    if (count % 2 !== 0) {
      document.getElementById(id).value = "Show less..";
      Array.from(document.getElementsByClassName(classname)).forEach(
        element => {
          element.setAttribute("style", "display:block");
        }
      );
    } else {
      document.getElementById(id).value = "Show more..";
      Array.from(document.getElementsByClassName(classname)).forEach(
        element => {
          element.setAttribute("style", "display:none");
        }
      );
    }
  });
}

// prikaz hotela u tom gradu

let display = "";
fetch(`/hotels/${id}`)
  .then(res => res.json())
  .then(res => {
    res.forEach((element, i) => {
      let moreClass = i > 2 && "moreClass";
      let rating = Math.round(element["AVG(feedback_hotel.rating)"]);
      let stringZvezdice = "";
      while (rating > 0) {
        stringZvezdice += `<i class="text-warning fa fa-star"></i>`;
        rating--;
      }
      if (!stringZvezdice) stringZvezdice = "Nema ocena";
      display += `<li class="list-group-item list-group-item-primary mb-1 ${moreClass}">
        <a href="accommodation.html?hotel-id=${element.id}&grad-id=${id}">
          <div class="row align-items-center text-center">
            <div class="col-lg-2 col-md-3 col-sm-4 mb-3">
              <img class="d-block mx-auto" src="${
                element.url_slike
              }" height="100px" alt="${element.ime}">
            </div>
            <div class="col-lg-9 col-md-8 ml-3 col-sm-7">
              <div class="clearfix pl-4">
                <h1 id="nameAccomod" class="float-left">${element.ime}</h1>
                <div id="starsAccomod" class="float-right align-items-center">${stringZvezdice}</div>
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
    moreLess("moreBtn", "moreClass");
  });

//prikaz atrakcija u gradu
let displayAttr = "";
fetch(`/attractions/${id}`)
  .then(res => res.json())
  .then(res => {
    res.forEach((element, i) => {
      let moreClass1 = i > 2 && "moreClass1";
      displayAttr += `<li class="list-group-item list-group-item-primary mb-1 ${moreClass1}">
          <div class="row align-items-center text-center">
            <div class="col-lg-2 col-md-3 col-sm-4 mb-3">
              <img class="d-block mx-auto" src="${
                element.slika
              }" height="100px" alt="${element.naziv}">
            </div>
            <div class="col-lg-9 col-md-8 ml-3 col-sm-7">
              <div class="clearfix pl-4">
                <h1 id="nameAccomod" class="float-left">${element.naziv}</h1>
              </div>
              <p id="descriptionAccomod" class="text-left pl-4">${
                element.opis
              }</p>
            </div> 
          </div>
        </a>
      </li>`;
      document.getElementById("cityAttractions").innerHTML = displayAttr;
    });
    moreLess("moreBtn1", "moreClass1");
  });

$(document).ready(function() {
  $(".tab-item").click(function() {
    $(".collapse").collapse("hide");
  });

  $(".carousel").carousel({
    interval: 3000
  });

  $("body").on("load", $(".commentGroup").hide());

  $("#btnFooterToggle").click(function() {
    $(".commentGroup").toggle();
  });

  $("#addComment").click(function() {
    $(".commentGroup").toggle();
  });
});

//setting the date
let currentDate = new Date();
document.getElementById("date").textContent = stringDate(currentDate);

function stringDate(currDate) {
  let mm = currDate.getMonth() + 1;
  mm = mm < 10 ? `0${mm}` : mm;
  let dd = currDate.getDate();
  dd = dd < 10 ? `0${dd}` : dd;
  return `${dd}/${mm}/${currDate.getFullYear()}`;
}

//less and more text
function minimizedElements() {
  let minimized_elements = $("#content");

  minimized_elements.each(function() {
    let t = $(this).text();
    if (t.length < 200) return;

    $(this).html(
      t.slice(0, 200) +
        '<span>... </span><a href="#" class="more">More</a>' +
        '<span style="display:none;">' +
        t.slice(300, t.length) +
        ' <a href="#" class="less">Less</a></span>'
    );
  });

  $("a.more", minimized_elements).click(function(event) {
    event.preventDefault();
    $(this)
      .hide()
      .prev()
      .hide();
    $(this)
      .next()
      .show();
  });

  $("a.less", minimized_elements).click(function(event) {
    event.preventDefault();
    $(this)
      .parent()
      .hide()
      .prev()
      .show()
      .prev()
      .show();
  });
}

// weather

// Event listeners
document.addEventListener("DOMContentLoaded", getData);

//const apiKey = '4557aae956939ce49a2fe6d480b1d84d';

const desc = document.getElementById("description");
const string = document.getElementById("stringWeather");
const humidity = document.getElementById("humidity");
const pressure = document.getElementById("pressure");
const wind = document.getElementById("wind");

const weatherTemplate = (element, index) => {
  return `<div class="carousel-item ${
    index === 0 ? "active" : null
  } bg-info w-100">
  <div class="row px-2 justify-content-center align-items-center mb-1 pt-5 text-white">
    <div class="col-3"><img src="https://www.metaweather.com/static/img/weather/${
      element.weather_state_abbr
    }.svg" width="40"></div>
    <div class="col-3 text-center">${element.weather_state_name}</div>
    <div class="col-3">${element.min_temp.toFixed(
      0
    )}&#176;/${element.max_temp.toFixed(0)}&#176;</div> 
  </div>
  <div class="row justify-content-center align-middle mt-3"><p>${
    element.applicable_date
  }<p></div>
</div>`;
};

function getData() {
  fetch(`/city/${id}`)
    .then(res => res.json())
    .then(res => {
      fetch(
        `https://proxy-requests.herokuapp.com/https://www.metaweather.com/api/location/${
          res[0].woeid
        }/`
      )
        .then(res => res.json())
        .then(data => {
          print(data);
          let fiveDays = [...data.consolidated_weather];
          fiveDays.shift();
          $("#carouselExampleControls .carousel-inner").html(
            fiveDays.map(weatherTemplate, 0).join("")
          );
        });
    });
}

function print(data) {
  desc.innerHTML = data.consolidated_weather[0].weather_state_name;
  string.innerHTML = `${data.consolidated_weather[0].the_temp.toFixed(
    1
  )}&nbsp;`;
  humidity.textContent = `${data.consolidated_weather[0].humidity} %`;
  pressure.textContent = `${data.consolidated_weather[0].air_pressure.toFixed(
    0
  )}`;
  wind.textContent = `${data.consolidated_weather[0].wind_speed.toFixed(
    0
  )} m/s`;
}

/////////////////////////////////////////////////////////////

// funkcija nabavlja spisak komentara iz baze i prikazuje ih u modalu
function feedbackGrad(id) {
  fetch(`/feedback-grad/${id}`)
    .then(res => res.json())
    .then(res => {
      feedbackArray = res;
      let displayComments = "";
      res.forEach(comment => {
        displayComments += `
      <div class="card col-lg-4 col-md-6 col-sm-12 bg-light mb-4 px-4 py-3">
      <div class="row card-body">
        <div class="col-4">
          <img src="${
            comment.slika
          }" class="rounded-circle" height="75px" alt="">
        </div>
        <div class="col-8">
          <h4>${comment.ime}</h4>
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
        <p>${comment.opis}</p>
      </div>
      <div class="row justify-content-center">
        <div class="w-50">
          <button class="btn btn-warning btn-block text-white prikazi-modal" type="button" data-toggle="modal" data-feedback-id=${
            comment.id
          } data-target="#modalFeedback">More</button>
        </div>
      </div>
    </div>
      `;
      });
      document.getElementById(
        "commentListFeedbacka"
      ).innerHTML = displayComments;
      $(".prikazi-modal").on("click", function() {
        prikaziFeedbackModal($(this).attr("data-feedback-id"));
      });
    });
}

feedbackGrad(id);

// funkcija ispisuje feedback u modalu
function prikaziFeedbackModal(id) {
  let filtriranFeedback = feedbackArray.filter(
    element => element.id === Number(id)
  );
  console.log(id);

  document.getElementById("modalFeedback").innerHTML = `
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
          <div class="row card-body">
            <div class="col-4">
              <img src="${
                filtriranFeedback[0].slika
              }" class="rounded-circle" height="100px" alt="user">
            </div>
            <div class="col-8">
              <h4>${filtriranFeedback[0].ime}</h4>
              <div class="">
                <span class=""><i class="text-warning fa fa-star"></i></span>
                <span class=""><i class="text-warning fa fa-star"></i></span>
                <span class=""><i class="text-warning fa fa-star"></i></span>
                <span class=""><i class="text-warning fa fa-star"></i></span>
                <span class=""><i class="text-warning fa fa-star"></i></span>
              </div>
            </div>
          </div>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="row">
          <p>${filtriranFeedback[0].opis}</p>
        </div>
        <div class="clearfix mb-4">
          <button id="btnFooterToggle" type="button" class="btn btn-primary float-right">Show-hide comments</button>
        </div>
        
        <div class="commentGroup">
          <ul class="list-group mb-1" id="commentListKomentara">
        
          </ul>
          <form class="w-100 p-0" id="comment-on-feedback" >
            <div class="form-group justify-content-center">
              <label for="comment">Message</label>
              <textarea class="form-control" rows="3" id="comment-text"></textarea>
            </div>

            <div class="clearfix">
              <button type="submit" class="btn btn-primary float-right">Send comment</button>
            </div>
          </form>
        </div>
      </div>
      
    </div>
  </div>
    `;
  komentarFeedbackGrada(id);

  $("#btnFooterToggle").on("click", function() {
    $("#comment-on-feedback").slideToggle();
  });

  $("#comment-on-feedback").on("submit", function(e) {
    e.preventDefault();
    const commentBody = {
      feedbackId: Number(id),
      text: $("#comment-text").val(),
      korisniciId: Math.floor(Math.random() * (5 - 1)) + 1
    };
    const commentOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentBody)
    };
    $("#comment-text").val("");
    fetch("/post-comment-city", commentOptions)
      .then(res => res.json())
      .then(res => {
        if (res.poslato) komentarFeedbackGrada(id);
      });
  });
  komentarFeedbackGrada(id);
}

function komentarFeedbackGrada(id) {
  fetch(`/komentar-grad/${id}`)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      let displayComments = "";
      res.forEach(comment => {
        displayComments += `
      <li class="list-group-item list-group-item-warning clearfix d-flex">
          <div class="mr-3 align-self-center">
            <img class="rounded-circle " src="${comment.slika}" alt="${
          comment.ime
        }" width="90px"/>
          </div>
          <div class="d-block w-100">
            <div>
              <div class="d-inline-block w-25 bg-primary text-white text-center mb-2 float-left">
                ${comment.ime} ${comment.prezime}
              </div>
              <div class="float-right">
                <small>${comment.datum.substring(
                  0,
                  10
                )} ${comment.datum.substring(11, 19)}</small>
              </div>
            </div>
            <div class="d-inline-block w-100 text-dark">
              ${comment.text}
            </div>
          </div>
        </li>`;
      });
      document.getElementById(
        "commentListKomentara"
      ).innerHTML = displayComments;
    });
}

$("#form-city-feedback input[type=radio]").on("change", function() {
  rating = $("input[name=rate]:checked").val();
});

$("#form-city-feedback").on("submit", function(e) {
  e.preventDefault();
  // Slanje feedbacka za grad:
  const feedbackBody = {
    gradId: id,
    korisniciId: Math.floor(Math.random() * (5 - 1)) + 1,
    rating: rating,
    naziv: $("#naziv-feedback-city").val(),
    opis: $("#comment-feedback-city").val()
  };
  const feedbackOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(feedbackBody)
  };
  fetch("/post-feedback-city", feedbackOptions)
    .then(res => res.json())
    .then(res => {
      if (res.poslato) $("#addFeedCity").modal("hide");
      feedbackGrad(id);
    });
});
