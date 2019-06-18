$(".tab-item").click(function() {
  $(".collapse").collapse("hide");
});

$(".carousel").carousel({
  interval: 10000
});

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
let idGrada = getParameter("grad-id");
let idHotel = getParameter("hotel-id");

// prikaz imena grada
fetch(`/city/${idGrada}`)
  .then(res => res.json())
  .then(res => document.getElementById("city-name").innerHTML = `${res[0].ime}`);

// prikaz imena hotela i opisa
fetch(`/hotel/${idHotel}`)
.then(res => res.json())
.then(
  res => {
    document.getElementById("hotel-description").innerHTML = 
    `<h1 class="h-25">${res[0].ime}</h1>
    <div id="starsAccomod" class="align-items-center">*****</div>
    <p class="h-75 pr-3">${res[0].opis}</p>
    <button class="btn btn-primary d-inline-block mb-3" type="button" data-toggle="modal" data-target="#addFeed">Dodaj feed...</button>`
  }
);