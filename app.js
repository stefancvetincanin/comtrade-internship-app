const express = require('express')
const path = require('path')
const app = express()
const port = 3000
mysql = require('mysql')
const cities = require('./baza/cities.json')

app.use(express.urlencoded({extended: true}))
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
  connectionLimit: 10,
  debug: false
}

const baza = require('./sql-funkcije')
baza.createPool(dbData)

const router = require('./router')(express, baza)
app.use(router)

// cities.forEach(element => {
//   element.things_to_do.forEach(znamen => {
//     console.log(znamen)
//   })
// });

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
