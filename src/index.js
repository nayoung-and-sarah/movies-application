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

let renderHTML = '';
getMovies().then((movies) => {
    console.log('Here are all the movies:');
    // $('#test-paragraph').empty();

    movies.forEach(({title, rating, id}) => {

        renderHTML = `<div class="card"><div class="card-body">`;
        renderHTML += `<h5 class="card-title">${id} - ${title}</h5>`;
        renderHTML += `<p class="card-text">Rating: ${rating}</p>`;
        renderHTML += `</div></div>`;

        // $('#test-paragraph').append(`id#${id} - ${title} - rating: ${rating}`);
        $('#test-paragraph').append(renderHTML);

    });
    postMovie();
        // .then( ({title, rating, id}) => {
        //     renderHTML = `<div class="card"><div class="card-body">`;
        //     renderHTML += `<h5 class="card-title">${id} - ${title}</h5>`;
        //     renderHTML += `<p class="card-text">Rating: ${rating}</p>`;
        //     renderHTML += `</div></div>`;
        //
        //     $('#input-movie').append(renderHTML);
        // });
    // .then( (movies) => {
    //     movies.forEach(({title, rating, id}) => {
    //
    //         let renderHTML = `<div class="card"><div class="card-body">`;
    //         renderHTML += `<h5 class="card-title">${id} - ${title}</h5>`;
    //         renderHTML += `<p class="card-text">Rating: ${rating}</p>`;
    //         renderHTML += `</div></div>`;
    //
    //         $('#input-movie').append(renderHTML);
    //
    //     });
    // });


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


    // $('#submit').click(postMovie);



});