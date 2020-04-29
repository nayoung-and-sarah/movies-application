/**
 * es6 modules and imports
 */
import sayHello from './hello';

sayHello('World');

/**
 * require style imports
 */
const $ = require('jquery');

const {getMovies, postMovie} = require('./api.js');
getMovies().then((movies) => {
    console.log('Here are all the movies:', movies);

    movies.forEach(({title, rating, id}) => {
        let renderHTML = `<div class="card">
              <div class="card-body"> 
                     <h5 id="movie-title" class="card-title">${id} - ${title}</h5>
                     <p id="movie-rating" class="card-text">Rating: ${rating}</p>
               </div>
            </div>`;

        $('.card-deck').append(renderHTML);
        // $('#test-paragraph').append(`id#${id} - ${title} - rating: ${rating}`);


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



    //click to post movie
    $('#submit').click(function(e){
        e.preventDefault();
        let movieTitle = $('.search-term').val();
        let movieRating = $('.movie-rating').val();
        console.log(movieTitle, movieRating);

        postMovie({ // postMovie function
            "title": movieTitle, //adding user input from form
            "rating": movieRating // adding user rating from form
        });



    });







});