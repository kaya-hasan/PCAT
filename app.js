const express = require('express');
const mongoose = require('mongoose');

const ejs = require('ejs');
const path = require('path');
const Photo = require('./models/Photo');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db');

// Template Engine
app.set('view engine', 'ejs');

/* const myLogger = (req, res, next) => {
  console.log('Mıddleware log 1');
  next();
};

const myLogger2 = (req, res, next) => {
  console.log('Mıddleware log 2');
  next();
}; */

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
/* app.use(myLogger);
app.use(myLogger2); */

// ROUTES
app.get('/', async (req, res) => {
  const photos = await Photo.find({});
  res.render('index', {
    photos,
  });
});

const photoId = '646e0013920c8537cff337dc';
Photo.findByIdAndUpdate(photoId, {
  title: 'Photo Title 3',
  description: 'Photo description 3 lorem ipsum ',
})
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/photos', async (req, res) => {
  await Photo.create(req.body);
  res.redirect('/');
});

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda baslatildi`);
});
