// Twitter variables
var keys = require('./keys.js');
var twitter = require('twitter');
var client = new twitter (keys.twitterKeys);

// Spotify variable
var spotify = require('spotify');

// Request variable
var request = require('request');

// fs variable
var fs = require('fs');

// User inputs
var entry = process.argv[2];
var nodeArgs = process.argv;
var selection = "";
for (var i = 3; i < nodeArgs.length; i++) {
	selection = selection + nodeArgs[i] + " ";
}

// if statement to get my tweets
if (entry == "my-tweets") {
  Twitter();
}

//if statement to get a spotify song
if (entry == "spotify-this-song") {
  if (selection = undefined) {
    selection = "The Sign";
  } else {
    Spotify();
  }
}

// if statement to get a movie from OMDB
if (entry == "movie-this") {
  if (selection == undefined) {
    console.log("If you haven't watched 'Mr. Nobody', then you should: http://www.imdb.com/title/tt0485947/");
    console.log("It's on Netflix!");
  } else {
    OMDB();
  }
}

// if statement to get do what the txt file says
if (entry == "do-what-it-says") {
  Text();
}

// Logic function for getting tweets
function Twitter() {
  console.log("Twitter");

  client.get('statuses/user_timeline', {screen_name: 'DHLee183', count: 20, trim_user: 1}, function(error, tweets, response) {
      
    for (i = 0; i < tweets.length; i++) {
      console.log("---------------------------------------------------------------------"); 
      console.log("Tweet: " + tweets[i].text);
      console.log("Tweet Date: " + tweets[i].created_at);
      console.log("---------------------------------------------------------------------");
      }
  });
}

// Logic function for getting spotify song information
function Spotify() {
  console.log("Spotify");

  spotify.search({type: 'track', query: selection}, function(err, data) {

    var music = data.tracks.items

    for (i = 0; i < 1; i++) {
      if (err) {
          console.log(err)
          return;
          
      } else {
        console.log("---------------------------------------------------------------------");
        console.log("Artist: " + music[i].artists[0].name);
        console.log("Song Name: " + music[i].name);
        console.log("Preview Link: " + music[i].preview_url);
        console.log("Album: " + music[i].album.name);
        console.log("---------------------------------------------------------------------");
      }
      }
  });  
}

// Logic function for movie name information
function OMDB() {
  console.log("OMDB");

  request('http://www.omdbapi.com/?t=' + selection + '&y=&plot=short&r=json&tomatoes=true', function (error, response, body) {

      if (!error && response.statusCode == 200) {
        console.log("Movie Title: " + JSON.parse(body)["Title"]);
        console.log("Release Year: " + JSON.parse(body)["Year"]);
        console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
        console.log("Production Country: " + JSON.parse(body)["Country"]);
        console.log("Movie Language: " + JSON.parse(body)["Language"]);
        console.log("Movie Plot: " + JSON.parse(body)["Plot"]); 
        console.log("Actors in the Movie: " + JSON.parse(body)["Actors"]);
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]);
        console.log("Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"]);    
      } else {
        console.log(error);
      }
  });
}

// Text retrieval logic function
function Text() {

  fs.readFile("random.txt", "utf8", function(err, data) {

    var dataArr = data.split(",");

    entry = dataArr[0];
    selection = dataArr[1];

    if (entry == "my-tweets") {
      Twitter();
    }
    if (entry == "spotify-this-song") {
      Spotify();
    } 
    if (entry == "movie-this") {
      OMDB();
    }
  });
}