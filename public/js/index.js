let user = JSON.parse(sessionStorage.getItem('loggedUser'));

if (user) {
    $('#btnLogin').addClass('d-none');
    $('#btnLogout').addClass('d-inline-block');
    $('#loggedUser').text(user[0].ime);
    $('#loginModal').modal('hide');
    $( "#search" ).prop( "disabled", false );
}

document.getElementById('loginBtn').addEventListener('click', login);

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
            });
}

