/**
 * es6 modules and imports
 */
import sayHello from './hello';

sayHello('World');

/**
 * require style imports
 */
const $ = require('jquery');

const {getMovies, postMovie, editMovie} = require('./api.js');

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
                    </div>
               </div>`;

            $('.card-deck').append(renderHTML);
            // $('#test-paragraph').append(`id#${id} - ${title} - rating: ${rating}`);
        });

    }).catch((error) => {
        alert('Oh no! Something went wrong. Check the console for details.');
        console.log(error);
    })
}
    // .then((rating, comment) => {
// console.log('empty Object', emptyObject);

// allow users to edit movies
function userEditMovie() {
    let emptyObject = {
        rating: 4
    };

        let renderForm = `
    <div class="form-group">
       <label for="exampleFormControlInput1">Movie Title</label>
         <input type="email" class="form-control" id="exampleFormControlInput1">
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
<!--         <div class="form-group">-->
<!--            <label for="exampleFormControlTextarea1">Comment</label>-->
<!--            <textarea class="form-control edit-comment" id="exampleFormControlTextarea1" rows="3"></textarea>-->
<!--        </div>-->
        <div class="edit-btn-submit">
            <button class="btn submit-edit-btn" data-id=${id}>Submit edits</button>
        </div>`;

        $('.card-body').append(renderForm);

        $('.submit-edit-btn').click(function () {
            //get the data attr value
                $(this).attr('data-id');


            // let id = `${id}`;
            // $('.edit-btn-submit').data('id') === 'id';


            let editRating = $('.edit-rating').val();
            let editComment =$('.edit-comment').val();
            console.log(editRating, editComment, id);
            console.log(this);
            $(this).parent().children().first().next().html(editRating);
        });
}
editMovie();
userEditMovie().then


$(document).ready(() => {
    //loading spinner
    $('#spinner').html(`<div class="spinner-border" role="status">
  <span class="sr-only">Loading...</span></div>`);

    $('#edit-btn').click(function () {
        userEditMovie();
    });

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