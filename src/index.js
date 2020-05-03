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
            let renderHTML = `<div class="card specific-card" data-id="${id}">`;
            renderHTML += `<div class="card-body">`;
            renderHTML += `<h5 data-id="${id}" class="card-title movie-title"> ${title}</h5>`;
            renderHTML += `<p id="movie-rating" class="card-text user-edit-rating">Rating: ${rating}</p>`;
            renderHTML += `<div>`;
            renderHTML += `<button data-id="${id}" class="btn btn-sm btn-outline-dark edit-btn mr-1">Edit Movie</button>`;
            renderHTML += `<button data-id="${id}" class="btn btn-sm btn-outline-danger delete-btn">Delete Movie</button>`;
            renderHTML += `</div>`;
            renderHTML += `</div>`;
            renderHTML += `</div>`;
            $('.card-deck').append(renderHTML);
        });
        $('.delete-btn').click(deleteFunction);
        $('.edit-btn').click(userEditMovie);
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
    // render form to edit movie
    function renderForm() {
        let html = `<div class="form-group mt-3">`;
        html += `<label for="edit-form">Movie Title</label>`;
        html += `<input type="text" class="form-control edit-form edit-title" id="${specificID}">`;
        html += `</div>`;
        html += `<div class="form-group">`;
        html += `<label for="exampleFormControlSelect1"> Rating</label>`;
        html += `<select class="form-control edit-rating" id="exampleFormControlSelect1">`;
        html += `<option>1</option>`;
        html += `<option>2</option>`;
        html += `<option>3</option>`;
        html += `<option>4</option>`;
        html += `<option>5</option>`;
        html += `</select>`;
        html += `</div>`;
        html += `<div class="edit-btn-submit">`;
        html += `<button class="btn btn-outline-dark submit-edit-btn" data-id="${specificID}">Submit edits</button>`;
        html += `</div>`;

        return html;
    }
    cardBody.append(renderForm);

    //when the edit button is clicked, that button and the delete button disappear...
    $(this).css('display', 'none');
    $('.delete-btn').css('display', 'none');

    //..other cards disappear, then the chosen card's form appears...
    $('.card').fadeOut();
    $(this).parent().parent().parent().fadeIn();

    //..while the new movie form disappears.
    $('.submit-new-movie').css('display', 'none');

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
        $('.search-term').val('');

    });

});
