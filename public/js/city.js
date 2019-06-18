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
  .then(res =>
      (document.getElementById("city-img").innerHTML = `<img src="${
        res[0].slika
      }" class="ing-fluid" alt="${res[0].ime}">`)
  );
// prikaz imena grada i opisa, sve se odnosi na jedan grad
fetch(`/city/${id}`)
  .then(res => res.json())
  .then(
    res => {
      (document.getElementById(
        "city-description"
      ).innerHTML = `<h1 class="cityHeadline" >${res[0].ime}</h1><p class="cityText pr-3"  id="content">${
        res[0].opis
      }</p>`
      
      )
      minimizedElements();
    }
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

$(document).ready(function () {
  $('.tab-item').click(function () {
    $('.collapse').collapse('hide');
  });
  
  $('.carousel').carousel({
    interval: 2000
  });
    
  $('body').on('load', $(".commentGroup").hide());
  
  $("#btnFooterToggle").click(function(){
    $(".commentGroup").toggle();
  });
  
  $('#addComment').click(function(){
    $(".commentGroup").toggle();
  });
});

//setting the date
let currentDate = new Date();	
document.getElementById('date').textContent = stringDate(currentDate);
  
function stringDate(currDate) {
  let mm = currDate.getMonth()+1;
      mm = (mm < 10 ? `0${mm}` : mm);
  let dd = currDate.getDate();
      dd = (dd < 10 ? `0${dd}` : dd);
  return `${dd}/${mm}/${currDate.getFullYear()}`;
}

//less and more text
function minimizedElements () {
let minimized_elements = $("#content");
console.log(minimized_elements.value);

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
    };
