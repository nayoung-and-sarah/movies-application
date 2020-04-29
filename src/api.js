
//
// const newMovie = {
//     "title": inputValue,
//     "rating": 5
// };

module.exports = {

    getMovies: (title, rating) => {
        return fetch('api/movies')
            .then(response => response.json());
    },

    postMovie: (title, rating) => {
        return fetch('api/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(title, rating),
        })
            .then(response => response.json())
            .then(data => console.log(data));
    },

    editMovie: (title, rating,id) => {
        return fetch(`api/movies/${id}`,{
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({title: title, rating: rating, id: id}),
        })
            .then(response => response.json())
            .then( data => console.log(data));
    }


};