const newMovie = {
    "title": "The Fellowship of the Ring",
    "rating": 5
}

module.exports = {

    getMovies: () => {
        return fetch('api/movies')
            .then(response => response.json());
    },

    postMovie: () => {
        fetch('api/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMovie),
        })
            .then( response => response.json() )
            .then( data => console.log(data) )
            .catch( error => console.error(error) );
    }


};