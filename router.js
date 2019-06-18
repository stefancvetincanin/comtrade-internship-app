module.exports = function(express, baza) {
  const router = express.Router()

  // json web token - jwt
  // login funkcija
  router.get('/login/*/*', function (req, res) {
    // console.log(req.params)
    baza.execQuery(`SELECT id, username, ime, prezime, admin, slika FROM korisnici WHERE username = ${mysql.escape(req.params['0'])} AND password = ${mysql.escape(req.params['1'])}`, function(results) {
      // console.log('Korisnik je:')
      // console.log(results)
      res.send(results)
    })
  })

  // Work in Progress - login funkcija, pravilan metod
  router.post('/login', function (req, res) {
    baza.execQuery(`SELECT id, username, ime, prezime, admin, slika FROM korisnici WHERE username = ${mysql.escape(req.body.username)} AND password = ${mysql.escape(req.body.password)}`, function (results) {
      if(results.length > 0) {
        res.send(results)
        const tokenRnd = Math.floor(Math.random() * (100000000 - 10000000)) + 10000000
        const token = String(tokenRnd) + results[0].username
        baza.execQuery(`INSERT INTO login_tabela(korisnici_id, web_token) VALUES (${mysql.escape(results[0].id)}, ${mysql.escape(token)})`, function (results) {

        })
      }
      else {
        res.send({'msg': 'User not found'})
      }
    })
  })

  // nabavi spisak svih gradova
  router.get('/cities', function (req, res) {
    baza.execQuery('SELECT * FROM grad', function(results) {
      // console.log(results)
      res.send(results)
    })
  })

  // nabavi grad sa trazenim id-em
  router.get('/city/*', function (req, res) {
    baza.execQuery(`SELECT * FROM grad WHERE id = ${mysql.escape(req.params[0])}`, function(results) {
      // console.log(results)
      res.send(results)
    })
  })

  // nabavi spisak hotela u nekom gradu, gde je req.params id grada u kome se nalaze
  router.get('/hotels/*', function (req, res) {
    // console.log(req.params)
    baza.execQuery(`SELECT * FROM hotel INNER JOIN slike_hotela ON hotel.id = slike_hotela.hotel_id WHERE grad_id=${mysql.escape(req.params['0'])}`, function(results) {
      // console.log(results)
      res.send(results)
    })
  })

  // nabavi hotel gde je req.params id hotela
  router.get('/hotel/*', function (req, res) {
    // console.log(req.params)
    baza.execQuery(`SELECT * FROM hotel INNER JOIN slike_hotela ON hotel.id = slike_hotela.hotel_id WHERE hotel.id=${mysql.escape(req.params['0'])}`, function(results) {
      // console.log(results)
      res.send(results)
    })
  })
  
  // nabavi spisak znamenitosti u nekom gradu, gde je req.params id grada u kome se nalaze
  router.get('/attractions/*', function (req, res) {
    // console.log(req.params)
    baza.execQuery(`SELECT * FROM znamenitosti WHERE grad_id=${mysql.escape(req.params['0'])}`, function(results) {
      // console.log(results)
      res.send(results)
    })
  })

  // nabavi sav feedback za neki grad, gde je req.params id relevantnog grada
  router.get('/feedback-grad/*', function (req, res) {
    // console.log(req.params)
    baza.execQuery(`SELECT korisnici.username, korisnici.ime, korisnici.prezime, korisnici.slika, feedback_grad.rating, feedback_grad.naziv, feedback_grad.opis, feedback_grad.datum FROM feedback_grad INNER JOIN korisnici on feedback_grad.korisnici_id = korisnici.id WHERE feedback_grad.grad_id = ${mysql.escape(req.params['0'])}`, function(results) {
      // console.log(results)
      res.send(results)
    })
  })

  // nabavi sve komentare vezane za odredjeni feedback, gde je req.params id relevantnog feedbacka
  router.get('/komentar-grad/*', function (req, res) {
    // console.log(req.params)
    baza.execQuery(`SELECT korisnici.username, korisnici.ime, korisnici.prezime, korisnici.slika, komentari_grad.text, komentari_grad.datum
    FROM komentari_grad INNER JOIN korisnici on korisnici.id = komentari_grad.korisnici_id 
    WHERE komentari_grad.feedback_grad_id = ${mysql.escape(req.params['0'])}`, function(results) {
      // console.log(results)
      res.send(results)
    })
  })

  return router
}