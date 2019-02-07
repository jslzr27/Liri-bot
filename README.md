# LIRI-Bot
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

## LIRI uses the following commands:
```
concert-this
```
```
spotify-this-song
```
```
movie-this
```
```
do-what-it-says
```

## Technologies used:

* Node.js
* Javascript

## npm packages: 
* [axios](https://www.npmjs.com/package/axios) - Promise based HTTP client for the browser and node.js
* [spotify](https://www.npmjs.com/package/node-spotify-api) - A simple to use API library for the Spotify REST API.
* [request](https://www.npmjs.com/package/request) - Request is designed to be the simplest way possible to make http calls. It supports HTTPS and follows redirects by default.
* [dotenv](https://www.npmjs.com/package/dotenv) - Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
* [moment](https://www.npmjs.com/package/moment) - A lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates.


## LIRI-Bot Commands

* Command One: node liri.js concert-this ```<artist/band name here>``` This will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal:
	* Name of the venue
	* Venue location
	* Date of the Event

* Command Two: node liri.js spotify-this-song ```<song name here>```.
	
	This will show the following information about the song in your terminal/bash window: 
	* Artist(s) 
	* The song's name 
	* A preview link of the song from Spotify 
	* The album that the song is from

	If no song is provided then the program will default to:
	"The Sign" 

* Command Three: node liri.js movie-this ```<movie name here>```.
	
	This will output the following information to your terminal/bash window:
	* Title of the movie.
	* Release year of the movie.
	* IMDB Rating of the movie.
	* Rotten Tomatoes Rating of the movie.
	* Country where the movie was produced.
	* Language of the movie.
	* Plot of the movie.
	* Actors in the movie.
	
	If no movie is typed, the program will output data for the movie 'Mr Nobody.'

* Command Four: node liri.js do-what-it-says

	This will output the command placed in random.txt file

## Author
* **Jesus Salazar** 