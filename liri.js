require("dotenv").config()
const { id, secret } = require("./keys.js")
const { get } = require("axios")

// 

// node liri concert-this
let concert = (artist) => {
    get(`https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`)
        .then(({ data }) => {
            for (let i = 0; i < data.length; i++) {
                let venue = data[i].venue
                let dates = data[i].datetime
                console.log("------")
                console.log(venue.name)
                console.log(`${venue.city}, ${venue.country}`)
                console.log(dates)
            }
        })
        .catch(e => console.log(e))
}
// node liri.js spotify-this-song

// node liri.js movie-this
// get(`http://www.omdbapi.com/?t=aladdin&y=&plot=short&apikey=trilogy`)
// .then(({ data }) => {
//     console.log(data)
// })
// .catch(e => console.log(e))

// node liri.js do-what-it-says

switch (process.argv[2]) {
    case 'concert-this':
        concert(process.argv[3])
        break;
    case 'spotify-this':
        
        break;
    case 'movie-this':
        
        break;
    case 'do-what-it-says':
        
        break;

    default:
        break;
}