var express = require('express');
var app = express();
app.set('view engine', 'jade');
app.set('views', './views');

app.use(express.static('public'));
app.get('/', function (req, res) {
  res.render('index', {
    stuff : 'and things'
  }
    );
});

app.get('/gallery/new', function(req, res) {
  res.render('gallery_new');
});

app.get('/gallery/:id', function (req, res) {
  res.send('GALLERY STUFF');
});

app.post('/gallery', function (req, res) {
  res.send('POST NEW FIELDS TO GALLERY');
});

app.get('/gallery/:id/edit', function(req, res) {
  res.render('gallery_edit')
});

app.put('/gallery/:id', function (req, res) {
  res.send('SUBMIT GALLERY PAGE CHANGES');
});

app.delete('/gallery/:id', function (req, res) {
  res.send('DELETE GALLERY PAGE');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('_Architekt listening at http://%s:%s', host, port);
});

