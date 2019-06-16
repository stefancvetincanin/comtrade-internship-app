const express = require('express')
const path = require('path')
const app = express()
const port = 3000
mysql = require('mysql')
const cities = require('./baza/cities.json')
const hotels = require('./baza/hotels.json')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, () => {
  console.log('Server radi na portu: ' + port)
})

const dbData = {
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'bta_baza',
  connectionLimit: 1000,
  debug: false
}

const baza = require('./sql-funkcije')
baza.createPool(dbData)

const router = require('./router')(express, baza)
app.use(router)

/***
  ===============================
    Funkcije za popunjavanje baze
  ===============================
***/

// let brojac = 1
// hotels.forEach(grad => {
//   // console.log(grad.id)
//   grad[Object.keys(grad)[1]].forEach(hotel => {
//     // console.log(hotel.img);
//     // console.log(brojac)
//     baza.execQuery(`INSERT INTO slike_hotela(id, hotel_id, url_slike) VALUES (${mysql.escape(brojac)}, ${mysql.escape(brojac)}, ${mysql.escape(hotel.img)})`, function (results) {
//     })
//     brojac++
//   })
// })

// let brojac = 1
// hotels.forEach(grad => {
//   grad[Object.keys(grad)[1]].forEach(hotel => {
//     baza.execQuery(`INSERT INTO hotel(id, grad_id, ime, address, opis, latitude, longitude, url_booking) VALUES (${mysql.escape(brojac)},${mysql.escape(grad.id)},${mysql.escape(hotel.hotel_name)},${mysql.escape(hotel.address)},${mysql.escape(hotel.description)},${mysql.escape(hotel.lat)},${mysql.escape(hotel.lng)},${mysql.escape(hotel.url)})`, function (results) {
//     })
//     brojac++
//   })
// })

// console.log(hotels[Object.keys(hotels)[0]])

// cities.forEach(element => {
//   element.things_to_do.forEach(znamen => {
//     console.log(element.id)
//     console.log(znamen.name)
//   })
// });

// cities.forEach(element => {
//   element.things_to_do.forEach(znamen => {
//     baza.execQuery(`INSERT INTO znamenitosti(grad_id, naziv, slika, opis, latitude, longitude) VALUES (${mysql.escape(element.id)}, ${mysql.escape(znamen.name)}, ${mysql.escape(znamen.img)}, ${mysql.escape(znamen.description)}, ${mysql.escape(znamen.lat)}, ${mysql.escape(znamen.lng)})`, function(results) {
//       console.log(results)
//     })
//   })
// })

// cities.forEach(element => {
//   baza.execQuery(`INSERT INTO grad(ime, opis, slika, latitude, longitude) VALUES (${mysql.escape(element.city_name)}, ${mysql.escape(element.description)}, ${mysql.escape(element.img)}, ${mysql.escape(element.lat)}, ${mysql.escape(element.lng)})`, function(results) {
//     console.log(results)
//   })
  // baza.execQuery("INSERT INTO grad(ime, opis, slika, latitude, longitude) VALUES ("+mysql.escape(element.city_name)+", "+mysql.escape(element.description)+", "+mysql.escape(element.img)+", "+mysql.escape(element.lat)+", "+mysql.escape(element.lng)+")", function(results) {
  //   console.log(results)
  // })
//   baza.execQueryParams(`INSERT INTO grad(ime, opis, slika, latitude, longitude) VALUES (?,?,?,?,?)` , [element.city_name, element.description, element.img, element.lat, element.lng], function(results) {
//     console.log(results)
//   })
// })
