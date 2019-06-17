let display = '';
fetch('/cities')
  .then(res => res.json())
  .then(res => {
      res.forEach(element => {
        display += `<li class="list-group-item list-group-item-primary mb-1">
                <a href="city.html?grad-id=${element.id}">
                  <div class="row align-items-center text-center">
                      <div class="col-lg-2 col-md-3 col-sm-4">
                          <img class="d-block mx-auto" src="${element.slika}" height="100px" alt="${element.ime}">
                      </div>
                      <div class="col-lg-9 col-md-8 ml-3 col-sm-7">
                          <h1 class="text-center">${element.ime}</h1>
                          <p id="descriptionCity" class="text-left">${element.opis}</p>
                      </div>
                  </div>   
                </a>     
              </li>`
              document.getElementById('cityList').innerHTML = display;
      });
  });

  

  

