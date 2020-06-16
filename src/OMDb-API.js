const {OMDb_API} = require('./keys.js');
let movieTitle = $('.search-term').val();

module.exports = {
    getOMDbMovies: (title, synposis) => {
        let movieTitle = $('.search-term').val();
        // return fetch(`http://www.omdbapi.com/?&apikey=${OMDb_API}&t=${movieTitle}`)
        return fetch(`http://www.omdbapi.com/?&apikey=${OMDb_API}&t=the+godfather`)
            .then(response => response.json())
    },
    moreInfoOMDbMovies: (title, synposis) => {
        let movieTitle = $('.search-term').val();
        // return fetch(`http://www.omdbapi.com/?&apikey=${OMDb_API}&t=${movieTitle}`)
        return fetch(`http://www.omdbapi.com/?&apikey=${OMDb_API}&t=${movieTitle}`)
            .then(response => response.json())
    },
    postOMDBMovies: (title, info) => {
        return fetch(`http://www.omdbapi.com/?&apikey=${OMDb_API}&t=${movieTitle}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({title: title, info}),
        })
            .then(response => response.json())
            .then(data => console.log(data));
    }
}


// function getMovie() {
//     let OMDb_API = "dad06ef9";
//     let movieTitle = $('.search-term').val();
//     // fetch(`http://www.omdbapi.com/?t=the+godfather&apikey=dad06ef9`)
//     fetch(`http://www.omdbapi.com/?t=${movieTitle}&apikey=${OMDb_API}`)
//         .then(response => response.json())
//         .then(data => console.log(data));
//
// }