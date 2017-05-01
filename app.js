'use strict';

var open = require('open')
var express = require('express')
var cors = require('cors')
var app = express()

app.use(express.static('public'))
app.use(cors())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*')
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})
 
app.options('*', cors()) // enable pre-flight request for DELETE request 
app.delete('/?code=:code', cors(), function (req, res, next) {
  res.header("Access-Control-Allow-Origin", '*')
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.send(req.params.code)
})

app.get('/?code=:code', cors(), function (req, res, next) {
  res.header("Access-Control-Allow-Origin", '*')
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.send(req.params.code)
})

app.listen(1337, function () {
  console.log('running at http://127.0.0.1:1337/')
  open('http://127.0.0.1:1337/', function (err) {if (err) throw err})
})