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
let id = getParameter("grad-id");
// ovaj fectch prikazuje sliku grada
fetch(`/city/${id}`)
  .then(res => res.json())
  .then(
    res =>
      (document.getElementById("city-img").innerHTML = `<img src="${
        res[0].slika
      }" class="ing-fluid" alt="${res[0].ime}">`)
  );
// prikaz imena grada i opisa, sve se odnosi na jedan grad
fetch(`/city/${id}`)
  .then(res => res.json())
  .then(
    res =>
      (document.getElementById(
        "city-description"
      ).innerHTML = `<h1 class="h-25">${res[0].ime}</h1><p class="h-75 pr-3">${
        res[0].opis
      }</p>`)
  );
// prikaz hotela u tom gradu

let display = "";
fetch(`/hotels/${id}`)
  .then(res => res.json())
  .then(res => {
    res.forEach(element => {
      display += `<li class="list-group-item list-group-item-primary mb-1">
        <a href="accommodation.html?hotel-id=${element.id}">
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
let displayAttr = "";
fetch(`/attractions/${id}`)
  .then(res => res.json())
  .then(res => {
    res.forEach(element => {
      displayAttr += `<li class="list-group-item list-group-item-primary mb-1">
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
  });
