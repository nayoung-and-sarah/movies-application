/**
 * es6 modules and imports
 */
import sayHello from './hello';

sayHello('World');

/**
 * require style imports
 */
const $ = require('jquery');

const {getMovies, postMovie, editMovie,deleteMovie} = require('./api.js');

function updateMovies() {
    getMovies().then((movies) => {
        console.log('Here are all the movies:', movies);
        $('#spinner').hide();
        $('.card-deck').html('');
        movies.forEach(({title, rating, id}) => {
            let renderHTML =
                `<div class="card">
                     <div class="card-body">
                         <h5 id="movie-title" class="card-title">${id} - ${title}</h5>
                         <p id="movie-rating" class="card-text user-edit-rating">Rating: ${rating}</p>
                           <button data-id="${id}" class="edit-btn">Edit Movie</button>
                           <button data-id="${id}" class="delete-btn">Delete Movie</button>
                    </div>
               </div>`;

            $('.card-deck').append(renderHTML);
            // $('#test-paragraph').append(`id#${id} - ${title} - rating: ${rating}`);
        });
        $('.edit-btn').click(userEditMovie)

    }).catch((error) => {
        alert('Oh no! Something went wrong. Check the console for details.');
        console.log(error);
    })
}


// allow users to edit movies
function userEditMovie(e) {

// console.log(e.target.dataset.id);
//     console.log($(e.target).parent());

    let cardBody= $(e.target).parent();

    let specificID = e.target.dataset.id;

        let renderForm = `
    <div class="form-group">
       <label for="exampleFormControlInput1">Movie Title</label>
         <input type="text" class="form-control edit-title " id="exampleFormControlInput1">
    </div>
       <div class="form-group">
         <label for="exampleFormControlSelect1"> Rating</label>
         <select class="form-control edit-rating" id="exampleFormControlSelect1">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
        </select>
       </div>
        <div class="edit-btn-submit">
            <button class="btn submit-edit-btn" data-id="${specificID}">Submit edits</button>
        </div>`;

        cardBody.append(renderForm);

        $('.submit-edit-btn').click(function () {
            //get the data attr value
            console.log(specificID);
                $(this).attr('data-id', specificID);
            let editRating = $('.edit-rating').val();
            let editTitle =$('.edit-title').val();

            console.log(editTitle,editRating, specificID);
            console.log(this);
            editMovie(editTitle,editRating,specificID)
                .then (updateMovies) // run after ajax
        });

}
function deleteFunction(e){

}

$('.delete-btn').click(deleteFunction);


$(document).ready(() => {
    //loading spinner
    $('#spinner').html(`<div class="spinner-border" role="status">
  <span class="sr-only">Loading...</span></div>`);



    updateMovies(); // render the HTML before button is clicked

    //click to post movie
    $('#submit').click(function (e) {
        e.preventDefault();
        let movieTitle = $('.search-term').val();
        let movieRating = $('.movie-rating').val();
        console.log(movieTitle, movieRating);

        postMovie({ // postMovie function
            "title": movieTitle, //adding user input from form
            "rating": movieRating // adding user rating fr  om form
        });

        $('#exampleFormControlInput1').empty();

        updateMovies();
    });










});