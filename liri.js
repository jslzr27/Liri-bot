require("dotenv").config();

var keys = require("./keys.js");

var spotify = require("node-spotify-api");
var input = process.argv;
var action = input[2];
var inputs = input[3];
var request = require("request");
var fs = require('fs');
var axios = require("axios");

function commands(action, inputs){
	switch (action) {
		case "concert-this":
		bands(inputs);
		break;

		case "spotify-this-song":
		Spotify(inputs);
		break;

		case "movie-this":
		movie(inputs);
		break;

		case "do-what-it-says":
		doWhatItSays();
		break;
	}
}
function bands(inputs) {

	var queryUrl = "https://rest.bandsintown.com/artists/" + inputs + "?app_id=codingbootcamp";

    axios.get(queryUrl).then( function (response) {
        // console.log("Venue: " + JSON.parse(body).response);
		// console.log("Location: " + JSON.parse(body).Year);
        // console.log("Date: " + JSON.parse(body).date);
        console.log(response);

        var artistName;
        var venueName;
        var venueLocation;
        var eventDate;
    })
    
	// request(queryUrl, function(error, response, body) {
	// 	if (!inputs){
    //     	console.log('Please type an artist');
    // 	}
	// 	if (!error && response.statusCode === 200) {

	// 	    console.log("Venue: " + JSON.parse(body).Title);
	// 	    console.log("Location: " + JSON.parse(body).Year);
	// 	    console.log("Date: " + JSON.parse(body).date);
	// 	}
	// });
};

function Spotify(inputs) {
    var spotify = new Spotify(keys.spotify);
    // spotify
    // .search({ type: 'track', query: inputs, limit: 10 })
    // .then(function(response) {
    //     console.log(response);
    // })
    // .catch(function(err) {
    //     console.log(err);
    // });
    // if(!inputs){
    //     inputs = "The Sign"
    // }
    spotify.search({
		type: "track", 
		query: inputs, 
		limit: 3, 
		},
		function (err, data) {
			if(err){
			return console.log(err);
			}
			if(inputs === ""){
				inputs = "The Sign";
				console.log(data);
			}
			var song = data.tracks.items;
	        console.log("Artist(s): " + song[0].artists[0].name);
	        console.log("Song Name: " + song[0].name);
	        console.log("Preview Link: " + song[0].preview_url);
	        console.log("Album: " + song[0].album.name);
		})
}



function movie(inputs) {
	inputs = typeof inputs !== 'undefined' ? inputs: "Mr Nobody";
	var queryUrl = "http://www.omdbapi.com/?t=" + inputs + "&y=&plot=short&apikey=trilogy";

	request(queryUrl, function(error, response, body) {
		if(error){console.log(error);}
		if (!error) {
			var response = JSON.parse(body);
		    console.log("Title: " + response.Title);
		    console.log("Release Year: " + response.Year);
		    console.log("IMDB Rating: " + response.imdbRating);
		    console.log("Rotten Tomatoes Rating: " + response.Ratings[1].Value);
		    console.log("Country: " + response.Country);
		    console.log("Language: " + response.Language);
		    console.log("Plot: " + response.Plot);
		    console.log("Actors: " + response.Actors);
		}
		
	});
};


function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
		}
		
		var dataArr = data.split(',');

		commands(dataArr[0], dataArr[1]);
    })
}

commands(action, inputs);