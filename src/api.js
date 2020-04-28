const reviewMovie = {
    "id": " ",
    "title": " ",
    "rating": " "
};

module.exports = {

    getMovies: () => {
        return fetch('api/movies')
            .then(response => response.json())
            .then (data => console.log(data))
    },


    postMovies:() =>{
        fetch('api/movies',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(),
        })
            .then(response => response.json())
            .then (data => console.log(data))
            .catch (error => console.error(error));
    }

};