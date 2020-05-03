import sayHello from './hello';
sayHello('World');

const $ = require('jquery');

const {getMovies, postMovie, editMovie, deleteMovie} = require('./api.js');

function updateMovies() {
    getMovies().then((movies) => {
        console.log('Here are all the movies:');
        $('#spinner').hide();
        $('.card-deck').html('');
        movies.forEach(({title, rating, id}) => {
            console.log(`id#${id} - ${title} - rating: ${rating}`);
            // render cards
            function renderHTML() {
                let html =
                `<div class="card specific-card" data-id="${id}">
                     <div class="card-body">
                        <button  type="button" class="close after-edit-close" aria-label="Close">
                           <span aria-hidden="true">&times;</span>
                         </button>
                         <h5 data-id="${id}" class="card-title movie-title"> ${title}</h5>
                         <p id="movie-rating" class="card-text user-edit-rating">Rating: ${rating}</p>
                         <div>
                             <button data-id="${id}" class="btn btn-sm btn-outline-dark edit-btn mr-1">Edit Movie</button>
                             <button data-id="${id}" class="btn btn-sm btn-outline-danger delete-btn">Delete Movie</button>
                         </div>
                    </div>
                </div>`;
                return html;
            }
            $('.card-deck').append(renderHTML);
            $('.after-edit-close').hide();

        });

        $('.edit-btn').click(userEditMovie);
        $('.delete-btn').click(deleteFunction);
        $('.after-edit-close').click(afterEditCloseFunction);


        // $('.submit-edit-btn').click(submitEditFunction);
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.')
        console.log(error);
    });
}

//allow users to edit movies
function userEditMovie(e) {
    // console.log($(e.target).parent());
    let cardBody = $(e.target).parent();
    let specificID = e.target.dataset.id;
    console.log(specificID);
    $('.after-edit-close').show();
    // render form to edit movie
    function renderForm() {
       let html =
        `<div class="form-group edit-form mt-3">
             <label for="edit-form" id="edit-movie-title">Movie Title</label>
             <input type="text" class="form-control edit-form edit-title" id="${specificID}">
        </div>
        <div class="form-group edit-form">
            <label for="exampleFormControlSelect1" id="edit-movie-rating"> Rating</label>
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

       return html;
    }
    cardBody.append(renderForm);

    //when the edit button is clicked, that button disappears...
    $(this).hide();

    //..the other cards disappear, then the chosen card's form appears...
    $('.card').fadeOut();
    $(this).parent().parent().parent().fadeIn();

    //..while the new movie form disappears.
    $('.submit-new-movie').hide();

    //when the submit-edit button is clicked, a new card is generated
    $('.submit-edit-btn').click(function() {
        $(this).attr('data-id', specificID);

        let editRating = $('.edit-rating').val();
        let editTitle = $('.edit-title').val();
        console.log(editTitle, editRating, specificID);
        //call the editMovie (PUT) ajax
        editMovie(editTitle, editRating, specificID)
            .then(updateMovies) // run after ajax
                .then(
                    $('.submit-new-movie').fadeIn(5000)
                )
    });
}

function afterEditCloseFunction(e) {
    // e.preventDefault();
    $('.card').show();
    $('.after-edit-close').hide();
    $('.edit-title').hide();
    $('.edit-rating').hide();
    $('.edit-form').hide();
    // $('#edit-movie-title').hide();
    // $('#edit-movie-rating').hide();
    $('.submit-edit-btn').hide();

    $('.edit-btn').show();
}

//allow users to delete movies
function deleteFunction(e) {
    let specificID = e.target.dataset.id;
    if (confirm('Are you sure you want to delete this movie?')) {
        deleteMovie(specificID)
            .then(updateMovies);
    }
}

$(document).ready(() => {
    //loading spinner
    $('#spinner').html(`<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>`);

    // render the HTML before button is clicked
    updateMovies();


    // submit-post button
    $('#submit').click(function (e) {
        e.preventDefault();
        let movieTitle = $('.search-term').val();
        let movieRating = $('.movie-rating').val();

        //call the postMovie (POST) ajax
        postMovie(movieTitle, movieRating)
            .then(updateMovies)

        //after submitting a new movie, the input box's value becomes empty
        $('.search-term').val('');

    });

});
