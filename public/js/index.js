let display = '';
fetch('/cities')
  .then(res => res.json())
  .then(res => {
      res.forEach(element => {
        display += `<li class="list-group-item list-group-item-primary mb-1">
                <a href="city.html?grad-id=${element.id}">
                  <div class="row align-items-center text-center">
                  <div class="col-lg-12">
                          <img class="d-block mx-auto" src="${element.slika}" height="100px" alt="${element.ime}">
                      </div>
                      <div class="col-lg-12">
                          <h1 class="text-center">${element.ime}</h1>
                          <p id="descriptionCity" class="text-left">${element.opis}</p>
                      </div>
                  </div>   
                </a>     
              </li>`
              document.getElementById('cityList').innerHTML = display;
      });
  });

  
let user = JSON.parse(sessionStorage.getItem('loggedUser'));

if (user) {
    $('#btnLogin').addClass('d-none');
    $('#btnLogout').addClass('d-inline-block');
    $('#loggedUser').text(user[0].ime);
    $('#loginModal').modal('hide');
    $( "#search" ).prop( "disabled", false );
    getCities();
}

document.getElementById('loginBtn').addEventListener('click', login);
document.getElementById('search').addEventListener('keyup', filterCities);

function login() {
    const username = document.getElementById('user').value;
    const password = document.getElementById('pass').value;
    
    fetch(`/login/${username}/${password}`)
            .then(res => res.json())
            .then(res => {
                sessionStorage.setItem('loggedUser', JSON.stringify(res));
                $('#btnLogin').addClass('d-none');
                $('#btnLogout').addClass('d-inline-block');
                $('#loggedUser').text(res[0].ime);
                $( "#search" ).prop( "disabled", false );
                getCities();
            });
}

function postLogin () {
    let loginBody = {
        username: "superadmin",
        password: "password"
    }
    let loginOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginBody)
    }
    fetch('/login', loginOptions)
        .then(res => res.json())
        .then(res => console.log(res))
}

let cityArr;

function getCities() {
    fetch('/cities')
        .then(res => res.json())
        .then(data => {
            cityArr = data;
            $('#cityList').html(data.map(cityTemplate).join(''));
        });
}

const cityTemplate = element => `
<li class="list-group-item list-group-item-primary mb-1">
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
</li>`;
 
function filterCities(e) {
    $('#cityList').html(cityArr
            .filter(element => element.ime.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1)
            .map(cityTemplate)
            .join(''));
}
