require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var request = require("request");

var command = process.argv[2];
var nodeArgs = process.argv;

var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

if (command === "my-tweets") {

    var params = {
        screen_name: 'joannehyelee',
        count: 20
    }

    client.get('statuses/user_timeline', params, function(error, tweets, response) {

        var myTweets = tweets;
        // tweets returns as an array
    
        if (!error) {
    
            for (var i = 0; i < myTweets.length; i++) {
                console.log("--------------------------------------");
                console.log(myTweets[i].text);
                console.log(myTweets[i].created_at);
            }
    
        } else {
            console.log(error);
        }
     });
}
else if (command === "spotify-this-song") {

    var songTitle = process.argv[3];

    spotify.search({ type: 'track', query: songTitle, limit: 1}, function(error, data){
        if (!error) {
            // console.log(JSON.stringify(data, null, 4));
            console.log("--------------------------------------");
            console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
            console.log("Song: " + data.tracks.items[0].name);
            console.log("Preview link: " + data.tracks.items[0].preview_url);
            console.log("Album: " + data.tracks.items[0].album.name);
            
        } else {
            console.log("--------------------------------------");
            console.log("Artist(s): Ace of Base");
            console.log("Song: The Sign");
            console.log("Album: The Sign");
        }
    });
}
else if (command === "movie-this") {

    var movieName = "";

    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            movieName = movieName + "+" + nodeArgs[i];
        } else {
            movieName += nodeArgs[i];
        }
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function(error, response, body){
        if (!error && response.statusCode === 200) {
            console.log("--------------------------------------");
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        } else {
            
        }
    });

}
else if (command === "do-what-it-says") {

}
else {

}