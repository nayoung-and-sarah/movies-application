/**
 * es6 modules and imports
 */
import sayHello from './hello';

sayHello('World');

/**
 * require style imports
 */
const $ = require('jquery');

const {getMovies, postMovie, editMovie, deleteMovie} = require('./api.js');

function updateMovies() {
    getMovies().then((movies) => {
        console.log('Here are all the movies:', movies);
        $('#spinner').hide();
        $('.card-deck').html('');
        movies.forEach(({title, rating, id}) => {
            let renderHTML =
                `<div class="card">
                     <div class="card-body">
                        <div class="new-movie-title">
                            <h5 id="movie-title" class="card-title"> ${title}</h5>
                         </div>
                         <p id="movie-rating" class="card-text user-edit-rating">Rating: ${rating}</p>
                         <div>
                             <button data-id="${id}" class="btn btn-sm btn-outline-dark edit-btn mr-1">Edit Movie</button>
                             <button data-id="${id}" class="btn btn-sm btn-outline-danger delete-btn">Delete Movie</button>
                         </div>
                    </div>
               </div>`;
            $('.card-deck').append(renderHTML);
        });

        $('.edit-btn').click(userEditMovie);
        $('.delete-btn').click(deleteFunction)
    }).catch((error) => {
        alert('Oh no! Something went wrong. Check the console for details.');
        console.log(error);
    })
}

// allow users to edit movies
function userEditMovie(e) {

// console.log(e.target.dataset.id);
//     console.log($(e.target).parent());

    let cardBody = $(e.target).parent();
    let specificID = e.target.dataset.id;
    console.log(specificID);

    let renderForm = `
        <div class="form-group mt-3">
             <label for="edit-form">Movie Title</label>
             <input type="text" class="form-control edit-form edit-title" id="${specificID}">
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
            <button class="btn btn-outline-dark submit-edit-btn" data-id="${specificID}">Submit edits</button>
        </div>`;

    cardBody.append(renderForm);

    $('.submit-edit-btn').click(function () {
        //get the data attr value

        $(this).attr('data-id', specificID);
        $('.card-title').attr('class',specificID);

        let editRating = $('.edit-rating').val();
        let editTitle = $('.edit-title').val();
        console.log(editTitle, editRating, specificID);

        editMovie(editTitle, editRating, specificID)
            .then(updateMovies) // run after ajax
    });
}

function deleteFunction(e) {
    // let cardBody= $(e.target).parent();
    let specificID = e.target.dataset.id;
    if (confirm('Are you sure you want to delete this movie?')) {
        deleteMovie(specificID)
            .then(updateMovies);
    }
}



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

        //access the object by using getMovies function
        postMovie(movieTitle, movieRating);


        $('.search-term').val('');
        updateMovies();
    });


});