const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');
const app = express();
const photoController = require('./controllers/photoControllers');
const pageController = require('./controllers/pageControllers');
mongoose
  .connect(
    'mongodb+srv://h3kaya5:0QFygGepDi2XUiRS@pcatcluster.al2fm42.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('DB CONNECTED !');
  })
  .catch((err) => {
    console.log(err);
  });

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
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

/* app.use(myLogger);
app.use(myLogger2); */

// ROUTES
app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);

app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);

app.get('/photos/edit/:id', pageController.getEditPage);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda baslatildi`);
});
