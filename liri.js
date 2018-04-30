require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var request = require("request");

var command = process.argv[2];

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

}
else if (command === "do-what-it-says") {

}
else {

}



// var tweetsUrl = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=joannehyelee&count=2";

// console.log(tweetsUrl);

// request(tweetsUrl, function(error, response, body){
//     if (!error && response.statusCode === 200) {
//         console.log('YAY');
//     } else {
//         console.log(error);
//     }
// });

// if (command === "my-tweets") {
//     keys.client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response) {
//         console.log(tweets);
//     });
// }