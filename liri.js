require("dotenv").config();

var keys = require("./keys.js");

var spotify = require("node-spotify-api");
var input = process.argv;
var action = input[2];
var inputs = input[3];
var request = require("request");
var fs = require('fs');
var axios = require("axios");
var moment = require("moment");
var chalk = require("chalk");

function commands(action, inputs){
	switch (action) {
		case "concert-this":
		concertThis(inputs);
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

function concertThis(inputs) {
    request("https://rest.bandsintown.com/artists/" + inputs + "/events?app_id=codingbootcamp", function (error, response, data) {
		
		if(error) {
			console.log(chalk.red("No concerts found."));
		}else{
            var response = JSON.parse(data)
            if (response.length != 0) {
                console.log(chalk.green(`Upcoming concerts for ${inputs} include: `))
                response.forEach(function (element) {
					console.log(chalk.blue("Venue name: " + element.venue.name));
                    if (element.venue.country == "United States") {
                        console.log("City: " + element.venue.city + ", " + element.venue.region);
                    } else {
                        console.log("City: " + element.venue.city + ", " + element.venue.country);
                    }
                    console.log("Date: " + moment(element.datetime).format('MM/DD/YYYY'));
                    console.log();
                })
			} 
        }
    });
}

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