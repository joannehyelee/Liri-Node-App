require("dotenv").config();
var Twitter = require("twitter");
var keys = require("./keys.js");
var request = require("request");

var command = process.argv[2];

var client = new Twitter(keys.twitter);
console.log(client);

var params = {
    screen_name: 'joannehyelee',
    count: 1
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

client.get('statuses/user_timeline', params, function(error, tweets, response) {
    console.log(tweets);
 });

// if (command === "my-tweets") {
//     keys.client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response) {
//         console.log(tweets);
//     });
// }