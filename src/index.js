/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const $ = require('jquery');

const bootStrap = require('bootstrap');

const {getMovies} = require('./api.js');


getMovies().then((movies) => {
  console.log ('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    $('#test-paragraph').html(`id#${id} - ${title} - rating: ${rating}`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});

$(document).ready( () => {
  // $('body').html("Should be on page.");
  $('#test-paragraph').html(`<div class="spinner-border" role="status">
  <span class="sr-only">Loading...</span>
</div>`);

getMovies();


});