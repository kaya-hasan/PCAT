const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// connect DB
mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db');

// create Schema
const PhotoSchema = new Schema({
  title: String,
  description: String,
});

const Photo = mongoose.model('Photo', PhotoSchema);

// cerate a photo
/* Photo.create({
  title: 'Photo Title 2',
  description: 'Photo Description 2 lorem ipsum',
}); */

// read a photo
/*Photo.find()
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  }); */

// update a photo
const photoId = '646d1c1d38394bd8a340a8bb';
/*
Photo.findByIdAndUpdate(id, {
  title: 'Photo Title 1 updated',
  description: 'Photo description 1 lorem ipsum updated',
})
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  }); */

// delete a photo
Photo.findByIdAndDelete(photoId)
  .then((data) => {
    console.log('Photo is removed: ', data);
  })
  .catch((err) => {
    console.log(err);
  });
