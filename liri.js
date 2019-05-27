require("dotenv").config()
const keys = require("./keys.js")
const { get } = require("axios")
const Spotify = require("node-spotify-api")
const fs = require('fs')

// Spotify Keys
var spotify = new Spotify(keys.spotify);

// spread process.argv
const [, , , ...arg] = process.argv

// create string out of process.argv
let fullName = arg.splice(",").join(" ")

// node liri concert-this
let findConcert = (artist) => {
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
        .catch(e => console.log(`Sorry ${artist} does not have any shows in the near future. Please check ${artist}'s website for more information`))
}
// node liri.js spotify-this-song

let findSong = (song) =>
    spotify.search({ type: 'track', query: `${song}` })
        .then(({ tracks }) => {
            for (let i = 0; i < tracks.items.length; i++) {
                let album = tracks.items[i].album
                let artist = tracks.items[i].artists
                console.log("------")
                console.log(artist[0].name);
                console.log(tracks.items[i].name);
                console.log(album.external_urls.spotify);
                console.log(album.name);
            }
        })
        .catch(e => console.log(`Sorry, but ${song} is not currently in the database. Please select a new song`))

// node liri.js movie-this
let findMovie = (movie) => get(`http://www.omdbapi.com/?t=${movie}&y=&plot=short&apikey=trilogy`)
    .then(({ data }) => {
        console.log("------")
        console.log(`Title: ${data.Title}`)
        console.log(`Year: ${data.Year}`)
        console.log(`Imdb Rating: ${data.Ratings[0].Value}`)
        console.log(`Rotten Tomatoes Rating: ${data.Ratings[1].Value}`)
        console.log(`Countries Filmed: ${data.Country}`)
        console.log(`Language: ${data.Language}`)
        console.log(`Plot: ${data.Plot}`)
        console.log(`Actors: ${data.Actors}`)
        console.log("------")
    })
    .catch(e => console.log(`Sorry, but ${movie} is not currently in the database. Please select a new movie`))

// node liri.js do-what-it-says
let findDWIS = _ => {
    fs.readFile('random.txt', 'utf8', (e, data) => {
        if (e) throw e
        let newArr = data.split(",")
        switch (newArr[0]) {
            case "concert-this":
                findConcert(newArr[1])
                break;
            case "spotify-this":
                findSong(newArr[1])
                break;
            case "movie-this":
                findMovie(newArr[1])
                break;
        
            default:
                findMovie('The Wicker Man')
                break;
        }
    })
}

// Switch case to know which function to run
switch (process.argv[2]) {
    case 'concert-this':
        fullName === '' ? findConcert("Kansas") : findConcert(fullName)
        break;
    case 'spotify-this':
        fullName === '' ? findSong("What a Wonderful World") : findSong(fullName)
        break;
    case 'movie-this':
        fullName === '' ? findMovie("Mr. Nobody") : findMovie(fullName)
        break;
    case 'do-what-it-says':
        findDWIS()
        break;

    default:
        break;
}