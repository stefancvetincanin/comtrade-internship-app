module.exports = function(express, baza) {
  const router = express.Router()

  // json web token - jwt
  // login funkcija
  router.get('/login/*/*', function (req, res) {
    // console.log(req.params)
    baza.execQuery(`SELECT id, username, ime, prezime, admin, slika FROM korisnici WHERE username = '${req.params['0']}' AND password = '${req.params['1']}'`, function(results) {
      // console.log('Korisnik je:')
      // console.log(results)
      res.send(results)
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
    baza.execQuery(`SELECT * FROM grad WHERE id = '${req.params[0]}'`, function(results) {
      // console.log(results)
      res.send(results)
    })
  })

  // nabavi spisak hotela u nekom gradu, gde je req.params id grada u kome se nalaze
  router.get('/hotels/*', function (req, res) {
    // console.log(req.params)
    baza.execQuery(`SELECT * FROM hotel INNER JOIN slike_hotela ON hotel.id = slike_hotela.hotel_id WHERE grad_id='${req.params['0']}'`, function(results) {
      // console.log(results)
      res.send(results)
    })
  })
  
  // nabavi spisak znamenitosti u nekom gradu, gde je req.params id grada u kome se nalaze
  router.get('/attractions/*', function (req, res) {
    // console.log(req.params)
    baza.execQuery(`SELECT * FROM znamenitosti WHERE grad_id='${req.params['0']}'`, function(results) {
      // console.log(results)
      res.send(results)
    })
  })

  // nabavi sav feedback za neki grad, gde je req.params id relevantnog grada
  router.get('/feedback-grad/*', function (req, res) {
    // console.log(req.params)
    baza.execQuery(`SELECT korisnici.username, korisnici.ime, korisnici.prezime, korisnici.slika, feedback_grad.rating, feedback_grad.naziv, feedback_grad.opis, feedback_grad.datum FROM feedback_grad INNER JOIN korisnici on feedback_grad.korisnici_id = korisnici.id WHERE feedback_grad.grad_id = '${req.params['0']}'`, function(results) {
      // console.log(results)
      res.send(results)
    })
  })

  // nabavi sve komentare vezane za odredjeni feedback, gde je req.params id relevantnog feedbacka
  router.get('/komentar-grad/*', function (req, res) {
    // console.log(req.params)
    baza.execQuery(`SELECT korisnici.username, korisnici.ime, korisnici.prezime, korisnici.slika, komentari_grad.text, komentari_grad.datum
    FROM komentari_grad INNER JOIN korisnici on korisnici.id = komentari_grad.korisnici_id 
    WHERE komentari_grad.feedback_grad_id = '${req.params['0']}'`, function(results) {
      // console.log(results)
      res.send(results)
    })
  })

  return router
}