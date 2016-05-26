'use strict';

let app = require('./app-data.js');

let API_KEY = require('../../flickrconfig.js')

const getPhotos = (getPhotosSuccess, getPhotosFailure) => {
  $.ajax({
      method: 'GET',
      url: 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=' + API_KEY.API_KEY + '&tags=weird&per_page=1&sort=interestingness-desc&format=json&nojsoncallback=1',
    }).done(getPhotosSuccess)
    .fail(getPhotosFailure);
};

const getPhotosFailure = (data) => {
  console.log('get photos failed');
  console.log(data);
};

const getPhotosSuccess = (data) => {
  console.log('Photo Success');
  console.log(data);
  app.photos = data.photos.photo[0];
  app.flickrURL = 'http://farm' + app.photos.farm + '.static.flickr.com/' + app.photos.server + '/' + app.photos.id + '_' + app.photos.secret + '.jpg';
  console.log(app.flickrURL);
  $('#photoResult').html('<img id="flickrResult" src="' + app.flickrURL + '">');
};

$( document ).ready(function() {
  $('#getPhotoButton').on('click', function(event) {
    event.preventDefault();
    console.log('clicked');
    getPhotos(getPhotosSuccess, getPhotosFailure);
  });
});

console.log('loading???? maybeeeeee');
