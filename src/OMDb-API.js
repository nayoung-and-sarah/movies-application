const {OMDb_API} = require('./keys.js');

module.exports = {
    getOMDbMovies: (title,year,runTime) => {
        return fetch(`http://www.omdbapi.com/?&apikey=${OMDb_API} &t=guardians+of+the+galaxy`)
            .then(response => response.json())
            .then(data => console.log(data));
    },
};
