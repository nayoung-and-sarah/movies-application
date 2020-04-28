/**
 * es6 modules and imports
 */
import sayHello from './hello';

sayHello('World');

/**
 * require style imports
 */
const $ = require('jquery');

const {getMovies} = require('./api.js');

getMovies().then((movies) => {
    console.log('Here are all the movies:');
    movies.forEach(({title, rating, id}) => {

        let renderHTML = `<div class="card">
          <div class="card-body"> 
          <h5 class="card-title">${id} - ${title}</h5>
     <p class="card-text">Rating: ${rating}</p>
      </div></div>`;

        // $('#test-paragraph').append(`id#${id} - ${title} - rating: ${rating}`);
        $('#test-paragraph').append(renderHTML);

    });
}).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
});

$(document).ready(() => {

        $('#spinner').html(`<div class="spinner-border" role="status">
  <span class="sr-only">Loading...</span></div>`);

    setTimeout(function(){
       $('#spinner').hide()
    },1200);

    getMovies();


});