module.exports = function(express, baza) {
  const router = express.Router()

  // login funkcija
  router.get('/login/*/*', function (req, res) {
    console.log(req.params)
    baza.execQuery(`SELECT * FROM korisnici WHERE username = '${req.params['0']}' AND password = '${req.params['1']}'`, function(results) {
      console.log('Korisnik je:')
      console.log(results)
      res.send(results)
    })
  })

  // nabavi spisak svih gradova
  router.get('/cities', function (req, res) {
    baza.execQuery('SELECT * FROM grad', function(results) {
      console.log(results)
      res.send(results)
    })
  })

  // nabavi spisak hotela u nekom gradu, gde je req.params id grada u kome se nalaze
  router.get('/hotels/*', function (req, res) {
    console.log(req.params)
    baza.execQuery(`SELECT * FROM hotel INNER JOIN slike_hotela ON hotel.id = slike_hotela.hotel_id WHERE grad_id='${req.params['0']}'`, function(results) {
      console.log(results)
      res.send(results)
    })
  })
  
  // nabavi spisak znamenitosti u nekom gradu, gde je req.params id grada u kome se nalaze
  router.get('/attractions/*', function (req, res) {
    console.log(req.params)
    baza.execQuery(`SELECT * FROM znamenitosti WHERE grad_id='${req.params['0']}'`, function(results) {
      console.log(results)
      res.send(results)
    })
  })

  return router
}